// const express = require("express");
// const { createCheckoutSession } = require("../Controllers/PaymentController");
// const router = express.Router();

// router.post("/create-checkout-session", createCheckoutSession);

// module.exports = router;


const express = require("express");
const { createCheckoutSession } = require("../Controllers/PaymentController");
const router = express.Router();

// Define your payment routes
router.post("/create-checkout-session", createCheckoutSession);

// Export the router
module.exports = router; // This ensures that you are exporting the router directly
