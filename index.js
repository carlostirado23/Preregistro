const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config();

const huesped = require("./src/routers/huespedRouter");
const validateApiKey = require("./middlewares/validateApiKey");

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());


app.use("/api/huesped", validateApiKey, huesped);

app.use((req, res, next) => {
    res.status(404).json({ error: "Ruta no encontrada o falta la validación con la API key." });
});


// Rutas
app.get("/", (req, res) => {
    res.send("¡Hola, mundo!");
});

// Iniciar el servidor
// app.listen(PORT, () => {
//     console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });

// Exporta la app para que Vercel la utilice
module.exports = app;
