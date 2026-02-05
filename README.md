# 🌱 Smart Agricultural Platform (SAP)

Smart Agricultural Platform is a **full-stack web application** designed to help farmers make **data-driven farming decisions** using soil analysis, crop recommendations, crop health monitoring, sustainability insights, and a farming marketplace.

🚜 This is **my biggest project so far**, where I integrated **frontend + backend + database + authentication** into a complete working system.

---

## 🚀 Project Overview

The platform provides farmers with:

- Soil data submission & history tracking
- Crop recommendations based on soil & season
- Crop health monitoring
- Carbon & sustainability insights
- Crop simulation & planning
- Farming marketplace
- Secure authentication & protected routes

The project is built using **React (Frontend)**, **Node.js + Express (Backend)**, and **MySQL (Database)**.

---

## 🧠 Key Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication
- Protected routes (frontend & backend)
- Auto sync login/logout across the app

### 🌱 Soil Management
- Submit soil test data (pH, NPK, moisture, location)
- Store reports in MySQL
- Fetch soil history per user

### 🌾 Crop Recommendation
- Crop suggestions based on soil type & season
- API-driven architecture (mock + backend ready)

### 🧪 Crop Health
- Crop condition overview
- Pest, disease & water stress indicators

### 🌍 Carbon Insights
- Sustainability input tracking
- Eco-friendly recommendations
- Carbon score (demo logic)

### 🧮 Crop Simulation
- Simulate crop planning using land, water, season & budget
- Future-ready backend support

### 🛒 Marketplace
- Browse farming products
- Filter by category & search
- Backend API ready for expansion

### 👨‍🌾 Profile
- Farmer profile management
- Farm details & summary view

---

## 🧩 Tech Stack

### Frontend
- React
- React Router DOM
- Plain CSS (no UI libraries)
- Fetch API
- JWT storage via LocalStorage

### Backend
- Node.js
- Express.js
- MySQL (mysql2)
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- dotenv
- CORS

### Database
- MySQL (managed via MySQL Workbench)

---

## 📁 Project Structure

```text
smart-agricultural-platform/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Setup

### Backend `.env`

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=smart_agriculture_platform
DB_PORT=3306

JWT_SECRET=your_secret_key
```

---

## ▶️ Running the Project

### 1️⃣ Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

---

## 🔐 API Endpoints (Major)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### User
- `GET /api/users/me` (Protected)

### Soil
- `POST /api/soil` (Protected)
- `GET /api/soil` (Protected)

### Test
- `GET /api/test/protected` (JWT test)

---

## 🧪 Testing

- Backend tested using browser & Postman
- JWT protected routes verified
- MySQL integration tested via MySQL Workbench
- Frontend flows tested end-to-end

---

## 📈 Project Status

✅ Frontend complete  
✅ Backend complete  
✅ Database connected  
✅ Authentication working  
🚧 Advanced ML logic can be added later  

This project is **production-ready in structure** and **scalable for future features**.

---

## 🎯 Why This Project Matters

- Demonstrates **full-stack development**
- Shows real-world **API + DB integration**
- Clean architecture & modular code
- Built without heavy libraries — strong fundamentals
- Designed with **farmers & sustainability in mind**

---

## 🙌 Author

**Hemanth M**  
First-year Engineering student  
Passionate about full-stack development & real-world problem solving  

> 🌟 This is my biggest and most complete project so far.

---

## 📜 License

This project is for educational and learning purposes.
