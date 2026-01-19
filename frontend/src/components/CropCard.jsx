// frontend/src/components/CropCard.jsx
import React from "react";
import "../styles/cards.css";

function CropCard({ crop }) {
  return (
    <div className="cropCard">
      <div className="cropCard__top">
        <div className="cropCard__emoji">{crop.emoji}</div>
        <div className="cropCard__name">{crop.name}</div>
      </div>

      <div className="cropCard__meta">
        <div className="metaRow">
          <span className="metaKey">Season</span>
          <span className="metaValue">{crop.season}</span>
        </div>
        <div className="metaRow">
          <span className="metaKey">Soil</span>
          <span className="metaValue">{crop.soil}</span>
        </div>
        <div className="metaRow">
          <span className="metaKey">Water</span>
          <span className="metaValue">{crop.water}</span>
        </div>
        <div className="metaRow">
          <span className="metaKey">Market</span>
          <span className="metaValue">{crop.profit}</span>
        </div>
      </div>

      <div className="cropCard__tip">
        <div className="cropCard__tipTitle">Smart Tip</div>
        <div className="cropCard__tipText">{crop.tip}</div>
      </div>
    </div>
  );
}

export default CropCard;
