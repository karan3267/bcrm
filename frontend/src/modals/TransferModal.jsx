import { useState } from "react";

function TransferModal({ isOpen, onClose, accounts, onTransfer }) {
  const [formData, setFormData] = useState({
    fromAccountId: "",
    toAccountId: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fromAccountId) {
      newErrors.fromAccountId = "Sender account is required.";
    }
    if (!formData.toAccountId) {
      newErrors.toAccountId = "Receiver account is required.";
    }
    if (formData.fromAccountId === formData.toAccountId) {
      newErrors.toAccountId = "Sender and receiver accounts must be different.";
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Transfer amount must be greater than zero.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onTransfer(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Transfer Funds</h2>
        <form className="space-y-4">
          {/* Sender Account */}
          <div>
            <label className="block text-gray-700">Sender Account</label>
            <select
              name="fromAccountId"
              value={formData.fromAccountId}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.fromAccountId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Account</option>
              {accounts.map((account) => (
                <option key={account.account_number} value={account.account_number}>
                  {account.account_number} - {account.balance} (Balance)
                </option>
              ))}
            </select>
            {errors.fromAccountId && (
              <p className="text-red-500 text-sm mt-1">{errors.fromAccountId}</p>
            )}
          </div>
          {/* Receiver Account */}
          <div>
            <label className="block text-gray-700">Receiver Account</label>
            <select
              name="toAccountId"
              value={formData.toAccountId}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.toAccountId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Account</option>
              {accounts.map((account) => (
                <option key={account.account_number} value={account.account_number}>
                  {account.account_number} - {account.balance} (Balance)
                </option>
              ))}
            </select>
            {errors.toAccountId && (
              <p className="text-red-500 text-sm mt-1">{errors.toAccountId}</p>
            )}
          </div>
          {/* Amount */}
          <div>
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Transfer Amount"
              className={`w-full p-2 border rounded ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
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
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransferModal;
