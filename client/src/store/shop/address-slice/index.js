import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    addressList: []
}

export const addAddress = createAsyncThunk("/address/add", async (formData) => {
    const result = await axios.post(`http://localhost:8000/api/shop/address/`, formData);
    return result?.data;
});

export const getAddress = createAsyncThunk("/address/get", async (userId) => {
    const result = await axios.get(`http://localhost:8000/api/shop/address/${userId}`);
    return result?.data;
});

export const updateAddress = createAsyncThunk("/address/update", async ({ userId, addressId, formData }) => {
    const result = await axios.put(`http://localhost:8000/api/shop/address/${userId}/${addressId}`, formData);
    return result?.data;
});

export const deleteAddress = createAsyncThunk("/address/delete", async ({ userId, addressId }) => {
    const result = await axios.delete(`http://localhost:8000/api/shop/address/${userId}/${addressId}`);
    return result?.data;
});

const ShopAddressSlice = createSlice({
    name: "shopAddress",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAddress.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addAddress.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(getAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
            .addCase(updateAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAddress.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateAddress.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAddress.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteAddress.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export default ShopAddressSlice.reducer;