import ReactPlayer from "react-player";

const VideoPlayer = ({ videoURL }) => {
  return (
    <div className="w-[90%] h-full max-h-[300px] 2xl:max-h-[450px] 3xl:max-h-[550px] 4xl:max-h-[900px] flex rounded-lg justify-center items-center ">
      {videoURL && (
        <ReactPlayer url={videoURL} controls width="100%" height="100%" />
      )}
    </div>
  );
};

export default VideoPlayer;
