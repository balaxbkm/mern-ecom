import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    reviews: []
}

export const addReview = createAsyncThunk("/reviews/create", async (reviewData) => {
    const result = await axios.post(`http://localhost:8000/api/shop/reviews/`, reviewData);
    return result?.data;
});

export const getReviews = createAsyncThunk("/reviews/get", async (productId) => {
    const result = await axios.get(`http://localhost:8000/api/shop/reviews/${productId}`);
    return result?.data;
});

const reviewSlice = createSlice({
    name: "shopReview",
    initialState,
    reducers: {
        resetReview: (state) => {
            state.reviews = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload.data;
            })
            .addCase(getReviews.rejected, (state) => {
                state.isLoading = false;
                state.reviews = [];
            });
    }
});

export const { resetReview } = reviewSlice.actions;
export default reviewSlice.reducer;