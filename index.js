const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config();

const huesped = require("./src/routers/huespedRouter");

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use("/api/huesped", huesped);

// Rutas
app.get("/", (req, res) => {
    res.send("¡Hola, mundo!");
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
