// frontend/src/pages/CropSimulation.jsx
import React, { useState } from "react";
import "../styles/cards.css";
import "../styles/forms.css";
import cropService from "../services/cropService";

function CropSimulation() {
  const [inputs, setInputs] = useState({
    crop: "Rice",
    landSize: "",
    waterAvailability: "Medium",
    season: "Kharif",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [resultData, setResultData] = useState(null);

  function handleChange(e) {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSimulate(e) {
    e.preventDefault();
    setLoading(true);
    setResultMessage("");
    setResultData(null);

    const payload = {
      crop: inputs.crop,
      landSize: Number(inputs.landSize),
      waterAvailability: inputs.waterAvailability,
      season: inputs.season,
      budget: Number(inputs.budget),
    };

    try {
      const data = await cropService.runCropSimulation(payload);

      setResultData(data);
      setResultMessage("Simulation completed successfully.");
    } catch (error) {
      setResultMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cardsPage">
      <div className="cardsHeader">
        <h1 className="cardsTitle">Crop Simulation 🌾</h1>
        <p className="cardsSubtitle">
          Try different crop planning inputs and see expected outcomes (demo UI).
        </p>
      </div>

      <div className="cardsFilters">
        <div className="filterBox">
          <div className="filterLabel">Purpose</div>
          <div className="healthSummary">
            Helps farmers plan crops based on season, water and budget.
          </div>
        </div>

        <div className="filterBox">
          <div className="filterLabel">Note</div>
          <div className="healthSummary">
            This is a simulation screen. It works with mock data now and real
            backend later.
          </div>
        </div>
      </div>

      <div className="cardsGrid">
        <div className="cropCard">
          <div className="cropCard__top">
            <div className="cropCard__emoji">🧪</div>
            <div className="cropCard__name">Simulation Inputs</div>
          </div>

          <form className="carbonForm" onSubmit={handleSimulate}>
            <div className="carbonField">
              <label className="carbonLabel" htmlFor="crop">
                Crop
              </label>
              <select
                id="crop"
                className="carbonInput"
                name="crop"
                value={inputs.crop}
                onChange={handleChange}
              >
                <option value="Rice">Rice</option>
                <option value="Wheat">Wheat</option>
                <option value="Maize">Maize</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Cotton">Cotton</option>
              </select>
            </div>

            <div className="carbonField">
              <label className="carbonLabel" htmlFor="landSize">
                Land Size (acres)
              </label>
              <input
                id="landSize"
                className="carbonInput"
                type="number"
                name="landSize"
                value={inputs.landSize}
                onChange={handleChange}
                placeholder="Ex: 5"
                required
              />
            </div>

            <div className="carbonField">
              <label className="carbonLabel" htmlFor="waterAvailability">
                Water Availability
              </label>
              <select
                id="waterAvailability"
                className="carbonInput"
                name="waterAvailability"
                value={inputs.waterAvailability}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="carbonField">
              <label className="carbonLabel" htmlFor="season">
                Season
              </label>
              <select
                id="season"
                className="carbonInput"
                name="season"
                value={inputs.season}
                onChange={handleChange}
              >
                <option value="Kharif">Kharif</option>
                <option value="Rabi">Rabi</option>
                <option value="Summer">Summer</option>
              </select>
            </div>

            <div className="carbonField">
              <label className="carbonLabel" htmlFor="budget">
                Budget (₹)
              </label>
              <input
                id="budget"
                className="carbonInput"
                type="number"
                name="budget"
                value={inputs.budget}
                onChange={handleChange}
                placeholder="Ex: 15000"
                required
              />
            </div>

            <button className="formButton" type="submit" disabled={loading}>
              {loading ? "Running..." : "Run Simulation"}
            </button>

            {resultMessage ? (
              <div
                className={
                  resultMessage.toLowerCase().includes("error")
                    ? "formMessage formMessage--error"
                    : "formMessage"
                }
              >
                {resultMessage}
              </div>
            ) : null}
          </form>
        </div>

        <div className="cropCard">
          <div className="cropCard__top">
            <div className="cropCard__emoji">📈</div>
            <div className="cropCard__name">Expected Output</div>
          </div>

          <div className="cropCard__meta">
            <div className="metaRow">
              <span className="metaKey">Selected Crop</span>
              <span className="metaValue">{inputs.crop}</span>
            </div>
            <div className="metaRow">
              <span className="metaKey">Season</span>
              <span className="metaValue">{inputs.season}</span>
            </div>
            <div className="metaRow">
              <span className="metaKey">Water</span>
              <span className="metaValue">{inputs.waterAvailability}</span>
            </div>
          </div>

          <div className="cropCard__tip">
            <div className="cropCard__tipTitle">Simulation Insight</div>
            <div className="cropCard__tipText">
              {resultData && resultData.result
                ? resultData.result
                : "In future, this section will show yield estimate, cost breakdown, profit range, and risk level."}
            </div>
          </div>

          {resultData && resultData.payload ? (
            <div className="cropCard__meta">
              <div className="metaRow">
                <span className="metaKey">Land Size</span>
                <span className="metaValue">{resultData.payload.landSize} acres</span>
              </div>
              <div className="metaRow">
                <span className="metaKey">Budget</span>
                <span className="metaValue">₹{resultData.payload.budget}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="cropCard">
          <div className="cropCard__top">
            <div className="cropCard__emoji">✅</div>
            <div className="cropCard__name">Smart Suggestions</div>
          </div>

          <div className="carbonList">
            <div className="carbonTip">
              <div className="carbonTip__title">Use Soil Testing</div>
              <div className="carbonTip__text">
                Test soil before sowing to avoid unnecessary fertilizer cost.
              </div>
            </div>

            <div className="carbonTip">
              <div className="carbonTip__title">Plan Irrigation</div>
              <div className="carbonTip__text">
                Use drip or scheduled irrigation to reduce water wastage.
              </div>
            </div>

            <div className="carbonTip">
              <div className="carbonTip__title">Follow Crop Calendar</div>
              <div className="carbonTip__text">
                Choose the correct season to reduce pest and disease risk.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CropSimulation;
