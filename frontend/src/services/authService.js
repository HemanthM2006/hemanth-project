// frontend/src/services/authService.js
import api from "./api";

const AUTH_EVENT = "sap_auth_change";

function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

function setToken(token) {
  localStorage.setItem("sap_token", token);
  notifyAuthChange();
}

function getToken() {
  return localStorage.getItem("sap_token");
}

function clearToken() {
  localStorage.removeItem("sap_token");
  notifyAuthChange();
}

function isLoggedIn() {
  const token = getToken();
  return Boolean(token);
}

function subscribe(callback) {
  function handler() {
    callback(isLoggedIn());
  }

  window.addEventListener(AUTH_EVENT, handler);
  return () => window.removeEventListener(AUTH_EVENT, handler);
}

async function login(payload) {
  const data = await api.post("/api/auth/login", payload);

  if (!data || !data.token) {
    throw new Error("Token not received from server");
  }

  setToken(data.token);
  return data;
}

async function register(payload) {
  const data = await api.post("/api/auth/register", payload);

  if (!data || !data.token) {
    throw new Error("Token not received from server");
  }

  setToken(data.token);
  return data;
}

export default {
  setToken,
  getToken,
  clearToken,
  isLoggedIn,
  subscribe,
  login,
  register,
};
