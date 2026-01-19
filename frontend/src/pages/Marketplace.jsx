// frontend/src/pages/Marketplace.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../styles/cards.css";
import "../styles/dashboard.css";
import "../styles/forms.css";
import DashboardCard from "../components/DashboardCard";
import marketplaceService from "../services/marketplaceService";

function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fallbackProducts = useMemo(() => {
    return [
      {
        id: "p1",
        name: "Organic Compost",
        category: "Fertilizer",
        price: "₹499",
        emoji: "🌿",
        desc: "Boost soil health and improve crop yield naturally.",
      },
      {
        id: "p2",
        name: "NPK Fertilizer",
        category: "Fertilizer",
        price: "₹799",
        emoji: "🧪",
        desc: "Balanced nutrients for strong plant growth.",
      },
      {
        id: "p3",
        name: "Drip Irrigation Kit",
        category: "Irrigation",
        price: "₹2499",
        emoji: "💧",
        desc: "Save water and deliver moisture directly to roots.",
      },
      {
        id: "p4",
        name: "Hybrid Seeds Pack",
        category: "Seeds",
        price: "₹299",
        emoji: "🌱",
        desc: "High-quality seeds for better germination rate.",
      },
      {
        id: "p5",
        name: "Pesticide Spray Pump",
        category: "Tools",
        price: "₹1199",
        emoji: "🧴",
        desc: "Easy spraying for pest control and leaf nutrition.",
      },
      {
        id: "p6",
        name: "Soil Testing Kit",
        category: "Tools",
        price: "₹899",
        emoji: "🧑‍🔬",
        desc: "Test pH and nutrients for smarter decisions.",
      },
    ];
  }, []);

  const [products, setProducts] = useState(fallbackProducts);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setMessage("");

      try {
        const data = await marketplaceService.getProducts();

        if (data && data.mock) {
          setProducts(fallbackProducts);
          setMessage("Marketplace loaded in mock mode.");
        } else if (data && Array.isArray(data.products)) {
          setProducts(data.products);
          setMessage("Marketplace updated successfully.");
        } else if (Array.isArray(data)) {
          setProducts(data);
          setMessage("Marketplace updated successfully.");
        } else {
          setProducts(fallbackProducts);
          setMessage("Backend response invalid. Showing default products.");
        }
      } catch (error) {
        setProducts(fallbackProducts);
        setMessage("Backend not connected. Showing default products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [fallbackProducts]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();

    return products.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const desc = (p.desc || "").toLowerCase();
      const cat = p.category || "Other";

      const matchesSearch =
        s.length === 0 || name.includes(s) || desc.includes(s);

      const matchesCategory = category === "All" || cat === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category, products]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleCategory(e) {
    setCategory(e.target.value);
  }

  function handleAddToCart(product) {
    setMessage(`Added "${product.name}" to cart (demo).`);
  }

  return (
    <div className="cardsPage">
      <div className="cardsHeader">
        <h1 className="cardsTitle">Marketplace 🛒</h1>
        <p className="cardsSubtitle">
          Buy farming essentials like seeds, fertilizers, irrigation tools, and
          more.
        </p>
      </div>

      <div className="cardsFilters">
        <div className="filterBox">
          <label className="filterLabel" htmlFor="search">
            Search Products
          </label>
          <input
            id="search"
            className="carbonInput"
            type="text"
            placeholder="Ex: compost, drip, seeds..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="filterBox">
          <label className="filterLabel" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="filterSelect"
            value={category}
            onChange={handleCategory}
          >
            <option value="All">All</option>
            <option value="Seeds">Seeds</option>
            <option value="Fertilizer">Fertilizer</option>
            <option value="Irrigation">Irrigation</option>
            <option value="Tools">Tools</option>
          </select>
        </div>

        <div className="filterBox">
          <div className="filterLabel">Quick Tip</div>
          <div className="healthSummary">
            Prefer organic inputs when possible for long-term soil fertility.
          </div>
        </div>
      </div>

      {loading ? (
        <div className="alertBox alertBox--warning">
          <div className="alertBox__title">Loading</div>
          <div className="alertBox__message">Fetching marketplace items...</div>
        </div>
      ) : null}

      {message ? (
        <div className="alertBox alertBox--success">
          <div className="alertBox__title">Marketplace</div>
          <div className="alertBox__message">{message}</div>
        </div>
      ) : null}

      <div className="cardsGrid">
        {filtered.length === 0 ? (
          <div className="emptyState">
            <div className="emptyState__emoji">🛒</div>
            <div className="emptyState__title">No products found</div>
            <div className="emptyState__text">
              Try changing the search or category.
            </div>
          </div>
        ) : (
          filtered.map((p) => (
            <div key={p.id || p.name} className="cropCard">
              <div className="cropCard__top">
                <div className="cropCard__emoji">{p.emoji || "🌱"}</div>
                <div className="cropCard__name">{p.name}</div>
              </div>

              <div className="cropCard__tip">
                <div className="cropCard__tipTitle">{p.category}</div>
                <div className="cropCard__tipText">{p.desc}</div>
              </div>

              <div className="marketRow">
                <DashboardCard
                  title="Price"
                  desc="Current offer"
                  icon="💰"
                  rightText={p.price}
                />
              </div>

              <button
                className="formButton"
                type="button"
                onClick={() => handleAddToCart(p)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Marketplace;
