import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteImage, fetchImages, uploadImage } from "./imgService";

const initialState = {
  images: [],
  isLoading: false,
  error: null,
};

// upload img thunk
export const uploadImg = createAsyncThunk(
  "images/upload",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const uploadedImg = await uploadImage(formData, token);
      return uploadedImg;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// fetch images thunk
export const getImgs = createAsyncThunk(
  "images/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const images = await fetchImages(token);
      return images;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete image thunk

export const deleteImg = createAsyncThunk(
  "images/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await deleteImage(id, token);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const imgSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.images.push(action.payload);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getImgs.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getImgs.fulfilled, (state, action) => {
        state.images = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getImgs.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteImg.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteImg.fulfilled, (state, action) => {
        state.images = state.images.filter((img) => img._id !== action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteImg.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default imgSlice.reducer;
