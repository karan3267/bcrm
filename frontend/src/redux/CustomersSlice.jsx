import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataAPI from "../services/dataApi";

// Fetch customers
export const fetchCustomers = createAsyncThunk("customers/fetch", async () => {
  const response = await dataAPI.get("/customers");
  return response.data;
});

// Create customer
export const createCustomer = createAsyncThunk(
  "customers/create",
  async (customerData) => {
    const response = await dataAPI.post("/customers", customerData);
    return response.data;
  }
);

// Update customer
export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ updatedData }) => {
    const response = await dataAPI.put(`/customers`, updatedData);
    return response.data;
  }
);

// Delete customer
export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id) => {
    await dataAPI.delete(`/customers/${id}`);
    return id;
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: { data: [], status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.data.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.data = state.data.filter((customer) => customer.id !== action.payload);
      });
  },
});

export default customerSlice.reducer;
