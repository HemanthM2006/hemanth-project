// frontend/src/pages/CarbonInsights.jsx
import React, { useState } from "react";
import "../styles/cards.css";
import "../styles/forms.css";
import api from "../services/api";

function CarbonInsights() {
  const [farmData, setFarmData] = useState({
    landSize: "",
    fertilizerUse: "",
    irrigationHours: "",
    dieselUse: "",
  });

  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [report, setReport] = useState(null);

  function handleChange(e) {
    setFarmData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function buildMockReport(payload) {
    const landSize = Number(payload.landSize);
    const fertilizerUse = Number(payload.fertilizerUse);
    const irrigationHours = Number(payload.irrigationHours);
    const dieselUse = Number(payload.dieselUse);

    const fertilizerImpact = fertilizerUse * 1.6;
    const dieselImpact = dieselUse * 2.7;
    const irrigationImpact = irrigationHours * 0.9;

    const total = fertilizerImpact + dieselImpact + irrigationImpact;

    let score = 100;

    if (total > 200) score = 55;
    else if (total > 150) score = 65;
    else if (total > 100) score = 75;
    else score = 85;

    if (landSize > 10) score = Math.max(50, score - 5);

    return {
      totalCarbon: Math.round(total),
      score,
      breakdown: {
        fertilizer: Math.round(fertilizerImpact),
        diesel: Math.round(dieselImpact),
        irrigation: Math.round(irrigationImpact),
      },
      topTip:
        score >= 80
          ? "You are doing great. Keep using efficient irrigation and organic practices."
          : "Reduce diesel usage and chemical fertilizer to improve your sustainability score.",
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResultMessage("");
    setReport(null);

    const payload = {
      landSize: Number(farmData.landSize),
      fertilizerUse: Number(farmData.fertilizerUse),
      irrigationHours: Number(farmData.irrigationHours),
      dieselUse: Number(farmData.dieselUse),
    };

    try {
      const data = await api.post("/api/carbon/report", payload);

      if (data && data.mock) {
        const mock = buildMockReport(payload);
        setReport(mock);
        setResultMessage("Carbon report generated successfully (mock mode).");
      } else if (data && data.report) {
        setReport(data.report);
        setResultMessage("Carbon report generated successfully.");
      } else {
        const mock = buildMockReport(payload);
        setReport(mock);
        setResultMessage("Backend response invalid. Showing mock report.");
      }
    } catch (error) {
      const mock = buildMockReport(payload);
      setReport(mock);
      setResultMessage("Backend not connected. Showing mock carbon report.");
    } finally {
      setLoading(false);
    }
  }

  const ecoScoreValue = report && report.score ? report.score : 78;

  return (
    <div className="cardsPage">
      <div className="cardsHeader">
        <h1 className="cardsTitle">Carbon Insights 🌍</h1>
        <p className="cardsSubtitle">
          Track your farm sustainability and reduce carbon footprint with smart
          farming practices.
        </p>
      </div>

      <div className="cardsFilters">
        <div className="filterBox">
          <div className="filterLabel">Why this matters</div>
          <div className="healthSummary">
            Sustainable farming improves soil health and reduces pollution.
          </div>
        </div>

        <div className="filterBox">
          <div className="filterLabel">Goal</div>
          <div className="healthSummary">
            Reduce emissions and improve eco-friendly farming.
          </div>
        </div>
      </div>

      <div className="cardsGrid">
        <div className="cropCard">
          <div className="cropCard__top">
            <div className="cropCard__emoji">🌿</div>
            <div className="cropCard__name">Enter Farm Inputs</div>
          </div>

          <form className="carbonForm" onSubmit={handleSubmit}>
            <div className="carbonField">
              <label className="carbonLabel" htmlFor="landSize">
                Land Size (acres)
              </label>
              <input
                className="carbonInput"
                id="landSize"
                name="landSize"
                type="number"
                placeholder="Ex: 5"
                value={farmData.landSize}
                onChange={handleChange}
                required
              />
            </div>

            <div className="carbonField">
              <label className="carbonLabel" htmlFor="fertilizerUse">
                Fertilizer Use (kg/month)
              </label>
              <input
                className="carbonInput"
                id="fertilizerUse"
                name="fertilizerUse"
                type="number"
                placeholder="Ex: 40"
                value={farmData.fertilizerUse}
                onChange={handleChange}
                required
              />
            </div>

            <div className="carbonField">
              <label className="carbonLabel" htmlFor="irrigationHours">
                Irrigation Hours (per week)
              </label>
              <input
                className="carbonInput"
                id="irrigationHours"
                name="irrigationHours"
                type="number"
                placeholder="Ex: 12"
                value={farmData.irrigationHours}
                onChange={handleChange}
                required
              />
            </div>

            <div className="carbonField">
              <label className="carbonLabel" htmlFor="dieselUse">
                Diesel Use (litres/month)
              </label>
              <input
                className="carbonInput"
                id="dieselUse"
                name="dieselUse"
                type="number"
                placeholder="Ex: 20"
                value={farmData.dieselUse}
                onChange={handleChange}
                required
              />
            </div>

            <button className="formButton" type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate Carbon Report"}
            </button>

            {resultMessage ? (
              <div className="formMessage">{resultMessage}</div>
            ) : null}
          </form>
        </div>

        <div className="cropCard">
          <div className="cropCard__top">
            <div className="cropCard__emoji">♻️</div>
            <div className="cropCard__name">Eco Recommendations</div>
          </div>

          <div className="carbonList">
            <div className="carbonTip">
              <div className="carbonTip__title">Use Organic Compost</div>
              <div className="carbonTip__text">
                Reduce chemical fertilizer use and improve soil microbes.
              </div>
            </div>

            <div className="carbonTip">
              <div className="carbonTip__title">Drip Irrigation</div>
              <div className="carbonTip__text">
                Saves water and reduces electricity or pump usage.
              </div>
            </div>

            <div className="carbonTip">
              <div className="carbonTip__title">Crop Rotation</div>
              <div className="carbonTip__text">
                Maintains soil nutrients and reduces pest buildup naturally.
              </div>
            </div>

            <div className="carbonTip">
              <div className="carbonTip__title">Reduce Diesel Usage</div>
              <div className="carbonTip__text">
                Plan field work efficiently to reduce fuel consumption.
              </div>
            </div>

            {report && report.topTip ? (
              <div className="carbonTip">
                <div className="carbonTip__title">Personal Tip</div>
                <div className="carbonTip__text">{report.topTip}</div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="cropCard">
          <div className="cropCard__top">
            <div className="cropCard__emoji">📊</div>
            <div className="cropCard__name">Your Sustainability Score</div>
          </div>

          <div className="scoreBox">
            <div className="scoreBox__value">{ecoScoreValue}</div>
            <div className="scoreBox__label">Eco Score</div>
            <div className="scoreBox__note">
              Higher score means better sustainable farming habits.
            </div>
          </div>

          {report ? (
            <div className="cropCard__meta">
              <div className="metaRow">
                <span className="metaKey">Total Impact</span>
                <span className="metaValue">{report.totalCarbon} pts</span>
              </div>
              <div className="metaRow">
                <span className="metaKey">Fertilizer</span>
                <span className="metaValue">{report.breakdown.fertilizer}</span>
              </div>
              <div className="metaRow">
                <span className="metaKey">Diesel</span>
                <span className="metaValue">{report.breakdown.diesel}</span>
              </div>
              <div className="metaRow">
                <span className="metaKey">Irrigation</span>
                <span className="metaValue">{report.breakdown.irrigation}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CarbonInsights;
