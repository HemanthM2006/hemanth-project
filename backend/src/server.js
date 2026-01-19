// backend/src/server.js
const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const { testDbConnection } = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await testDbConnection();
    console.log("MySQL connected successfully");

    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("MySQL connection failed");
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
