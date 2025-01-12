import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataAPI from "../services/dataApi";

export const fetchTransactions = createAsyncThunk(
  "accounts/fetchTransactions",
  async () => {
    const response = await dataAPI.get("/transactions");
    return response.data;
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (transactionData) => {
    const response = await dataAPI.post("/transactions", transactionData);
    return response.data;
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async (transactionData) => {
    const response = await dataAPI.put("/transactions", transactionData);
    return response.data;
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id) => {
    const response = await dataAPI.delete(`/transactions/${id}`);
    return response.data;
  }
);
const transactionSlice = createSlice({
  name: "transactions",
  initialState: { data: [], status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.data.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.data = state.data.filter((customer) => customer.id !== action.payload);
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default transactionSlice.reducer;
