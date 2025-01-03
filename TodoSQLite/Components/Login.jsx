import React, { useState } from "react";
import axios from "axios";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both username and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      navigate("/Home");

      console.log("Response:", response);

      if (response.data.message === "Login successful!") {
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back To Weekly App</h2>
        <p className="subtitle">Please enter your details to sign in</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        
        <p className="register-link">
          Don't have an account? <a href="./Register">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;