// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import api from "../services/api";

function Dashboard() {
  const [userName, setUserName] = useState("Farmer");
  const [statusText, setStatusText] = useState("");

  const cards = [
    {
      title: "Soil Data",
      desc: "Enter soil values and track fertility trends.",
      to: "/soil",
      icon: "🌱",
    },
    {
      title: "Crop Recommendation",
      desc: "Get best crop suggestions based on soil & season.",
      to: "/crop-recommendation",
      icon: "🌾",
    },
    {
      title: "Crop Health",
      desc: "Monitor crop health status and detect issues early.",
      to: "/crop-health",
      icon: "🧪",
    },
    {
      title: "Carbon Insights",
      desc: "Track sustainable impact and carbon footprint trends.",
      to: "/carbon-insights",
      icon: "🌍",
    },
    {
      title: "Sustainable Guidance",
      desc: "Eco-friendly practices for better yield and soil care.",
      to: "/sustainable-guidance",
      icon: "♻️",
    },
    {
      title: "Marketplace",
      desc: "Buy and sell seeds, fertilizers, tools, and services.",
      to: "/marketplace",
      icon: "🛒",
    },
  ];

  useEffect(() => {
    let mounted = true;

    async function loadMe() {
      try {
        const data = await api.get("/api/users/me");
        if (!mounted) return;

        if (data && data.user && data.user.fullName) {
          setUserName(data.user.fullName);
        }
      } catch (error) {
        if (!mounted) return;
        setStatusText("Backend not connected. Showing default dashboard.");
      }
    }

    loadMe();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="dashboardPage">
      <div className="dashboardHero">
        <div className="dashboardHero__left">
          <h1 className="dashboardHero__title">Welcome, {userName} 🌿</h1>
          <p className="dashboardHero__subtitle">
            Make farming decisions smarter with soil insights, crop guidance, and
            sustainability tools.
          </p>

          {statusText ? <div className="dashboardStatus">{statusText}</div> : null}

          <div className="dashboardHero__stats">
            <div className="statCard">
              <div className="statCard__value">24°C</div>
              <div className="statCard__label">Farm Weather</div>
            </div>
            <div className="statCard">
              <div className="statCard__value">Good</div>
              <div className="statCard__label">Soil Status</div>
            </div>
            <div className="statCard">
              <div className="statCard__value">+12%</div>
              <div className="statCard__label">Yield Trend</div>
            </div>
          </div>
        </div>

        <div className="dashboardHero__right">
          <div className="farmCard">
            <div className="farmCard__top">
              <div className="farmCard__badge">Today’s Tip</div>
              <div className="farmCard__emoji">🚜</div>
            </div>
            <h2 className="farmCard__title">Healthy soil = healthy crops</h2>
            <p className="farmCard__text">
              Add organic compost regularly and avoid over-watering. Balanced
              moisture improves root growth and crop resistance.
            </p>
            <div className="farmCard__footer">
              <span className="farmCard__small">Powered by Smart Insights</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboardSection">
        <h2 className="dashboardSection__title">Quick Actions</h2>
        <p className="dashboardSection__desc">
          Jump into the tools you need most for your farm.
        </p>

        <div className="dashboardGrid">
          {cards.map((c) => (
            <Link key={c.title} className="dashCard" to={c.to}>
              <div className="dashCard__icon">{c.icon}</div>
              <div className="dashCard__content">
                <div className="dashCard__title">{c.title}</div>
                <div className="dashCard__desc">{c.desc}</div>
              </div>
              <div className="dashCard__arrow">→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
