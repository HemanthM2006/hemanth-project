// frontend/src/pages/SustainableGuidance.jsx
import React, { useState } from "react";
import "../styles/cards.css";

function SustainableGuidance() {
  const [category, setCategory] = useState("Soil");

  const guidance = {
    Soil: [
      {
        title: "Use Organic Compost",
        desc: "Improves soil structure, increases microbes, and reduces chemical dependency.",
        emoji: "🌿",
      },
      {
        title: "Avoid Over-Tilling",
        desc: "Excess tilling breaks soil texture and reduces water holding capacity.",
        emoji: "🚜",
      },
      {
        title: "Mulching",
        desc: "Reduces evaporation and keeps soil temperature stable.",
        emoji: "🍂",
      },
    ],
    Water: [
      {
        title: "Drip Irrigation",
        desc: "Saves water and delivers moisture directly to plant roots.",
        emoji: "💧",
      },
      {
        title: "Irrigate Early Morning",
        desc: "Reduces water loss due to evaporation and improves absorption.",
        emoji: "🌤️",
      },
      {
        title: "Rainwater Harvesting",
        desc: "Store rainwater for dry seasons and reduce groundwater usage.",
        emoji: "🏞️",
      },
    ],
    Pest: [
      {
        title: "Neem-Based Spray",
        desc: "Natural pest control that is safe and eco-friendly for crops.",
        emoji: "🌱",
      },
      {
        title: "Trap Crops",
        desc: "Plant trap crops to reduce pest attacks on main crops.",
        emoji: "🪴",
      },
      {
        title: "Regular Field Monitoring",
        desc: "Early detection helps prevent major crop loss.",
        emoji: "🔍",
      },
    ],
  };

  const items = guidance[category];

  function handleChange(e) {
    setCategory(e.target.value);
  }

  return (
    <div className="cardsPage">
      <div className="cardsHeader">
        <h1 className="cardsTitle">Sustainable Guidance ♻️</h1>
        <p className="cardsSubtitle">
          Eco-friendly farming practices to protect soil, save water, and improve
          yield naturally.
        </p>
      </div>

      <div className="cardsFilters">
        <div className="filterBox">
          <label className="filterLabel" htmlFor="category">
            Select Category
          </label>
          <select
            className="filterSelect"
            id="category"
            name="category"
            value={category}
            onChange={handleChange}
          >
            <option value="Soil">Soil Care</option>
            <option value="Water">Water Saving</option>
            <option value="Pest">Pest Control</option>
          </select>
        </div>

        <div className="filterBox">
          <div className="filterLabel">Smart Note</div>
          <div className="healthSummary">
            Small sustainable changes can give long-term benefits to your farm.
          </div>
        </div>
      </div>

      <div className="cardsGrid">
        {items.map((g) => (
          <div key={g.title} className="cropCard">
            <div className="cropCard__top">
              <div className="cropCard__emoji">{g.emoji}</div>
              <div className="cropCard__name">{g.title}</div>
            </div>

            <div className="cropCard__tip">
              <div className="cropCard__tipTitle">Guidance</div>
              <div className="cropCard__tipText">{g.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SustainableGuidance;
