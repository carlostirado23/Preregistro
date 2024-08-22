const { pick } = require("lodash");
const Pool = require("../../config/database");

const executeQuery = async (query, params = []) => {
    try {
        const { rows } = await Pool.query(query, params);
        return rows;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        throw error;
    }
};

const getHuesped = async () => {
    const query = "SELECT * FROM pre_register";
    console.log("Ejecutando consulta:", query);
    return await executeQuery(query);
};

const getHuespedById = async (id = "") => {
    const query = "SELECT * FROM pre_register WHERE identification_number = $1";
    try {
        const result = await executeQuery(query, [id]);
        if (result.length === 0) {
            throw new Error(`No se encontró un huésped con el número de identificación: ${id}`);
        }
        return result[0]; // Retorna el primer resultado
    } catch (error) {
        console.error("Error al obtener el huésped:", error.message);
        throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
};

const handleHuespedQuery = async (query, params) => {
    const rows = await executeQuery(query, params);
    return rows[0];
};

const postCreateHuesped = async (huesped = {}) => {
    const fields = [
        "identification_number",
        "document_type",
        "name",
        "last_name",
        "email",
        "phone",
        "origin",
        "transport_origin",
        "date_of_birth",
        "reason_trip",
    ];
    const pickedHuesped = pick(huesped, fields);
    const query = `
        INSERT INTO pre_register (identification_number, document_type, name, last_name, email, phone, origin, transport_origin, date_of_birth, reason_trip)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;
    `;
    return await handleHuespedQuery(query, Object.values(pickedHuesped)); // Usar función común
};


const putUpdateHuesped = async (id = "", huesped = {}) => {
    const fields = [
        "identification_number",
        "document_type",
        "name",
        "last_name",
        "email",
        "phone",
        "origin",
        "transport_origin",
        "date_of_birth",
        "reason_trip",
        "status", 
    ];

    // Incluye el status como true en el objeto huesped antes de actualizar
    huesped.status = true;

    const pickedHuesped = pick(huesped, fields);
    const query = `
        UPDATE pre_register
        SET ${fields.map((field, index) => `${field} = $${index + 1}`).join(", ")}
        WHERE id_huesped = $${fields.length + 1} RETURNING *;
    `;
    return await handleHuespedQuery(query, [...Object.values(pickedHuesped), id]); // Usar función común
};

const deleteHuesped = async (id = "") => {
    const query = "DELETE FROM pre_register WHERE id_huesped = $1 RETURNING *;";
    return await handleHuespedQuery(query, [id]); // Usar función común
};

module.exports = {
    getHuesped,
    getHuespedById,
    postCreateHuesped,
    putUpdateHuesped,
    deleteHuesped,
};
