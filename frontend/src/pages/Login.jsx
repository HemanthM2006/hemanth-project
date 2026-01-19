// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import authService from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      await authService.login({
        email: form.email,
        password: form.password,
      });

      setMessage("Login successful. Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 400);
    } catch (error) {
      setMessage(error.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authHeader">
          <h1 className="authTitle">Welcome back</h1>
          <p className="authSubtitle">Login to manage your farm insights</p>
        </div>

        <form className="authForm" onSubmit={handleSubmit}>
          <label className="authLabel" htmlFor="email">
            Email
          </label>
          <input
            className="authInput"
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="authLabel" htmlFor="password">
            Password
          </label>
          <input
            className="authInput"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="authButton" type="submit">
            Login
          </button>

          {message ? <div className="authMessage">{message}</div> : null}
        </form>

        <div className="authFooterText">
          Don’t have an account?{" "}
          <Link className="authLink" to="/register">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
