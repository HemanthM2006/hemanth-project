// frontend/src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(authService.isLoggedIn());

  useEffect(() => {
    const unsubscribe = authService.subscribe((value) => {
      setLoggedIn(value);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function handleLogout() {
    authService.clearToken();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <span className="navbar__logo">SAP</span>
          <span className="navbar__title">Smart Agricultural Platform</span>
        </div>

        {loggedIn ? (
          <nav className="navbar__links">
            <NavLink to="/dashboard" className="navbar__link">
              Dashboard
            </NavLink>
            <NavLink to="/soil" className="navbar__link">
              Soil Data
            </NavLink>
            <NavLink to="/crop-recommendation" className="navbar__link">
              Crop Recommendation
            </NavLink>
            <NavLink to="/crop-health" className="navbar__link">
              Crop Health
            </NavLink>
            <NavLink to="/carbon-insights" className="navbar__link">
              Carbon Insights
            </NavLink>
            <NavLink to="/sustainable-guidance" className="navbar__link">
              Sustainable Guidance
            </NavLink>
            <NavLink to="/crop-simulation" className="navbar__link">
              Crop Simulation
            </NavLink>
            <NavLink to="/marketplace" className="navbar__link">
              Marketplace
            </NavLink>
            <NavLink to="/profile" className="navbar__link">
              Profile
            </NavLink>
          </nav>
        ) : (
          <div className="navbar__links" />
        )}

        <div className="navbar__auth">
          {loggedIn ? (
            <button
              type="button"
              className="navbar__button navbar__button--ghost"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="navbar__button navbar__button--ghost"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="navbar__button navbar__button--primary"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
