// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const AuthRouter = require('./Routes/AuthRouter');
// const ProductRouter = require('./Routes/ProductRouter');

// require('dotenv').config();
// require('./Models/db');
// const PORT = process.env.PORT || 8080;

// app.get('/ping', (req, res) => {
//     res.send('PONG');
// });

// app.use(bodyParser.json());
// app.use(cors());
// app.use('/auth', AuthRouter);
// app.use('/products', ProductRouter);


// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`)
// })


// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const AuthRouter = require("./routes/AuthRouter");
// const { connectMongoDB } = require("./config/connection");
// require("dotenv").config();
// const {dietPlaneRoutes} = require("./routes/dietPlanRoutes")
// console.log("JWT_SECRET:", process.env.JWT_SECRET); // Add this line to check if the secret is being read


// const app = express();

// require("dotenv").config();
// // MongoDB connection
// // connectMongoDB("mongodb://127.0.0.1:27017/Recipies");
// connectMongoDB("mongodb://127.0.0.1:27017/FYP");
// const PORT = process.env.PORT || 8080;

// app.get("/ping", (req, res) => {
//   res.send("PONG");
// });

// // app.use(bodyParser.json());
// app.use(express.json());
// app.use(cors());
// app.use("/auth", AuthRouter);
// app.use('/api/diet-plans', dietPlanRoutes); // Add the diet plan routes

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });


// const express = require("express");
// const cors = require("cors");
// const AuthRouter = require("./routes/AuthRouter");
// const dietPlanRoutes = require("./routes/dietPlanRoutes");
// const { connectMongoDB } = require("./config/connection");
// require("dotenv").config();
// const userProfileRoutes = require("./routes/UserProfileRoute");
// // import userProfileRoutes from "./routes/userProfileRoutes.js";

// console.log("JWT_SECRET:", process.env.JWT_SECRET);

// const app = express();

// // MongoDB connection
// connectMongoDB("mongodb://127.0.0.1:27017/FYP");

// const PORT = process.env.PORT || 8080;

// app.get("/ping", (req, res) => {
//   res.send("PONG");
// });

// app.use(express.json()); //Ensures that your Express app can parse incoming JSON data.
// // cors(): Allows your app to accept requests from different origins, enabling cross-domain API calls.
// app.use(cors());

// app.use((req, res, next) => {
//   console.log(`Received request: ${req.method} ${req.url}`);
//   next();
// });


// // Use the Auth and diet plan routes
// app.use("/auth", AuthRouter);
// app.use("/api", dietPlanRoutes); // Correct route usage
// app.use("/api/userprofile", userProfileRoutes);  // Attach userProfileRoutes to /api/user-profile

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });



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
