import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    approvalUrl: null,
    orderId: null,
    orders: [],
    order: null
}

export const createOrder = createAsyncThunk("/orders/create", async (orderData) => {
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/shop/orders/`, orderData);
    return result?.data;
});

export const capturePayment = createAsyncThunk("/orders/capture", async ({ orderId, paymentId, payerId }) => {
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/shop/orders/capture`, { orderId, paymentId, payerId });
    return result?.data;
});

export const getOrders = createAsyncThunk("/orders", async (userId) => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/shop/orders/${userId}`);
    return result?.data;
});

export const getOrderDetails = createAsyncThunk("/orders/one", async ({ userId, orderId }) => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/shop/orders/${userId}/${orderId}`);
    return result?.data;
});

const ShopOrderSlice = createSlice({
    name: "shopOrder",
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.order = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalUrl = action.payload.approvalUrl;
                state.orderId = action.payload.orderId;
                sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId));
            })
            .addCase(createOrder.rejected, (state) => {
                state.isLoading = false;
                state.approvalUrl = null;
                state.orderId = null;
            })
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

export const { resetOrderDetails } = ShopOrderSlice.actions;
export default ShopOrderSlice.reducer;