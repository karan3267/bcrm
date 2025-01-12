import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../redux/AccountsSlice";
import { fetchTransactions } from "../redux/TransactionSlice";
import { fetchCustomers } from "../redux/CustomersSlice";
import { logout } from "../redux/AuthSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { data: accounts } = useSelector((state) => state.accounts);
  const { data: transactions } = useSelector((state) => state.transactions);
  const { data: customers } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchTransactions());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const totalTransactionAmount = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const latestTransactions = transactions.slice(transactions.length-5, transactions.length).reverse();
  const topCustomers = customers.slice(0, 5);
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div>
        <button onClick={handleLogOut}>logout</button>
      </div>
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg">Total Accounts</h3>
          <p className="text-2xl font-semibold">{accounts.length}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg">Total Transactions</h3>
          <p className="text-2xl font-semibold">{transactions.length}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg">Total Customers</h3>
          <p className="text-2xl font-semibold">{customers.length}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg">Total Transaction Amount</h3>
          <p className="text-2xl font-semibold">${totalTransactionAmount}</p>
        </div>
      </div>

      {/* Latest Transactions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">ID</th>
                <th className="p-2">Date</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Type</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {latestTransactions.map((transaction) => (
                <tr key={transaction.id} className="text-center border-b">
                  <td className="p-2">{transaction.id}</td>
                  <td className="p-2">{transaction.timestamp}</td>
                  <td className="p-2">${transaction.amount}</td>
                  <td className="p-2">{transaction.transactionType}</td>
                  <td className="p-2">{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Customers */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Top Customers</h2>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Total Transactions</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((customer) => (
                <tr key={customer.id} className="text-center border-b">
                  <td className="p-2">{customer.id}</td>
                  <td className="p-2">{customer.name}</td>
                  <td className="p-2">{customer.email}</td>
                  <td className="p-2">{customer.phone}</td>
                  <td className="p-2">
                    {
                      transactions.filter(
                        (transaction) =>
                          transaction.account.customer.id === customer.id
                      ).length
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accounts Summary */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Accounts Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div
              key={account.account_number}
              className="bg-white p-4 rounded-lg shadow-md border"
            >
              <h3 className="text-lg font-semibold">{account.name}</h3>
              <p className="text-sm text-gray-600">
                Account Number: {account.account_number}
              </p>
              <p className="text-sm text-gray-600">
                Balance: ${account.balance}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
