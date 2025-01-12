import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 h-screen fixed top-0 left-0">
      <h2 className="text-2xl font-semibold mb-6">Banking CRM</h2>
      <ul>
        <li><Link to="/dashboard" className="block py-2">Dashboard</Link></li>
        <li><Link to="/accounts" className="block py-2">Accounts</Link></li>
        <li><Link to="/transactions" className="block py-2">Transactions</Link></li>
        <li><Link to="/customers" className="block py-2">Customers</Link></li>
        <li><Link to="/transfer" className="block py-2">Transfer</Link></li>
        <li><Link to="/reports" className="block py-2">Reports</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
