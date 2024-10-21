import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/config";

// Helper function to configure headers
const getHeaders = () => ({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Helper function to handle API responses
const handleApiResponse = async (res, toastId, successMessage) => {
  if (res.data?.status === "success" || res?.status === 200) {
    toastId &&
      toast.update(toastId.current, {
        render: res.data?.message || successMessage,
        type: "success",
        isLoading: false,
        autoClose: 2000,
        hideProgressBar: true,
      });
  }

  return res?.data;
};

// Helper function to handle API errors
const handleApiError = (error, toastId) => {
  const errorMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong, please try again";

  toastId &&
    toast.update(toastId.current, {
      type: "error",
      autoClose: 2000,
      isLoading: false,
      hideProgressBar: true,
      render: errorMessage,
    });
};

/**END OF HELPER FUNCTIONS */

// Async thunk for analysing a video
export const analyzeVideo = createAsyncThunk(
  "videoAnalysis/analyzeVideo",
  async ({ dispatchData, toastId }, { rejectWithValue }) => {
    try {
      // Display toast
      toastId.current = toast("Analysing video. Please wait...", {
        autoClose: false,
        isLoading: true,
        position: "top-center",
        style: { color: "#000" },
      });

      let endpointData = {
        file: dispatchData,
      };

      const res = await axios.post(
        `${BASE_URL}/analyze-video`,
        endpointData,
        getHeaders()
      );

      // Handle API response
      await handleApiResponse(res, toastId, "Video analysis complete.");

      return res?.data;
    } catch (error) {
      handleApiError(error, toastId);
      console.error(error);
      return rejectWithValue(error.response.data || "Something went wrong");
    }
  }
);
