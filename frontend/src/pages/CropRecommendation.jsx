// frontend/src/pages/CropRecommendation.jsx
import React, { useMemo, useState } from "react";
import "../styles/cards.css";
import CropCard from "../components/CropCard";
import cropService from "../services/cropService";

function CropRecommendation() {
  const [filters, setFilters] = useState({
    season: "Kharif",
    soilType: "Loamy",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const fallbackCrops = useMemo(() => {
    return [
      {
        name: "Rice",
        season: "Kharif",
        soil: "Clay",
        water: "High",
        profit: "High Demand",
        tip: "Maintain water level and use proper spacing.",
        emoji: "🌾",
      },
      {
        name: "Maize",
        season: "Kharif",
        soil: "Loamy",
        water: "Medium",
        profit: "Stable",
        tip: "Apply nitrogen in split doses for better yield.",
        emoji: "🌽",
      },
      {
        name: "Ragi",
        season: "Kharif",
        soil: "Red Soil",
        water: "Low",
        profit: "Very Healthy Crop",
        tip: "Works well in low rainfall areas.",
        emoji: "🌿",
      },
      {
        name: "Wheat",
        season: "Rabi",
        soil: "Loamy",
        water: "Medium",
        profit: "Good",
        tip: "Ensure timely irrigation at critical stages.",
        emoji: "🌾",
      },
      {
        name: "Sugarcane",
        season: "All",
        soil: "Loamy",
        water: "High",
        profit: "High Profit",
        tip: "Use drip irrigation to reduce water waste.",
        emoji: "🍬",
      },
      {
        name: "Groundnut",
        season: "Rabi",
        soil: "Sandy",
        water: "Low",
        profit: "Good Market",
        tip: "Avoid water logging, ensure good drainage.",
        emoji: "🥜",
      },
    ];
  }, []);

  const [crops, setCrops] = useState(fallbackCrops);

  const visibleCrops = useMemo(() => {
    return crops.filter((c) => {
      const seasonOk = c.season === "All" || c.season === filters.season;
      const soilOk = c.soil === filters.soilType;
      return seasonOk && soilOk;
    });
  }, [crops, filters.season, filters.soilType]);

  function handleChange(e) {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleFetchRecommendations() {
    setLoading(true);
    setMessage("");
    setStatus("");

    const payload = {
      season: filters.season,
      soilType: filters.soilType,
    };

    try {
      const data = await cropService.getCropRecommendations(payload);

      if (data && Array.isArray(data.crops)) {
        setCrops(data.crops);
        setStatus("success");
        setMessage("Recommendations updated successfully.");
      } else {
        setStatus("error");
        setMessage("Backend response format is invalid. Showing fallback crops.");
        setCrops(fallbackCrops);
      }
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
      setCrops(fallbackCrops);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cardsPage">
      <div className="cardsHeader">
        <h1 className="cardsTitle">Crop Recommendation 🌾</h1>
        <p className="cardsSubtitle">
          Choose your season and soil type to get recommended crops.
        </p>
      </div>

      <div className="cardsFilters">
        <div className="filterBox">
          <label className="filterLabel" htmlFor="season">
            Season
          </label>
          <select
            className="filterSelect"
            id="season"
            name="season"
            value={filters.season}
            onChange={handleChange}
          >
            <option value="Kharif">Kharif</option>
            <option value="Rabi">Rabi</option>
          </select>
        </div>

        <div className="filterBox">
          <label className="filterLabel" htmlFor="soilType">
            Soil Type
          </label>
          <select
            className="filterSelect"
            id="soilType"
            name="soilType"
            value={filters.soilType}
            onChange={handleChange}
          >
            <option value="Loamy">Loamy</option>
            <option value="Clay">Clay</option>
            <option value="Sandy">Sandy</option>
            <option value="Red Soil">Red Soil</option>
          </select>
        </div>

        <div className="filterBox">
          <div className="filterLabel">Action</div>
          <button
            type="button"
            className="formButton"
            onClick={handleFetchRecommendations}
            disabled={loading}
          >
            {loading ? "Getting..." : "Get Recommendations"}
          </button>
        </div>
      </div>

      {message ? (
        <div className={status === "error" ? "alertBox alertBox--danger" : "alertBox alertBox--success"}>
          <div className="alertBox__title">
            {status === "error" ? "Notice" : "Updated"}
          </div>
          <div className="alertBox__message">{message}</div>
        </div>
      ) : null}

      <div className="cardsGrid">
        {visibleCrops.length === 0 ? (
          <div className="emptyState">
            <div className="emptyState__emoji">🌱</div>
            <div className="emptyState__title">No crops found</div>
            <div className="emptyState__text">
              Try changing the season or soil type.
            </div>
          </div>
        ) : (
          visibleCrops.map((crop) => <CropCard key={crop.name} crop={crop} />)
        )}
      </div>
    </div>
  );
}

export default CropRecommendation;
