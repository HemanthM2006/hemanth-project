// frontend/src/App.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SoilData from "./pages/SoilData";
import CropRecommendation from "./pages/CropRecommendation";
import CropHealth from "./pages/CropHealth";
import CarbonInsights from "./pages/CarbonInsights";
import SustainableGuidance from "./pages/SustainableGuidance";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import CropSimulation from "./pages/CropSimulation";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/soil"
          element={
            <ProtectedRoute>
              <SoilData />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crop-recommendation"
          element={
            <ProtectedRoute>
              <CropRecommendation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crop-health"
          element={
            <ProtectedRoute>
              <CropHealth />
            </ProtectedRoute>
          }
        />

        <Route
          path="/carbon-insights"
          element={
            <ProtectedRoute>
              <CarbonInsights />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sustainable-guidance"
          element={
            <ProtectedRoute>
              <SustainableGuidance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crop-simulation"
          element={
            <ProtectedRoute>
              <CropSimulation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
