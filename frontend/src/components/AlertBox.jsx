// frontend/src/components/AlertBox.jsx
import React from "react";
import "../styles/cards.css";

function AlertBox({ title, message, type }) {
  const safeType =
    type === "success" || type === "warning" || type === "danger"
      ? type
      : "success";

  return (
    <div className={`alertBox alertBox--${safeType}`}>
      <div className="alertBox__title">{title}</div>
      <div className="alertBox__message">{message}</div>
    </div>
  );
}

export default AlertBox;
