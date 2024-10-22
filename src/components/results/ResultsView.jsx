import React, { useEffect, useRef, useState } from "react";
import EmptyStateWithNavLink from "../EmptyStateWithNavLink";
import { ghost } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import RadarChart from "../RadarChart";
import VideoPlayer from "../VideoPlayer";
import { openDB } from "idb";
import { initDB } from "../../utils/db";
import LoadingComponent from "../LoadingComponent";
import { analyzeVideo } from "../../redux/thunks/videoAnalysisThunks";

const ResultsView = () => {
  const [videoURL, setVideoURL] = useState("");
  const [file, setFile] = useState("");

  const dispatch = useDispatch();

  const analysisResult = useSelector((state) => state.analysisResult);

  // Id of displayed toast
  const toastId = useRef(null);

  const getLastAnalysedVideo = async () => {
    try {
      const db = await initDB();

      const videoData = await db.get("videos", "lastAnalysedVideo");
      if (videoData && videoData.fileToBeUploaded) {
        const fileURL = URL.createObjectURL(videoData.fileToBeUploaded);
        setVideoURL(fileURL);
        setFile(videoData.fileToBeUploaded);

        return videoData.fileToBeUploaded;
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
  }, [analysisResult?.loading]);

  // const data = [65, 59, 90, 81, 56];

  console.log(analysisResult);

  const averaged_emotions = analysisResult?.data?.data?.averaged_emotions;

  const labels = Object.keys(averaged_emotions || {});
  const data = Object.values(averaged_emotions || {});
  return (
    <div className="w-full h-full p-3 md:p-6">
      {analysisResult?.loading ? (
        <div className="h-full w-full  flex justify-center items-center">
          <LoadingComponent style={{ width: 150, height: 50 }} />
        </div>
      ) : analysisResult?.error ? (
        <div className="h-full w-full flex justify-center items-center">
          <div className="h-full w-full justify-center items-center">
            <EmptyStateWithNavLink
              image={ghost}
              mainText={"OOPs!!"}
              imgStyles={"h-[150px]"}
              subText={"An error occured while trying to analyze your video."}
              showActionBtn={true}
              actionButtonText={"Try again"}
              action={() =>
                dispatch(analyzeVideo({ dispatchData: file, toastId }))
              }
            />
          </div>
        </div>
      ) : (
        <>
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
            <div className="w-full h-full flex flex-col lg:flex-row">
              <div className="flex-1 flex items-center justify-center">
                <VideoPlayer videoURL={videoURL} />
              </div>
              {console.log(data)}

              <div className="flex-1 min-h-[500px] ">
                {data?.length === 0 && (
                  <div className="h-full w-full justify-center items-center">
                    <EmptyStateWithNavLink
                      image={ghost}
                      mainText={"Face could not be detected!"}
                      imgStyles={"h-[150px]"}
                      subText={
                        "No faces detected in the video. Please try again with a different video."
                      }
                      linkText={"Go back"}
                      showNavBtn={false}
                      link={"/"}
                    />
                  </div>
                )}
                {data?.length > 0 && <RadarChart data={data} labels={labels} />}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResultsView;
