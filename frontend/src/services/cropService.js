// frontend/src/services/cropService.js
import api from "./api";

async function getCropRecommendations(payload) {
  return api.post("/api/crops/recommendations", payload);
}

async function getCropHealthReport(payload) {
  return api.post("/api/crops/health", payload);
}

async function runCropSimulation(payload) {
  return api.post("/api/crops/simulation", payload);
}

export default {
  getCropRecommendations,
  getCropHealthReport,
  runCropSimulation,
};
