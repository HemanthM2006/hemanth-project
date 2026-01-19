// frontend/src/services/api.js

import authService from "./authService";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const token = authService.getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, config);
  } catch (error) {
    throw new Error(
      "Network error. Please check your internet or backend server."
    );
  }

  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const message =
      (data && data.message) || "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
}

function get(path) {
  return request(path, { method: "GET" });
}

function post(path, body) {
  return request(path, { method: "POST", body });
}

function put(path, body) {
  return request(path, { method: "PUT", body });
}

function del(path) {
  return request(path, { method: "DELETE" });
}

export default {
  get,
  post,
  put,
  del,
};
