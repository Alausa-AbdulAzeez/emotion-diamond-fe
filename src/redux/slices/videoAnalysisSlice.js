import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { analyzeVideo } from "../thunks/videoAnalysisThunks";

const initialState = {
  loading: false,
  error: null,
  data: null, // Store updated job data here
};

// **Slice Definition**

const videoAnalyzerSlice = createSlice({
  name: "videoAnalyzer",
  initialState,
  reducers: {}, // No reducers in this case, handled by async thunks
  extraReducers: (builder) => {
    builder
      .addCase(analyzeVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Update state with new job data
      })
      .addCase(analyzeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
    //   .addCase(deleteJob.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(deleteJob.fulfilled, (state) => {
    //     state.loading = false;
    //     state.data = null; //
    //   });
  },
});

export default videoAnalyzerSlice.reducer;
