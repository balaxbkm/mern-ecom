import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    featureImages: []
}

export const addFeatureImage = createAsyncThunk("/feature-image/add", async (image) => {
    const result = await axios.post("http://localhost:8000/api/common/feature/", { image });
    return result?.data;
});

export const getFeatureImages = createAsyncThunk("/feature-image/get-all", async () => {
    const result = await axios.get("http://localhost:8000/api/common/feature/");
    return result?.data;
});

export const deleteFeatureImage = createAsyncThunk("/feature-image/delete", async (id) => {
    const result = await axios.delete(`http://localhost:8000/api/common/feature/${id}`);
    return result?.data;
});

const CommonFeatureSlice = createSlice({
    name: "commonFeatures",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFeatureImages.pending, (state) => {
            state.isLoading = true
        }).addCase(getFeatureImages.fulfilled, (state, action) => {
            state.isLoading = false,
                state.featureImages = action.payload.data
        }).addCase(getFeatureImages.rejected, (state) => {
            state.isLoading = false,
                state.featureImages = []
        });
    }
});

export default CommonFeatureSlice.reducer;