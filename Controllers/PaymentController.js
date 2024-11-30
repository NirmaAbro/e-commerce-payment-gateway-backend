const Stripe = require("stripe");
const stripe = require("../config/stripeConfig");

exports.createCheckoutSession = async (req, res) => {
  const { products } = req.body;
  console.log("products", products)

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price * 100, // Convert price to cents
    },
    quantity: product.qty,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`, // Success page
      cancel_url: `${process.env.CLIENT_URL}/cancel`,  // Cancel page
    });

     // Log the created session
     console.log("Session created:", session);

     
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
