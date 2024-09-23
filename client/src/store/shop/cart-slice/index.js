import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    cartItems: []
}

export const addToCart = createAsyncThunk("/cart/add", async ({userId, productId, quantity}) => {
    const result = await axios.post(`http://localhost:8000/api/shop/cart/`, {userId, productId, quantity});
    return result?.data;
});

export const getCartItems = createAsyncThunk("/cart/get", async (userId) => {
    const result = await axios.get(`http://localhost:8000/api/shop/cart/${userId}`);
    return result?.data;
});

export const updateCart = createAsyncThunk("/cart/update", async ({userId, productId, quantity}) => {
    const result = await axios.put(`http://localhost:8000/api/shop/cart/`, {userId, productId, quantity});
    return result?.data;
});

export const deleteCartItem = createAsyncThunk("/cart/delete", async ({userId, productId}) => {
    const result = await axios.delete(`http://localhost:8000/api/shop/cart/${userId}/${productId}`);
    return result?.data;
});

const ShopCartSlice = createSlice({
    name: "shopCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        })
        .addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        })
        .addCase(getCartItems.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        })
        .addCase(getCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        })
        .addCase(updateCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateCart.fulfilled, (state, action) => {            
            state.isLoading = false;
            state.cartItems = action.payload.data;
        })
        .addCase(updateCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        })
        .addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        })
        .addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        })
    }
});

export default ShopCartSlice.reducer;