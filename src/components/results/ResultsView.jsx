import React, { useEffect, useState } from "react";
import EmptyStateWithNavLink from "../EmptyStateWithNavLink";
import { ghost } from "../../assets/images";
import { useSelector } from "react-redux";
import RadarChart from "../RadarChart";
import VideoPlayer from "../VideoPlayer";

const ResultsView = () => {
  const [videoURL, setVideoURL] = useState("");

  const analysisResult = useSelector((state) => state.analysisResult);

  useEffect(() => {
    // Get last saved video from local storage
    const savedVideo = localStorage.getItem("lastAnalysedVideoURL");
    console.log(savedVideo);
    if (savedVideo) {
      const savedVidoeURL = JSON.parse(savedVideo);
      setVideoURL(savedVidoeURL);
      console.log(savedVidoeURL);
    }
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
