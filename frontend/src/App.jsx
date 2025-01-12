// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Customers from "./pages/Customer";
import Reports from "./pages/Reports";
import PrivateRoute from "./components/PrivateRoute";
import TransfersPage from "./pages/Transfer";
import { useSelector } from "react-redux";

function App() {
  const {isAuthenticated} = useSelector((state) => state.auth);
  return (
    <>
      <BrowserRouter>
        <div className="flex h-screen w-screen" style={{left:0,right:0,position:"absolute"}}>
          {isAuthenticated && <Sidebar />}
          <div className={`flex h-screen ${isAuthenticated ? 'ml-64' : ''} w-full`}>          
            <div className="flex-1 p-6 bg-gray-100">
              <Routes>
                {!isAuthenticated&&
                  <Route path="/login" element={<Login />} />
                }
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/transfer" element={<TransfersPage />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/*" element={<Dashboard />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
