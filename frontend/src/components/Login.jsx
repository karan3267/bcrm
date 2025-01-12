import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/AuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ email, password }));
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-vector/rupee-symbol-digital-technology-background_1017-36810.jpg?t=st=1732797827~exp=1732801427~hmac=afc3887985f1d3ecc2a5087608eba7df6397757fe2bfde811a3ab6e711f7dc21&w=996')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-600 to-gray-800 opacity-80"></div>
      
      {/* Login Form */}
      <div className="relative z-10 bg-white p-10 rounded-lg shadow-md w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Welcome to Bank CRM
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-600"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
