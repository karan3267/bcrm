import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function CustomerModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    kyc_verified: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "kyc_verified" ? value === "true" : value,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: parseInt(value),
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!formData.phone.toString().trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (formData.phone.length < 10 || formData.phone.length > 15) {
      newErrors.phone = "Phone number must be valid and include country code.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
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
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={`w-full p-2 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full p-2 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <PhoneInput
              country={"in"}
              value={formData.phone.toString()}
              onChange={handlePhoneChange}
              inputClass={`p-2 border rounded ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              containerClass="phone-input-container"
              inputStyle={{
                marginLeft:"65px",
                width: "60%",
                borderRadius: "4px",
                padding: "8px",
              }}
              buttonStyle={{
                borderRadius: "4px",
                padding: "8px",
              }}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className={`w-full p-2 border rounded ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div>
            <label className="block text-gray-700">KYC Verified</label>
            <select
              name="kyc_verified"
              value={formData.kyc_verified}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
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

export default CustomerModal;
