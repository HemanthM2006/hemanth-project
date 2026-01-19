// frontend/src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import "../styles/cards.css";
import "../styles/auth.css";
import profileService from "../services/profileService";

function Profile() {
  const [profile, setProfile] = useState({
    fullName: "",
    location: "",
    farmType: "Mixed Farming",
    landSize: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    setLoading(true);
    setMessage("");

    try {
      const data = await profileService.getMyProfile();

      setProfile({
        fullName: data?.fullName || "",
        location: data?.location || "",
        farmType: data?.farmType || "Mixed Farming",
        landSize: data?.landSize || "",
        phone: data?.phone || "",
      });

      setMessage("Profile loaded from backend ✅");
    } catch (err) {
      setProfile({
        fullName: "Hemanth",
        location: "Karnataka, India",
        farmType: "Mixed Farming",
        landSize: "5",
        phone: "",
      });

      setMessage("Backend not connected. Showing mock profile.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  function handleChange(e) {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setMessage("");

    try {
      await profileService.updateMyProfile(profile);
      setMessage("Profile saved successfully ✅");
    } catch (err) {
      setMessage("Backend not connected. Saved only in UI (mock).");
    }
  }

  return (
    <div className="cardsPage">
      <div className="cardsHeader">
        <h1 className="cardsTitle">Profile 👨‍🌾</h1>
        <p className="cardsSubtitle">
          Manage your farmer details and keep your farm information updated.
        </p>
      </div>

      {message ? (
        <div className="alertBox alertBox--success">
          <div className="alertBox__title">Status</div>
          <div className="alertBox__message">{message}</div>
        </div>
      ) : null}

      <div className="cardsGrid">
        <div className="cropCard">
          <div className="cropCard__top">
            <div className="cropCard__emoji">🧑‍🌾</div>
            <div className="cropCard__name">
              Farmer Details {loading ? "(Loading...)" : ""}
            </div>
          </div>

          <form className="authForm" onSubmit={handleSave}>
            <label className="authLabel" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              className="authInput"
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
            />

            <label className="authLabel" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              className="authInput"
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="Ex: Bengaluru, Karnataka"
            />

            <label className="authLabel" htmlFor="farmType">
              Farm Type
            </label>
            <select
              id="farmType"
              className="authInput"
              name="farmType"
              value={profile.farmType}
              onChange={handleChange}
            >
              <option value="Mixed Farming">Mixed Farming</option>
              <option value="Crop Farming">Crop Farming</option>
              <option value="Horticulture">Horticulture</option>
              <option value="Dairy Farming">Dairy Farming</option>
            </select>

            <label className="authLabel" htmlFor="landSize">
              Land Size (acres)
            </label>
            <input
              id="landSize"
              className="authInput"
              type="number"
              name="landSize"
              value={profile.landSize}
              onChange={handleChange}
              placeholder="Ex: 5"
            />

            <label className="authLabel" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              className="authInput"
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Ex: 9876543210"
            />

            <button className="authButton" type="submit">
              Save Profile
            </button>
          </form>
        </div>

        <div className="cropCard">
          <div className="cropCard__top">
            <div className="cropCard__emoji">📌</div>
            <div className="cropCard__name">Quick Summary</div>
          </div>

          <div className="cropCard__meta">
            <div className="metaRow">
              <span className="metaKey">Farmer</span>
              <span className="metaValue">{profile.fullName || "Not set"}</span>
            </div>
            <div className="metaRow">
              <span className="metaKey">Location</span>
              <span className="metaValue">{profile.location || "Not set"}</span>
            </div>
            <div className="metaRow">
              <span className="metaKey">Farm Type</span>
              <span className="metaValue">{profile.farmType || "Not set"}</span>
            </div>
            <div className="metaRow">
              <span className="metaKey">Land</span>
              <span className="metaValue">
                {profile.landSize ? `${profile.landSize} acres` : "Not set"}
              </span>
            </div>
          </div>

          <div className="cropCard__tip">
            <div className="cropCard__tipTitle">Smart Tip 🌿</div>
            <div className="cropCard__tipText">
              Keeping your profile updated helps us generate better crop
              recommendations and sustainability reports.
            </div>
          </div>
        </div>

        <div className="cropCard">
          <div className="cropCard__top">
            <div className="cropCard__emoji">🧾</div>
            <div className="cropCard__name">Account Status</div>
          </div>

          <div className="scoreBox">
            <div className="scoreBox__value">Active</div>
            <div className="scoreBox__label">Membership</div>
            <div className="scoreBox__note">
              Real user profile + database sync will be added in backend.
            </div>
          </div>

          <button
            className="navbar__button navbar__button--ghost"
            style={{ marginTop: "12px", width: "100%" }}
            type="button"
            onClick={loadProfile}
          >
            Refresh Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
