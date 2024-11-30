const express = require("express");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const { connectMongoDB } = require("./config/connection");
require("dotenv").config();
// const { paymentRoutes } = require("./Routes/paymentRoutes"); // Import from "./Routes/paymentRoutes";
const paymentRoutes = require("./Routes/paymentRoutes"); // Remove destructuring


// console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

// MongoDB connection
connectMongoDB("mongodb://127.0.0.1:27017/Ecommerce");

const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use(express.json()); // Ensures that your Express app can parse incoming JSON data.
app.use(cors()); // Allows cross-origin requests

// Logging middleware
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Received request: ${req.method} ${req.url}`);
  }
  next();
});

// Use the Auth, diet plan, and user profile routes
app.use("/auth", AuthRouter);
// Routes
app.use("/api", paymentRoutes);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
