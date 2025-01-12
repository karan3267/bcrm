import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomer,
  deleteCustomer,
  fetchCustomers,
  updateCustomer,
} from "../redux/CustomersSlice";
import "../styles/Customer.css";
import CustomerModal from "../modals/CustomerModel";

function Customers() {
  const dispatch = useDispatch();
  const { data: customers } = useSelector((state) => state.customers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 15;

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleAddCustomer = () => {
    setEditingCustomer(null); // Reset editing state
    setIsModalOpen(true); // Open modal
  };

  // Handle Edit Customer
  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer); // Set customer data for editing
    setIsModalOpen(true); // Open modal
  };

  // Handle Delete Customer
  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomer(id));
    }
  };

  const handleSaveCustomer = (customerData) => {
    if (editingCustomer) {
      // Update existing customer
      dispatch(
        updateCustomer({ id: editingCustomer.id, updatedData: customerData })
      );
    } else {
      // Create new customer
      dispatch(createCustomer(customerData));
    }
    setIsModalOpen(false); // Close modal after save
  };

  // Calculate paginated data
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentCustomers = customers.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(customers.length / entriesPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6">Customers</h1>
      <div className="flex justify-end my-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddCustomer}
        >
          Add Customer
        </button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Customer Id</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>KYC Verified</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>{customer.kyc_verified.toString()}</td>
                <td>{customer.created_at}</td>
                <td>
                  <button
                    onClick={() => handleEditCustomer(customer)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(customer.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CustomerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCustomer}
          initialData={editingCustomer}
        />
      </div>

      {/* Pagination Controls */}
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
    </div>
  );
}

export default Customers;
