// frontend/src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/cards.css";

function NotFound() {
  return (
    <div className="cardsPage">
      <div className="cardsGrid">
        <div className="cropCard">
          <div className="cropCard__top">
            <div className="cropCard__emoji">🌾</div>
            <div className="cropCard__name">Page Not Found</div>
          </div>

          <p className="cardsSubtitle">
            The page you are looking for does not exist or has been moved.
          </p>

          <div className="cropCard__tip">
            <div className="cropCard__tipTitle">What you can do</div>
            <div className="cropCard__tipText">
              Go back to your dashboard and continue managing your farm data.
            </div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <Link to="/dashboard" className="navbar__button navbar__button--primary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
