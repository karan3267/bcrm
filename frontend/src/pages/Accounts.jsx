import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, fetchAccounts } from "../redux/AccountsSlice";
import AccountsModal from "../modals/AccountsModal";

const Accounts = () => {
  const dispatch = useDispatch();
  const { data: accounts, status } = useSelector((state) => state.accounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const columns = [
  //   { Header: "Customer ID", accessor: "customer.id" },
  //   { Header: "Customer Name", accessor: "customer.name" },
  //   { Header: "Account Number", accessor: "account_number" },
  //   { Header: "Balance", accessor: "balance" },
  //   { Header: "Account Type", accessor: "account_type" },
  // ];

  const entriesPerPage = 15;
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);
  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to fetch data</p>;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentAccounts = accounts.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(accounts.length / entriesPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddAccount = () => {
    setIsModalOpen(true);
  };
  const handleSaveAccount = (accountData) => {
    // Create new Accoiunt
    dispatch(createAccount(accountData));

    setIsModalOpen(false);
  };

  const groupedAccounts = currentAccounts.reduce((acc, account) => {
    const {
      customer: { id, name },
    } = account;
    // console.log(account)
    acc[id] = acc[id] || { id, name, accounts: [] };
    acc[id].accounts.push(account);
    return acc;
  }, {});
  // try {
  //   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //     useTable({ columns, data: groupedAccounts });
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Accounts List</h1>
      <div className="flex justify-end my-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddAccount}
        >
          Add Account
        </button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Customer ID</th>
              <th className="py-2 px-4 border">Customer Name</th>
              <th className="py-2 px-4 border">Account Number</th>
              <th className="py-2 px-4 border">Balance</th>
              <th className="py-2 px-4 border">Account Type</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedAccounts).map((customer) => (
              <React.Fragment key={customer.id}>
                {/* Group Header Row */}
                <tr key={customer.id}>
                  <td
                    className="py-2 px-4 border"
                    rowSpan={customer.accounts.length + 1}
                  >
                    {customer.id}
                  </td>
                  <td
                    className="py-2 px-4 border"
                    rowSpan={customer.accounts.length + 1}
                  >
                    {customer.name}
                  </td>
                  <td className="py-2 px-4 border" style={{textAlign:"center"}} colSpan="3">
                    {" "}
                    {/* Spacer for accounts */}
                    {customer.accounts.length} Account(s)
                  </td>
                </tr>
                {/* Account Rows */}
                {customer.accounts.map((account) => (
                  <tr key={account.account_number}>
                    <td className="py-2 px-4 border">
                      {account.account_number}
                    </td>
                    <td className="py-2 px-4 border">{account.balance}</td>
                    <td className="py-2 px-4 border">{account.account_type}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <AccountsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAccount}
      />
    </div>
  );
};

export default Accounts;
