import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const EyeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.916-4.517m2.062-1.445A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.957 9.957 0 01-1.3 2.507M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
  </svg>
);

const Login = () => {
  const { login } = useContext(AuthContext);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // toggle state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser({ mobile, password });
    if (res.token) {
      login(res.user, res.token);
      setError("");
      navigate("/employee"); // login success pe employee page redirect
    } else {
      setError(res.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
