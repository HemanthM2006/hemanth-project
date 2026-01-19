// frontend/src/pages/SoilData.jsx
import React, { useEffect, useState } from "react";
import "../styles/soil.css";
import "../styles/cards.css";
import SoilForm from "../components/SoilForm";
import soilService from "../services/soilService";

function SoilData() {
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState("");

  async function fetchHistory() {
    setLoadingHistory(true);
    setHistoryError("");

    try {
      const data = await soilService.getSoilHistory();

      // expecting backend returns: { items: [...] } OR just [...]
      const items = Array.isArray(data) ? data : data.items || [];
      setHistory(items);
    } catch (error) {
      setHistoryError(error.message || "Failed to load soil history.");
    } finally {
      setLoadingHistory(false);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="soilPage">
      <div className="soilHeader">
        <h1 className="soilTitle">Soil Data 🌱</h1>
        <p className="soilSubtitle">
          Enter your soil test values to understand fertility and improve crop
          decisions.
        </p>
      </div>

      <div className="soilLayout">
        <div className="soilLeft">
          <div className="soilPanel">
            <div className="soilPanel__top">
              <h2 className="soilPanel__title">Add Soil Report</h2>
              <span className="soilPanel__badge">Quick Entry</span>
            </div>

            <SoilForm />

            <div style={{ marginTop: "14px" }}>
              <button
                type="button"
                className="formButton"
                onClick={fetchHistory}
                disabled={loadingHistory}
              >
                {loadingHistory ? "Refreshing..." : "Refresh Soil History"}
              </button>
            </div>
          </div>

          <div style={{ marginTop: "14px" }}>
            <div className="cardsHeader">
              <h2 className="cardsTitle" style={{ fontSize: "18px" }}>
                Soil History 📋
              </h2>
              <p className="cardsSubtitle">
                Your latest submitted soil reports will appear here.
              </p>
            </div>

            {historyError ? (
              <div className="alertBox alertBox--danger">
                <div className="alertBox__title">Error</div>
                <div className="alertBox__message">{historyError}</div>
              </div>
            ) : null}

            {loadingHistory ? (
              <div className="alertBox alertBox--warning">
                <div className="alertBox__title">Loading...</div>
                <div className="alertBox__message">
                  Fetching soil history from backend.
                </div>
              </div>
            ) : null}

            {!loadingHistory && !historyError && history.length === 0 ? (
              <div className="emptyState">
                <div className="emptyState__emoji">🌱</div>
                <div className="emptyState__title">No soil reports yet</div>
                <div className="emptyState__text">
                  Submit your first soil report and it will show here.
                </div>
              </div>
            ) : null}

            {!loadingHistory && !historyError && history.length > 0 ? (
              <div className="cardsGrid">
                {history.map((item) => (
                  <div key={item.id} className="cropCard">
                    <div className="cropCard__top">
                      <div className="cropCard__emoji">🧾</div>
                      <div className="cropCard__name">
                        {item.location || "Unknown Location"}
                      </div>
                    </div>

                    <div className="cropCard__meta">
                      <div className="metaRow">
                        <span className="metaKey">pH</span>
                        <span className="metaValue">{item.ph}</span>
                      </div>

                      <div className="metaRow">
                        <span className="metaKey">Nitrogen</span>
                        <span className="metaValue">{item.nitrogen}</span>
                      </div>

                      <div className="metaRow">
                        <span className="metaKey">Phosphorus</span>
                        <span className="metaValue">{item.phosphorus}</span>
                      </div>

                      <div className="metaRow">
                        <span className="metaKey">Potassium</span>
                        <span className="metaValue">{item.potassium}</span>
                      </div>

                      <div className="metaRow">
                        <span className="metaKey">Moisture</span>
                        <span className="metaValue">{item.moisture}%</span>
                      </div>
                    </div>

                    <div className="cropCard__tip">
                      <div className="cropCard__tipTitle">Submitted On</div>
                      <div className="cropCard__tipText">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleString()
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="soilRight">
          <div className="soilInfoCard">
            <div className="soilInfoCard__emoji">🧑‍🌾</div>
            <h3 className="soilInfoCard__title">Farmer Friendly Tips</h3>
            <ul className="soilInfoCard__list">
              <li>Ideal pH for most crops is around 6.0 to 7.5</li>
              <li>Low Nitrogen can reduce leaf growth and yield</li>
              <li>Potassium improves crop strength and disease resistance</li>
              <li>Organic compost improves soil texture and moisture holding</li>
            </ul>
          </div>

          <div className="soilMiniStats">
            <div className="soilMiniStat">
              <div className="soilMiniStat__value">pH</div>
              <div className="soilMiniStat__label">Acidity Level</div>
            </div>
            <div className="soilMiniStat">
              <div className="soilMiniStat__value">NPK</div>
              <div className="soilMiniStat__label">Nutrients</div>
            </div>
            <div className="soilMiniStat">
              <div className="soilMiniStat__value">Moisture</div>
              <div className="soilMiniStat__label">Water Content</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoilData;
