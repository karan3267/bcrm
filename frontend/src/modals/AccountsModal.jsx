import { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../redux/CustomersSlice";

function AccountsModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    customer_id:"",
    balance:"",
    account_type:"SAVINGS"
  });
  const dispatch=useDispatch();
  const {data:customers}=useSelector((state)=>state.customers);

  const [errors, setErrors] = useState({});
  useEffect(() => {
    dispatch(fetchCustomers());
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData,dispatch]);
  const customerMap = customers.reduce((acc, customer) => ({...acc, [customer.id]: true}),{});
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }
  const validate = () => {
    const newErrors = {};
    if (!formData.customer_id.trim()) {
      newErrors.customer_id = "Customer Id is required.";
    }else if(!customerMap[formData.customer_id]){
      newErrors.customer_id="Please Enter a valid Customer Id"
    }

    if (!formData.balance.trim()) {
      newErrors.balance = "Amount is required.";
    } else if (formData.balance<0){
      newErrors.balance = "Amount should be at least $1000.";
    }

    if (!formData.account_type.trim()) {
      newErrors.account_type = "Account Type is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4">
          {initialData ? "Edit Customer" : "Add Customer"}
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Customer ID</label>
            <input
            type="text"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            placeholder="Customer Id"
            className={`w-full p-2 border rounded ${errors.customer_id?"border-red-500":"border-gray-300"}`}
            />
            {errors.customer_id && <p className="text-red-500 text-sm">{errors.customer_id}</p>}
          </div>
          <div>
            <label className="text-gray-700 block">Amount</label>
            <input 
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            placeholder="Enter Initial Amount"
            className={`w-full p-2 border rounded ${errors.balance?"border-red-500":"border-gray-300"}`}
            />
            {errors.balance && <p className="text-red-500 text-sm">{errors.balance}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Account Type</label>
            <select
            name="account_type"
            value={formData.account_type}
            onChange={handleChange}
            placeholder="Account Type"
            className={`w-full p-2 border rounded ${errors.balance?"border-red-500":"border-gray-300"}`}
            >
              <option value={"SAVINGS"}>SAVINGS</option>
              <option value={"CURRENT"}>CURRENT</option>
              <option value={"SALARY"}>SALARY</option>
            </select>
            {errors.account_type && <p className="text-red-500 text-sm">{errors.account_type}</p>}
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

export default AccountsModal;
