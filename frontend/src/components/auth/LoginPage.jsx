import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(email, password);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);

        // Use login from AuthContext
        login(userData.token, userData.role);

        navigate("/profile");
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 shadow rounded-lg flex flex-col lg:flex-row gap-8">
      {/* Login Form */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>

      {/* Instructions Tab */}
      <div className="flex-1 bg-white p-4 border rounded-md shadow">
        <h3 className="text-lg font-semibold mb-3">Login Instructions</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
          <li>Ensure you use the email address registered with the system.</li>
          <li>Your password must match the one you set during registration.</li>
          <li>
            The default credential for Admin is <br />
            email:<b> admin@gmail.com</b>
            &nbsp;& &nbsp;password:<b> admin</b>
          </li>
          <li className="text-red-700">
            <b>IMP:</b> For now you cannot update the current login admin email.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LoginPage;
