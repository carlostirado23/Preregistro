// middlewares/validateApiKey.js

const Pool = require("../config/database");

const validateApiKey = async (req, res, next) => {
    const apiKey = req.headers["key"];

    if (!apiKey) {
        return res.status(401).json({ error: "API key is missing" });
    }

    try {
        const query = `SELECT * FROM api_keys WHERE api_key = $1`;
        const result = await Pool.query(query, [apiKey]);

        if (result.rows.length === 0) {
            return res.status(403).json({ error: "Invalid API key" });
        }

        next(); // La clave es válida, continúa con la siguiente función en la cadena
    } catch (error) {
        console.error("Error al validar la clave de API:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = validateApiKey;
