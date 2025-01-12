import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dataAPI from '../services/dataApi';

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
  const response = await dataAPI.get('/accounts');
  return response.data;
});

export const createAccount=createAsyncThunk('accounts/addAccount',async(accountData)=>{
  const response= await dataAPI.post('/accounts',accountData);
  console.log(response.data);
  return response.data;
})

const accountSlice = createSlice({
  name: 'accounts',
  initialState: { data: [], status: 'idle' },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default accountSlice.reducer;
