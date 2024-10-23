import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyStateWithNavLink from "../EmptyStateWithNavLink";
import RadarChart from "../RadarChart";
import VideoPlayer from "../VideoPlayer";
import LoadingComponent from "../LoadingComponent";
import { ghost } from "../../assets/images";
import { initDB } from "../../utils/db";
import { analyzeVideo } from "../../redux/thunks/videoAnalysisThunks";

// Custom hook for video management
const useVideoManagement = () => {
  // State for video URL and file
  const [videoState, setVideoState] = useState({
    url: "",
    file: null,
    isInitializing: true, // Add initialization state
  });

  /**
   * Retrieves the last analyzed video from IndexedDB
   * @returns {Promise<File|null>} The video file or null if not found
   */
  const fetchLastAnalyzedVideo = async () => {
    try {
      const db = await initDB();
      const videoData = await db.get("videos", "lastAnalysedVideo");

      if (videoData?.fileToBeUploaded) {
        const fileURL = URL.createObjectURL(videoData.fileToBeUploaded);
        setVideoState({
          url: fileURL,
          file: videoData.fileToBeUploaded,
          isInitializing: false,
        });
        return videoData.fileToBeUploaded;
      }

      // Set initializing to false even if no video is found
      setVideoState((prev) => ({
        ...prev,
        isInitializing: false,
      }));

      console.log("No video found in database");
      return null;
    } catch (error) {
      console.error("Failed to retrieve video from database:", error);
      setVideoState((prev) => ({
        ...prev,
        isInitializing: false,
      }));
      return null;
    }
  };

  return {
    videoState,
    fetchLastAnalyzedVideo,
  };
};

// Extract averaged emotions data from analysis result
const processEmotionData = (analysisResult) => {
  const averaged_emotions = analysisResult?.data?.data?.averaged_emotions || {};
  return {
    labels: Object.keys(averaged_emotions),
    data: Object.values(averaged_emotions),
  };
};

const ResultsView = () => {
  const dispatch = useDispatch();
  const analysisResult = useSelector((state) => state.analysisResult);
  const { videoState, fetchLastAnalyzedVideo } = useVideoManagement();
  const toastId = useRef(null);
  const { labels, data } = processEmotionData(analysisResult);

  // Effect to retrieve the last analyzed video when analysis result loading changes
  useEffect(() => {
    fetchLastAnalyzedVideo();
  }, [analysisResult?.loading]);

  const renderContent = () => {
    // Show loading state during initialization or analysis
    if (videoState.isInitializing || analysisResult?.loading) {
      return (
        <div className="h-full w-full flex justify-center items-center">
          <LoadingComponent style={{ width: 150, height: 50 }} />
        </div>
      );
    }

    // Show error state
    if (analysisResult?.error) {
      return (
        <div className="h-full w-full flex justify-center items-center">
          <EmptyStateWithNavLink
            image={ghost}
            mainText="OOPs!!"
            imgStyles="h-[150px]"
            subText="An error occurred while trying to analyze your video."
            showActionBtn={true}
            actionButtonText="Try again"
            action={() =>
              dispatch(
                analyzeVideo({
                  dispatchData: videoState.file,
                  toastId,
                })
              )
            }
          />
        </div>
      );
    }

    // Show empty state only after initialization and when no video is present
    if (!videoState.url) {
      return (
        <EmptyStateWithNavLink
          image={ghost}
          mainText="Ready to Dive In?"
          imgStyles="h-[150px]"
          subText="Start your journey by creating your first analysis. To get started"
          linkText=" Click here"
          showNavBtn={false}
          link="/"
        />
      );
    }

    // Show analysis results
    return (
      <div className="w-full h-full flex flex-col lg:flex-row">
        <div className="flex-1 flex items-center justify-center">
          <VideoPlayer videoURL={videoState.url} />
        </div>

        <div className="flex-1 min-h-[500px]">
          {data?.length === 0 ? (
            <div className="h-full w-full justify-center items-center">
              <EmptyStateWithNavLink
                image={ghost}
                mainText="Face could not be detected!"
                imgStyles="h-[150px]"
                subText="No faces detected in the video. Please try again with a different video."
                linkText="Go back"
                showNavBtn={false}
                link="/"
              />
            </div>
          ) : (
            <RadarChart data={data} labels={labels} />
          )}
        </div>
      </div>
    );
  };

  // Wrap the entire content in a container
  return <div className="w-full h-full p-3 md:p-6">{renderContent()}</div>;
};

export default ResultsView;
