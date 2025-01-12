import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction, fetchTransactions } from "../redux/TransactionSlice";
import TransactionModal from "../modals/TransactionsModal";

function Transactions() {
  const dispatch = useDispatch();
  const { data: transactions } = useSelector((state) => state.transactions);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 15;
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const totalPages = Math.ceil(transactions.length / entriesPerPage);
  const [isModalOpen, setModalOpen] = useState(false);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleSaveTransaction = (transactionData) => {
    dispatch(createTransaction(transactionData));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6">Transactions</h1>
      <div className="flex justify-end my-2">
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Transaction
      </button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Transaction ID</th>
              <th className="py-2 px-4 border-b">Account Number</th>
              <th className="py-2 px-4 border-b">Customers ID</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Transactoin Type</th>
            </tr>
          </thead>
          <tbody>
            {/* Add dynamic rows here */}
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-2 px-4 border">{transaction.id}</td>
                <td className="py-2 px-4 border">{transaction.account.account_number}</td>
                <td className="py-2 px-4 border">
                  {transaction.account.customer.id}
                </td>
                <td className="py-2 px-4 border">{transaction.timestamp}</td>
                <td className="py-2 px-4 border">{transaction.amount}</td>
                <td className="py-2 px-4 border">{transaction.status}</td>
                <td className="py-2 px-4 border">
                  {transaction.transactionType}
                </td>
              </tr>
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
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTransaction}
      />
    </div>
  );
}

export default Transactions;
