const Pool = require("pg-pool");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432, // Usa el puerto 5432 si DB_PORT no está definido
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pool;
