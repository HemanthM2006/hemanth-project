// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import authService from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
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
      await authService.register({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });

      setMessage("Account created successfully. Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      setMessage(error.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authHeader">
          <h1 className="authTitle">Create your account</h1>
          <p className="authSubtitle">
            Join Smart Agriculture to track soil, crops, and insights
          </p>
        </div>

        <form className="authForm" onSubmit={handleSubmit}>
          <label className="authLabel" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="authInput"
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Your name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

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
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="authButton" type="submit">
            Register
          </button>

          {message ? <div className="authMessage">{message}</div> : null}
        </form>

        <div className="authFooterText">
          Already have an account?{" "}
          <Link className="authLink" to="/login">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
