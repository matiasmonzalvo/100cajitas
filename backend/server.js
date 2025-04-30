require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const Admin = require("./models/Admin");
const Item = require("./models/Item");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

// Initialize Mercado Pago client
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// Ruta de login simple (sin JWT)
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar admin en la base de datos
    const admin = await Admin.findOne({ username });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Login exitoso (en una versión real, aquí iría el JWT)
    res.json({ message: "Login exitoso", user: { username: admin.username } });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta para crear un admin (solo para desarrollo)
app.post("/api/create-admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const newAdmin = new Admin({
      username,
      password, // En producción, esto debería estar hasheado
    });

    await newAdmin.save();

    res.json({ message: "Admin creado", admin: newAdmin });
  } catch (error) {
    console.error("Error creando admin:", error);
    res.status(500).json({ error: "Error creando admin" });
  }
});

// Ruta para obtener todos los productos
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error("Error obteniendo items:", error);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
});

// Ruta para crear un producto (protegida en una versión real)
app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creando item:", error);
    res.status(500).json({ error: "Error creando producto" });
  }
});

// Ruta existente para Mercado Pago
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
