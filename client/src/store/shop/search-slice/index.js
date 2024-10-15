import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    products: []
}

export const searchProducts = createAsyncThunk("/products/search/:keyword", async (keyword) => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/shop/search/${keyword}`);
    return result?.data;
});

const searchSlice = createSlice({
    name: "shopSearch",
    initialState,
    reducers: {
        resetSearch: (state) => {
            state.products = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
            })
            .addCase(searchProducts.rejected, (state) => {
                state.isLoading = false;
                state.products = [];
            });
    }
});

export const { resetSearch } = searchSlice.actions;
export default searchSlice.reducer;