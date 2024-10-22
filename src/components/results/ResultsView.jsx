import React, { useEffect, useState } from "react";
import EmptyStateWithNavLink from "../EmptyStateWithNavLink";
import { ghost } from "../../assets/images";
import { useSelector } from "react-redux";
import RadarChart from "../RadarChart";
import VideoPlayer from "../VideoPlayer";
import { openDB } from "idb";
import { initDB } from "../../utils/db";

const ResultsView = () => {
  const [videoURL, setVideoURL] = useState("");

  const analysisResult = useSelector((state) => state.analysisResult);

  const getLastAnalysedVideo = async () => {
    try {
      const db = await initDB();

      const videoData = await db.get("videos", "lastAnalysedVideo");
      console.log(videoData);
      if (videoData && videoData.fileToBeUploaded) {
        const fileURL = URL.createObjectURL(videoData.fileToBeUploaded);
        setVideoURL(fileURL);

        return videoData.file;
      } else {
        console.log("No video found");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving the video:", error);
    }
  };

  useEffect(() => {
    getLastAnalysedVideo();
  }, []);

  // const data = [65, 59, 90, 81, 56];

  const averaged_emotions = analysisResult?.data?.data?.averaged_emotions;

  const labels = Object.keys(averaged_emotions || {});
  const data = Object.values(averaged_emotions || {});
  return (
    <div className="w-full h-full p-8">
      {!videoURL && (
        <EmptyStateWithNavLink
          image={ghost}
          mainText={"Ready to Dive In?"}
          imgStyles={"h-[150px]"}
          subText={
            "Start your journey by creating your first analysis. To get started"
          }
          linkText={" Click here"}
          showNavBtn={false}
          link={"/"}
        />
      )}
      {videoURL && (
        <div className="w-full h-full flex ">
          <div className="flex-1 flex items-center">
            <VideoPlayer videoURL={videoURL} />
          </div>
          <div className="flex-1 ">
            <RadarChart data={data} labels={labels} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsView;
