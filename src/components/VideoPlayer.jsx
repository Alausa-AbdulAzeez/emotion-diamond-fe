import ReactPlayer from "react-player";

const VideoPlayer = ({ videoURL }) => {
  return (
    <div className="w-[90%] h-full flex rounded-lg justify-center items-center ">
      {videoURL && (
        <ReactPlayer url={videoURL} controls width="100%" height="auto" />
      )}
    </div>
  );
};

export default VideoPlayer;
