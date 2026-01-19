// frontend/src/components/DashboardCard.jsx
import React from "react";
import "../styles/dashboard.css";

function DashboardCard({ title, desc, icon, rightText }) {
  return (
    <div className="dashboardCard">
      <div className="dashboardCard__icon">{icon}</div>

      <div className="dashboardCard__content">
        <div className="dashboardCard__title">{title}</div>
        <div className="dashboardCard__desc">{desc}</div>
      </div>

      <div className="dashboardCard__right">{rightText}</div>
    </div>
  );
}

export default DashboardCard;
