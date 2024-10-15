import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    products: [],
    productDetails: null
}

export const getProducts = createAsyncThunk("/products", async ({filterParams, sortParam}) => {
    const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParam
    });

    const result = await axios.get(`${import.meta.env.VITE_API_URL}/shop/products?${query}`);
    return result?.data;
});

export const getProduct = createAsyncThunk("/products/:id", async (id) => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/shop/products/${id}`);
    return result?.data;
});

const ShopProductsSlice = createSlice({
    name: "shopProducts",
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.productDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled, (state, action) => {            
            state.isLoading = false,
            state.products = action.payload.data
        })
        .addCase(getProducts.rejected, (state) => {            
            state.isLoading = false,
            state.products = []
        });

        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getProduct.fulfilled, (state, action) => {            
            state.isLoading = false,
            state.productDetails = action.payload.data
        })
        .addCase(getProduct.rejected, (state) => {            
            state.isLoading = false,
            state.productDetails = null
        });
    }
});

export const {setProductDetails} = ShopProductsSlice.actions;
export default ShopProductsSlice.reducer;