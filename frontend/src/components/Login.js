import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils";
import { ToastContainer } from "react-toastify";
import SummaryApi from "../common";
import "./style.css";

function Login({ setIsAuthenticated }) {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = loginInfo.email.trim();
    const password = loginInfo.password.trim();

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
       
      if (!dataResponse.ok) {
        throw new Error(`HTTP Error: ${dataResponse.status}`);
      }

      const result = await dataResponse.json();
      const { success, message, token, user, error } = result;
      
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", `${user.firstName} ${user.lastName}`);
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        handleError(error?.details?.[0]?.message || message);
      }
    } catch (err) {
      console.error("Login Error:", err);
      handleError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email..."
              onChange={handleChange}
              value={loginInfo.email}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password..."
              onChange={handleChange}
              value={loginInfo.password}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
