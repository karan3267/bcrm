import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dataApi from "../services/dataApi";

// Async Thunk for Transfer
export const initiateTransfer = createAsyncThunk(
    'transfer/initiate',
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.post('/transfer', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Slice
const transferSlice = createSlice({
    name: 'transfer',
    initialState: { data: null, status: 'idle', error: null },
    extraReducers: (builder) => {
        builder
            .addCase(initiateTransfer.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(initiateTransfer.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(initiateTransfer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default transferSlice.reducer;
