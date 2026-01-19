// frontend/src/pages/CropHealth.jsx
import React, { useMemo, useState } from "react";
import "../styles/cards.css";
import "../styles/forms.css";
import AlertBox from "../components/AlertBox";
import cropService from "../services/cropService";

function CropHealth() {
  const [selectedCrop, setSelectedCrop] = useState("Tomato");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "",
  });

  const crops = useMemo(() => {
    return [
      { name: "Tomato", emoji: "🍅" },
      { name: "Rice", emoji: "🌾" },
      { name: "Maize", emoji: "🌽" },
      { name: "Chilli", emoji: "🌶️" },
    ];
  }, []);

  const fallbackHealthCards = useMemo(() => {
    return [
      {
        title: "Leaf Condition",
        status: "Healthy",
        desc: "Leaves look fresh with good green color.",
        emoji: "🍃",
        type: "success",
      },
      {
        title: "Pest Risk",
        status: "Medium",
        desc: "Check for small insects under leaves weekly.",
        emoji: "🐛",
        type: "warning",
      },
      {
        title: "Disease Alert",
        status: "Low",
        desc: "No major disease symptoms detected.",
        emoji: "🧪",
        type: "success",
      },
      {
        title: "Water Stress",
        status: "High",
        desc: "Soil moisture seems low. Consider irrigation.",
        emoji: "💧",
        type: "danger",
      },
    ];
  }, []);

  const [healthCards, setHealthCards] = useState(fallbackHealthCards);

  function handleChange(e) {
    setSelectedCrop(e.target.value);
  }

  async function handleCheckHealth() {
    setLoading(true);
    setAlert({ title: "", message: "", type: "" });

    try {
      const data = await cropService.getCropHealthReport({
        cropName: selectedCrop,
      });

      if (data && Array.isArray(data.cards)) {
        setHealthCards(data.cards);
        setAlert({
          title: "Health Report Updated",
          message: `Latest crop health report loaded for ${selectedCrop}.`,
          type: "success",
        });
      } else {
        setHealthCards(fallbackHealthCards);
        setAlert({
          title: "Using Fallback Data",
          message:
            "Backend response format is invalid. Showing default health cards.",
          type: "danger",
        });
      }
    } catch (error) {
      setHealthCards(fallbackHealthCards);
      setAlert({
        title: "API Not Connected",
        message: error.message,
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cardsPage">
      <div className="cardsHeader">
        <h1 className="cardsTitle">Crop Health 🧑‍🌾</h1>
        <p className="cardsSubtitle">
          Track crop condition and take early action to protect yield.
        </p>
      </div>

      <div className="cardsFilters">
        <div className="filterBox">
          <label className="filterLabel" htmlFor="crop">
            Select Crop
          </label>
          <select
            className="filterSelect"
            id="crop"
            name="crop"
            value={selectedCrop}
            onChange={handleChange}
          >
            {crops.map((c) => (
              <option key={c.name} value={c.name}>
                {c.emoji} {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filterBox">
          <div className="filterLabel">Current Status</div>
          <div className="healthSummary">
            Monitoring:{" "}
            <span className="healthSummary__crop">{selectedCrop}</span>
          </div>
        </div>

        <div className="filterBox">
          <div className="filterLabel">Action</div>
          <button
            type="button"
            className="formButton"
            onClick={handleCheckHealth}
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Health"}
          </button>
        </div>
      </div>

      {alert.message ? (
        <AlertBox title={alert.title} message={alert.message} type={alert.type} />
      ) : (
        <AlertBox
          title="Quick Advice"
          message="If water stress is high, irrigate early morning or evening to reduce evaporation."
          type="warning"
        />
      )}

      <div className="cardsGrid">
        {healthCards.map((h) => (
          <div key={h.title} className="healthCard">
            <div className="healthCard__top">
              <div className="healthCard__emoji">{h.emoji}</div>
              <div className="healthCard__title">{h.title}</div>
            </div>

            <div className={`healthCard__status healthCard__status--${h.type}`}>
              {h.status}
            </div>

            <div className="healthCard__desc">{h.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropHealth;
