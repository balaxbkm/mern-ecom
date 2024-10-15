import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    orders: [],
    order: null
}

export const updateOrderStatus = createAsyncThunk("/orders/update", async ({ orderId, formData }) => {
    const result = await axios.put(`${import.meta.env.VITE_API_URL}/admin/orders/${orderId}`, formData);
    return result?.data;
});

export const getOrders = createAsyncThunk("/orders", async () => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders/`);
    return result?.data;
});

export const getOrderDetails = createAsyncThunk("/orders/get-one", async (orderId) => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders/${orderId}`);
    return result?.data;
});

const AdminOrderSlice = createSlice({
    name: "adminOrder",
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.order = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload.data;
            })
            .addCase(getOrders.rejected, (state) => {
                state.isLoading = false;
                state.orders = [];
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload.data;
            })
            .addCase(getOrderDetails.rejected, (state) => {
                state.isLoading = false;
                state.order = null;
            })
    }
});

export const { resetOrderDetails } = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer;