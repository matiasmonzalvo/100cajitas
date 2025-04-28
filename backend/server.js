require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Initialize Mercado Pago client
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// Routes
app.post("/api/create-preference", async (req, res) => {
  try {
    const { items, backUrls } = req.body;

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      },
    });

    res.json({ preferenceId: result.id });
  } catch (error) {
    console.error("Error creating preference:", error);
    res.status(500).json({ error: "Error creating payment preference" });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
