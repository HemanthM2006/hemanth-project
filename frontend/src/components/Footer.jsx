// frontend/src/components/Footer.jsx
import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">SAP</div>
          <div>
            <div className="footer__title">Smart Agricultural Platform</div>
            <div className="footer__tagline">
              Smart farming for better yield and sustainability.
            </div>
          </div>
        </div>

        <div className="footer__links">
          <NavLink className="footer__link" to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="footer__link" to="/soil">
            Soil Data
          </NavLink>
          <NavLink className="footer__link" to="/crop-recommendation">
            Crop Recommendation
          </NavLink>
          <NavLink className="footer__link" to="/marketplace">
            Marketplace
          </NavLink>
          <NavLink className="footer__link" to="/profile">
            Profile
          </NavLink>
        </div>

        <div className="footer__bottom">
          <div className="footer__small">
            © {new Date().getFullYear()} Smart Agriculture Platform
          </div>
          <div className="footer__small">Built with React (CRA)</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
