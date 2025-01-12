import { useState } from "react";

function TransactionModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    accountId: "",
    amount: "",
    transactionType: "CREDIT", // Default transaction type
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.accountId.trim()) {
      newErrors.accountId = "Account ID is required.";
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than zero.";
    }
    if (!formData.transactionType) {
      newErrors.transactionType = "Transaction type is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Transaction</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Account ID</label>
            <input
              type="text"
              name="accountId"
              value={formData.accountId}
              onChange={handleChange}
              placeholder="Account ID"
              className={`w-full p-2 border rounded ${
                errors.accountId ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.accountId && (
              <p className="text-red-500 text-sm mt-1">{errors.accountId}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className={`w-full p-2 border rounded ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Transaction Type</label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.transactionType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="CREDIT">Credit</option>
              <option value="DEBIT">Debit</option>
            </select>
            {errors.transactionType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.transactionType}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className={`w-full p-2 border rounded ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
        </form>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionModal;
