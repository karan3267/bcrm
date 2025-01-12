import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/AuthSlice.jsx';
import accountReducer from '../redux/AccountsSlice.jsx';
import transactionsReducer from '../redux/TransactionSlice.jsx';
import customerReducer from '../redux/CustomersSlice.jsx';
import transferReducer from '../redux/TransferSlice.jsx'

const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
    transactions:transactionsReducer,
    customers:customerReducer,
    transfer:transferReducer
  },
});

export default store;
