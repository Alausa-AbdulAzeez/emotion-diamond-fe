// import React, { useState } from "react";
// import { Icon } from "@iconify/react";

// const HomeView = () => {
//   const [file, setFile] = useState();

//   const [initialState, setInitialState] = useState(true);
//   const [loadingState, setLoadingState] = useState(false);
//   const [completeState, setCompleteState] = useState(false);
//   const [percentageUpload, setPercentageUpload] = useState(0);
//   const [dragActive, setDragActive] = useState(false);

//   const allowedFileTypes = ["pdf", "doc", "docx", "txt"];

//   const handleFileUpload = (selectedFile) => {
//     if (selectedFile) {
//       setFile(selectedFile);
//       setInitialState(false);
//       setLoadingState(true);
//       // Simulate file upload progress
//       simulateUploadProgress();
//     }
//   };

//   const handleFileInputChange = (event) => {
//     handleFileUpload(event.target.files[0]);
//   };

//   const simulateUploadProgress = () => {
//     const interval = setInterval(() => {
//       setPercentageUpload((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setLoadingState(false);
//           setCompleteState(true);
//           return 100;
//         }
//         return prev + 10;
//       });
//     }, 300); // Adjust the time interval as needed
//   };

//   const handleCancelClick = () => {
//     setLoadingState(false);
//     setInitialState(true);
//     setPercentageUpload(0);
//     setCompleteState(false);
//     setFile(null);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     setDragActive(true);
//   };

//   const handleDragLeave = () => {
//     setDragActive(false);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();

//     if (completeState) {
//       toast.error("Can't drop file here", { autoClose: 1400 });
//       return;
//     } // Disable drag-and-drop in complete state

//     setDragActive(false);
//     const droppedFile = event.dataTransfer.files[0];
//     const fileExtension = droppedFile?.name?.split(".")?.pop()?.toLowerCase();

//     if (allowedFileTypes.includes(fileExtension)) {
//       handleFileUpload(droppedFile);
//     } else {
//       toast.error(
//         "Invalid file type. Please upload a pdf, doc, docx, or txt file.",
//         { autoClose: 1400 }
//       );
//     }
//   };

//   return (
//     <div className="w-full h-full flex items-center justify-center">
//       <div
//         className={`relative w-[300px] md:w-[450px] 2xl:w-[600px]  flex justify-center h-[205px] 2xl:h-[310px] rounded p-6  border border-gray-200 ${
//           dragActive ? "bg-blue-100" : "bg-[#f5f5f5]"
//         }`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         {/* UI to be conditionally rendered */}
//         {initialState && (
//           <div className="flex flex-col items-center ">
//             <input
//               type="file"
//               onChange={handleFileInputChange}
//               accept=".pdf,.doc,.docx,.txt"
//               className="hidden"
//               id="resume-upload"
//             />
//             <div className="text-sm 2xl:text-lg">
//               <Icon
//                 icon="arcticons:uploadgram"
//                 className="mx-auto w-[50px] 2xl:w-[80px] h-[50px] 2xl:h-[80px]"
//               />
//               <div className="">
//                 Drag & Drop or{" "}
//                 <label
//                   htmlFor="resume-upload"
//                   className="cursor-pointer font-bold hover:opacity-55 transition-all ease-in-out duration-300"
//                 >
//                   Choose file
//                 </label>{" "}
//                 to Upload
//               </div>
//               <div className="text-xs mt-10  text-center 2xl:text-lg">
//                 Files allowed:{" "}
//                 <span className="font-bold text-primary-10 ">
//                   .mov .mp4 .m4a .3gp
//                 </span>{" "}
//               </div>
//               <div className="text-xs  text-center 2xl:text-lg">
//                 Max file size:{" "}
//                 <span className="font-bold text-red-700">30mb</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {loadingState && (
//           <div className="flex flex-col items-center mx-auto my-auto ">
//             <Icon
//               icon="proicons:cancel-square"
//               className="absolute right-3 top-3 cursor-pointer z-10 w-5 2xl:w-7 h-5 2xl:h-7 text-red-600"
//               onClick={handleCancelClick}
//             />
//             <div
//               className="z-[1] absolute top-0 left-0 bg-primary-20 h-full rounded-[16px]"
//               style={{ width: `${percentageUpload}%` }}
//             />
//             <Icon
//               icon="arcticons:mi-video"
//               className="w-12 2xl:w-14 h-12 2xl:h-14 z-10"
//             />
//             <div className="flex flex-col gap-2 z-10">
//               <div className="text-sm text-center 2xl:text-lg">
//                 {file?.name || "sample-document.doc"}
//               </div>
//               <div className="text-sm text-center 2xl:text-lg font-bold">
//                 {percentageUpload}% Uploading ·{" "}
//                 {(file?.size / 1024 / 1024).toFixed(2)} MB
//               </div>
//             </div>
//           </div>
//         )}
//         {completeState && (
//           <div className="flex flex-col items-center mx-auto my-auto">
//             <Icon
//               icon="proicons:cancel-square"
//               className="absolute right-3 top-3 cursor-pointer z-10 text-red-600 w-5 2xl:w-7 h-5 2xl:h-7"
//               onClick={handleCancelClick}
//             />
//             <Icon
//               icon="arcticons:mi-video"
//               className="w-12 2xl:w-14 h-12 2xl:h-14 z-10"
//             />

//             <div className="flex flex-col">
//               <div className="text-sm text-center  2xl:text-lg">
//                 {file?.name || "sample-document.doc"}
//               </div>
//               <div className="font-bold text-sm text-center 2xl:text-lg">
//                 Upload complete
//               </div>
//             </div>
//             <div className="">
//               <button
//                 type="button"
//                 className={`${
//                   file && percentageUpload === 100 ? "opacity-100" : "opacity-0"
//                 } transition-all ease-in-out duration-300 bg-primary mt-7 hover:opacity-70 disabled:opacity-55 disabled:cursor-not-allowed text-white h-[40px] 2xl:h-[48px] rounded w-[150px] 2xl:w-[174px] text-sm 2xl:text-lg font-bold`}
//               >
//                 Analyze video
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeView;

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeView = () => {
  const [file, setFile] = useState("");
  const [initialState, setInitialState] = useState(true);
  const [loadingState, setLoadingState] = useState(false);
  const [completeState, setCompleteState] = useState(false);
  const [percentageUpload, setPercentageUpload] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  // Update allowed file types to include video/audio formats
  const allowedFileTypes = ["mov", "mp4", "m4a", "3gp"];
  const maxFileSizeMB = 20;

  const handleFileUpload = (selectedFile) => {
    if (selectedFile) {
      const fileSizeMB = selectedFile.size / 1024 / 1024;
      const fileExtension = selectedFile?.name
        ?.split(".")
        ?.pop()
        ?.toLowerCase();

      if (!allowedFileTypes.includes(fileExtension)) {
        setFile("");
        toast.error(
          "Invalid file type. Please upload a .mov, .mp4, .m4a, or .3gp file.",
          { autoClose: 3000, position: "top-center" }
        );
        return;
      } else if (fileSizeMB > maxFileSizeMB) {
        toast.error(
          `File size exceeds ${maxFileSizeMB}MB. Please upload a smaller file.`,
          {
            autoClose: 3000,
            position: "top-center",
          }
        );
        return;
      }

      setFile(selectedFile);
      setInitialState(false);
      setLoadingState(true);
      // Simulate file upload progress
      simulateUploadProgress();
    }
  };

  const handleFileInputChange = (event) => {
    handleFileUpload(event.target.files[0]);

    // Clear the input value to allow re-selection of the same file
    event.target.value = null;
  };

  const simulateUploadProgress = () => {
    const interval = setInterval(() => {
      setPercentageUpload((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoadingState(false);
          setCompleteState(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleCancelClick = () => {
    setLoadingState(false);
    setInitialState(true);
    setPercentageUpload(0);
    setCompleteState(false);
    setFile(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (completeState) {
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

    if (!allowedFileTypes.includes(fileExtension)) {
      toast.error(
        "Invalid file type. Please upload a .mov, .mp4, .m4a, or .3gp file.",

        { autoClose: 3000, position: "top-center" }
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
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ToastContainer />
      <div
        className={`relative w-[300px] md:w-[450px] 2xl:w-[600px]  flex justify-center h-[205px] 2xl:h-[310px] rounded p-6  border border-gray-200 ${
          dragActive ? "bg-blue-100" : "bg-[#f5f5f5]"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {initialState && (
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
                <span className="font-bold text-primary-10">
                  .mov .mp4 .m4a .3gp
                </span>{" "}
              </div>
              <div className="text-xs text-center 2xl:text-lg">
                Max file size:{" "}
                <span className="font-bold text-red-700">30MB</span>
              </div>
            </div>
          </div>
        )}

        {loadingState && (
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
                {file?.name || "sample-document.doc"}
              </div>
              <div className="text-sm text-center 2xl:text-lg font-bold">
                {percentageUpload}% Uploading ·{" "}
                {(file?.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          </div>
        )}
        {completeState && (
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
              >
                Analyze video
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeView;
