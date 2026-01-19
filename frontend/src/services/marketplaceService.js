// frontend/src/services/marketplaceService.js
import api from "./api";

async function getProducts() {
  return api.get("/api/marketplace/products");
}

async function getProductById(id) {
  return api.get(`/api/marketplace/products/${id}`);
}

export default {
  getProducts,
  getProductById,
};
