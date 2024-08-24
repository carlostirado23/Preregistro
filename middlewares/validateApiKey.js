const pool = require("../config/database");

async function validateApiKey(req, res, next) {
    try {
        const { rows } = await pool.query("SELECT api_key FROM api_keys WHERE id = $1", [1]); // Suponiendo que tienes una fila con id = 1
        const apiKey = rows[0]?.api_key;

        if (!apiKey) {
            return res.status(500).json({ error: "API key not found" });
        }

        // Aquí podrías hacer cualquier lógica adicional para verificar el uso correcto de la API key

        next();
    } catch (error) {
        console.error("Error validating API key:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = validateApiKey;
