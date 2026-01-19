// frontend/src/components/SoilForm.jsx
import React, { useState } from "react";
import "../styles/forms.css";
import soilService from "../services/soilService";

function SoilForm() {
  const [form, setForm] = useState({
    location: "",
    ph: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    moisture: "",
  });

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setStatus("");

    const payload = {
      location: form.location,
      ph: Number(form.ph),
      nitrogen: Number(form.nitrogen),
      phosphorus: Number(form.phosphorus),
      potassium: Number(form.potassium),
      moisture: Number(form.moisture),
    };

    try {
      await soilService.submitSoilData(payload);

      setStatus("success");
      setMessage("Soil report saved successfully.");

      setForm({
        location: "",
        ph: "",
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        moisture: "",
      });
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Failed to save soil report.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="formCard" onSubmit={handleSubmit}>
      <div className="formGrid">
        <div className="formField">
          <label className="formLabel" htmlFor="location">
            Farm Location
          </label>
          <input
            className="formInput"
            id="location"
            name="location"
            type="text"
            placeholder="Ex: Mysuru, Karnataka"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formField">
          <label className="formLabel" htmlFor="ph">
            Soil pH
          </label>
          <input
            className="formInput"
            id="ph"
            name="ph"
            type="number"
            step="0.1"
            placeholder="Ex: 6.5"
            value={form.ph}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formField">
          <label className="formLabel" htmlFor="nitrogen">
            Nitrogen (N)
          </label>
          <input
            className="formInput"
            id="nitrogen"
            name="nitrogen"
            type="number"
            placeholder="Ex: 40"
            value={form.nitrogen}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formField">
          <label className="formLabel" htmlFor="phosphorus">
            Phosphorus (P)
          </label>
          <input
            className="formInput"
            id="phosphorus"
            name="phosphorus"
            type="number"
            placeholder="Ex: 30"
            value={form.phosphorus}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formField">
          <label className="formLabel" htmlFor="potassium">
            Potassium (K)
          </label>
          <input
            className="formInput"
            id="potassium"
            name="potassium"
            type="number"
            placeholder="Ex: 25"
            value={form.potassium}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formField">
          <label className="formLabel" htmlFor="moisture">
            Moisture (%)
          </label>
          <input
            className="formInput"
            id="moisture"
            name="moisture"
            type="number"
            step="0.1"
            placeholder="Ex: 18.5"
            value={form.moisture}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button className="formButton" type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Soil Data"}
      </button>

      {message ? (
        <div
          className={
            status === "error"
              ? "formMessage formMessage--error"
              : "formMessage"
          }
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}

export default SoilForm;
