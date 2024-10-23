import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { analyzeVideo } from "../../redux/thunks/videoAnalysisThunks";
import { API_SUCCESS_VARIABLE } from "../../utils/config";
import { Link, useNavigate } from "react-router-dom";
import { openDB } from "idb";

const HomeView = () => {
  // Hook to access dispatch function for Redux actions
  const dispatch = useDispatch();
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Ref to store the ID of a displayed toast for updating or dismissing it
  const toastId = useRef(null);

  // Extracting analysis result state from Redux store
  const analysisResult = useSelector((state) => state.analysisResult);

  // State to manage the selected file
  const [file, setFile] = useState("");
  // State to manage the visibility of the initial state (no file selected)
  const [initialState, setInitialState] = useState(true);
  // State to indicate if a file upload is in progress
  const [loadingState, setLoadingState] = useState(false);
  // State to indicate if file upload is complete
  const [completeState, setCompleteState] = useState(false);
  // State to manage the percentage of file upload progress
  const [percentageUpload, setPercentageUpload] = useState(0);
  // State to manage the drag-and-drop UI interaction
  const [dragActive, setDragActive] = useState(false);

  // Allowed file types for video/audio uploads
  const allowedFileTypes = ["mov", "mp4", "m4a", "3gp"];
  // Maximum allowed file size in MB
  const maxFileSizeMB = 30;

  // Handle the file saving to index DB
  const saveToIndexDB = async (fileToBeUploaded) => {
    try {
      // Open IndexedDB and create a store if it doesn't exist
      const db = await openDB("videoAnalysisDB", 1, {
        upgrade(db) {
          // Create "videos" store if it does not exist
          if (!db.objectStoreNames.contains("videos")) {
            db.createObjectStore("videos", { keyPath: "id" });
          }
        },
      });

      // Store the file in IndexedDB with a key
      await db.put("videos", { id: "lastAnalysedVideo", fileToBeUploaded });
    } catch (error) {
      console.error(error);
    }
  };

  // Handle the file upload process including validation
  const handleFileUpload = (selectedFile) => {
    if (selectedFile) {
      // Calculate file size in MB
      const fileSizeMB = selectedFile.size / 1024 / 1024;
      // Extract file extension and convert to lowercase
      const fileExtension = selectedFile?.name
        ?.split(".")
        ?.pop()
        ?.toLowerCase();

      // Check for valid file type
      if (!allowedFileTypes.includes(fileExtension)) {
        setFile("");
        // Display error toast for invalid file type
        toast.error(
          "Invalid file type. Please upload a .mov, .mp4, .m4a, or .3gp file.",
          {
            autoClose: 3000,
            position: "top-center",
          }
        );
        return;
      }

      // Check for file size limit
      if (fileSizeMB > maxFileSizeMB) {
        toast.error(
          `File size exceeds ${maxFileSizeMB}MB. Please upload a smaller file.`,
          {
            autoClose: 3000,
            position: "top-center",
          }
        );
        return;
      }

      // Set selected file and update states for progress tracking
      setFile(selectedFile);
      setInitialState(false);
      setLoadingState(true);
      // Start simulated upload progress
      simulateUploadProgress();
    }
  };

  // Handle file input change and store file in IndexedDB
  const handleFileInputChange = async (event) => {
    const fileToBeUploaded = event.target.files[0];
    handleFileUpload(fileToBeUploaded);

    // Save to index DB
    saveToIndexDB(fileToBeUploaded);

    // Reset input value to allow re-uploading the same file
    event.target.value = null;
  };

  // Simulate upload progress by incrementing percentage
  const simulateUploadProgress = () => {
    const interval = setInterval(() => {
      setPercentageUpload((prev) => {
        // When progress reaches 100%, stop interval and update states
        if (prev >= 100) {
          clearInterval(interval);
          setLoadingState(false);
          setCompleteState(true);
          return 100;
        }
        // Increment progress by 10% every 300ms
        return prev + 10;
      });
    }, 300);
  };

  // Handle cancellation of file upload
  const handleCancelClick = () => {
    setLoadingState(false);
    setInitialState(true);
    setPercentageUpload(0);
    setCompleteState(false);
    setFile(null);
  };

  // Handle drag-over event to indicate drag area
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  // Handle drag-leave event to reset drag state
  const handleDragLeave = () => {
    setDragActive(false);
  };

  // Handle drop event to upload the dropped file
  const handleDrop = (event) => {
    event.preventDefault();
    if (completeState) {
      // Prevent further uploads if one is already complete
      toast.error("Can't drop file here", {
        autoClose: 3000,
        position: "top-center",
      });
      return;
    }

    setDragActive(false);
    const droppedFile = event.dataTransfer.files[0];
    const fileExtension = droppedFile?.name?.split(".")?.pop()?.toLowerCase();
    const fileSizeMB = droppedFile.size / 1024 / 1024;

    // Validate file type and size
    if (!allowedFileTypes.includes(fileExtension)) {
      toast.error(
        "Invalid file type. Please upload a .mov, .mp4, .m4a, or .3gp file.",
        {
          autoClose: 3000,
          position: "top-center",
        }
      );
    } else if (fileSizeMB > maxFileSizeMB) {
      toast.error(
        `File size exceeds ${maxFileSizeMB}MB. Please upload a smaller file.`,
        {
          autoClose: 3000,
          position: "top-center",
        }
      );
    } else {
      handleFileUpload(droppedFile);

      // Save to index DB
      saveToIndexDB(droppedFile);
    }
  };

  // Store video URL in localStorage if a file is selected
  if (file) {
    localStorage.setItem(
      "lastAnalysedVideoURL",
      JSON.stringify(URL.createObjectURL(file))
    );
  }

  // Function to handle video analysis process
  const handleAnalyzeVideo = async () => {
    try {
      const res = await dispatch(analyzeVideo({ dispatchData: file, toastId }));
      // If analysis is successful, navigate to results page
      if (res?.payload?.status === API_SUCCESS_VARIABLE) {
        navigate("/results");
      }
    } catch (error) {
      console.error("Video analysis failed:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div
        className={`relative w-[300px] md:w-[450px] 2xl:w-[600px]  flex justify-center h-[205px] 2xl:h-[310px] rounded p-3 md:p-6  border border-gray-200 ${
          dragActive ? "bg-primary-20" : "bg-[#f5f5f5]"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {initialState && (
          <FileUploadInitial handleFileInputChange={handleFileInputChange} />
        )}

        {/* Loading state */}
        {loadingState && (
          <FileUploadProgress
            file={file}
            handleCancelClick={handleCancelClick}
            percentageUpload={percentageUpload}
          />
        )}

        {/* Complete State */}
        {completeState && (
          <FileUploadComplete
            analysisResult={analysisResult}
            file={file}
            handleCancelClick={handleCancelClick}
            percentageUpload={percentageUpload}
            handleAnalyzeVideo={handleAnalyzeVideo}
          />
        )}
      </div>
      <div className="text-primary font-medium w-[80%] text-center">
        No file to test with? Click{" "}
        <Link
          className="underline font-bold"
          target="_blank"
          to={
            "https://www.pexels.com/video/close-up-video-of-man-wearing-red-hoodie-3249935/"
          }
        >
          here
        </Link>{" "}
        to download one.
      </div>
    </div>
  );
};

// Component for initial upload state
const FileUploadInitial = ({ handleFileInputChange }) => (
  <div className="flex flex-col items-center">
    <input
      type="file"
      onChange={handleFileInputChange}
      accept=".mov,.mp4,.m4a,.3gp"
      className="hidden"
      id="resume-upload"
    />
    <div className="text-sm 2xl:text-lg">
      <Icon
        icon="arcticons:uploadgram"
        className="mx-auto w-[50px] 2xl:w-[80px] h-[50px] 2xl:h-[80px]"
      />
      <div>
        Drag & Drop or{" "}
        <label
          htmlFor="resume-upload"
          className="cursor-pointer font-bold hover:opacity-55 transition-all ease-in-out duration-300"
        >
          Choose file
        </label>{" "}
        to Upload
      </div>
      <div className="text-xs mt-10 text-center 2xl:text-lg">
        Files allowed:{" "}
        <span className="font-bold text-primary-10">.mov .mp4 .m4a .3gp</span>{" "}
      </div>
      <div className="text-xs text-center 2xl:text-lg">
        Max file size: <span className="font-bold text-red-700">30MB</span>
      </div>
    </div>
  </div>
);

// Component for upload progress state
const FileUploadProgress = ({ handleCancelClick, file, percentageUpload }) => (
  <div className="flex flex-col items-center mx-auto my-auto ">
    <Icon
      icon="proicons:cancel-square"
      className="absolute right-3 top-3 cursor-pointer z-10 w-5 2xl:w-7 h-5 2xl:h-7 text-red-600"
      onClick={handleCancelClick}
    />
    <div
      className="z-[1] absolute top-0 left-0 bg-primary-20 h-full rounded-[16px]"
      style={{ width: `${percentageUpload}%` }}
    />
    <Icon
      icon="arcticons:mi-video"
      className="w-12 2xl:w-14 h-12 2xl:h-14 z-10"
    />
    <div className="flex flex-col gap-2 z-10">
      <div className="text-sm text-center 2xl:text-lg">
        {file?.name || "sample-document.mp4"}
      </div>
      <div className="text-sm text-center 2xl:text-lg font-bold">
        {percentageUpload}% Uploading · {(file?.size / 1024 / 1024).toFixed(2)}{" "}
        MB
      </div>
    </div>
  </div>
);

// Component for completed upload state
const FileUploadComplete = ({
  handleCancelClick,
  file,
  percentageUpload,
  analysisResult,
  handleAnalyzeVideo,
}) => (
  <div className="flex flex-col items-center mx-auto my-auto">
    <Icon
      icon="proicons:cancel-square"
      className="absolute right-3 top-3 cursor-pointer z-10 text-red-600 w-5 2xl:w-7 h-5 2xl:h-7"
      onClick={handleCancelClick}
    />
    <Icon
      icon="arcticons:mi-video"
      className="w-12 2xl:w-14 h-12 2xl:h-14 z-10"
    />

    <div className="flex flex-col">
      <div className="text-sm text-center  2xl:text-lg">
        {file?.name || "sample-document.doc"}
      </div>
      <div className="font-bold text-sm text-center 2xl:text-lg">
        Upload complete
      </div>
    </div>
    <div className="">
      <button
        type="button"
        className={`${
          file && percentageUpload === 100 ? "opacity-100" : "opacity-0"
        } transition-all ease-in-out duration-300 bg-primary mt-7 hover:opacity-70 disabled:opacity-55 disabled:cursor-not-allowed text-white h-[40px] 2xl:h-[48px] rounded w-[150px] 2xl:w-[174px] text-sm 2xl:text-lg font-bold`}
        onClick={handleAnalyzeVideo}
        disabled={analysisResult?.loading}
      >
        Analyze video
      </button>
    </div>
  </div>
);

export default HomeView;
