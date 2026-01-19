// frontend/src/services/soilService.js
import api from "./api";

async function submitSoilData(payload) {
  return api.post("/api/soil", payload);
}

async function getSoilHistory() {
  return api.get("/api/soil");
}

export default {
  submitSoilData,
  getSoilHistory,
};
