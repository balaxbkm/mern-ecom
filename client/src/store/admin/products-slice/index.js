import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    products: []
}

export const addNewProduct = createAsyncThunk("/products/add", async (formData) => {
    const result = await axios.post("http://localhost:8000/api/admin/products/", formData, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return result?.data;
});

export const fetchAllProducts = createAsyncThunk("/products/get", async () => {
    const result = await axios.get("http://localhost:8000/api/admin/products/");
    return result?.data;
});

export const fetchProduct = createAsyncThunk("/products/get-single", async (id) => {
    const result = await axios.get("http://localhost:8000/api/admin/products/" + id);
    return result?.data;
});

export const updateProduct = createAsyncThunk("/products/update", async ({id, formData}) => {    
    const result = await axios.put("http://localhost:8000/api/admin/products/" + id, formData, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return result?.data;
});

export const deleteProduct = createAsyncThunk("/products/delete", async (id) => {
    const result = await axios.delete("http://localhost:8000/api/admin/products/" + id);
    return result?.data;
});

const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {            
            state.isLoading = false,
            state.products = action.payload.data
        }).addCase(fetchAllProducts.rejected, (state) => {            
            state.isLoading = false,
            state.products = []
        });
    }
});

export default AdminProductsSlice.reducer;