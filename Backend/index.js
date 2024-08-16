const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

// Rutas
app.get("/", (req, res) => {
    res.send("¡Hola, mundo!");
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
