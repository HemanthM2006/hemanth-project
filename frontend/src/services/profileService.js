// frontend/src/services/profileService.js
import api from "./api";

async function getMyProfile() {
  return api.get("/api/profile/me");
}

async function updateMyProfile(payload) {
  return api.put("/api/profile/me", payload);
}

export default {
  getMyProfile,
  updateMyProfile,
};
