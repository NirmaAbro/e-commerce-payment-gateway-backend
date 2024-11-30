const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stripePriceId: {
    type: String, // Stripe Price ID for the product
    required: true,
  },
  stripeProductId: {
    type: String, // Stripe Product ID (if needed for reference)
  },
  stock: {
    type: Number,
    required: true,
    default: 0, // Default stock is 0
  },
});


module.exports = mongoose.model('Product', ProductSchema);
