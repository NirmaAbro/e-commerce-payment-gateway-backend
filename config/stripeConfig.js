const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Add your Stripe secret key in `.env`

module.exports = stripe;
