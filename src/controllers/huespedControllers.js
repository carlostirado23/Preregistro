const { pick } = require("lodash");
const { v4: uuidv4 } = require("uuid"); 
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

const getHuespedByUuid = async (uuid = "") => {
    const query = "SELECT * FROM pre_register WHERE uuid = $1";
    try {
        const result = await executeQuery(query, [uuid]);
        if (result.length === 0) {
            throw new Error(`No se encontró un huésped con el uuid: ${uuid}`);
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
        "uuid",
        "identification_number",
        "document_type",
        "name",
        "last_name",
        "email",
        "phone",
        "origin",
        "state",
        "city",
        "address",
        "transport_origin",
        "date_of_birth",
        "reason_trip",
        "is_first_time",
        "photo_base64",
    ];

    // Generar un UUID
    const newUuid = uuidv4();

    // Agregar el UUID al objeto huésped
    huesped.uuid = newUuid;

    // Convertir la imagen de base64 a binario (Buffer)
    if (huesped.photo_base64) {
        const base64Data = huesped.photo_base64.split(",")[1]; // Remover el prefijo
        huesped.photo = Buffer.from(base64Data, "base64");
    }

    const pickedHuesped = pick(huesped, fields);
    const query = `
        INSERT INTO pre_register (uuid, identification_number, document_type, name, last_name, email, phone, origin, state, city, address, transport_origin, date_of_birth, reason_trip, is_first_time, photo_base64)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *;
    `;
    return await handleHuespedQuery(query, Object.values(pickedHuesped)); // Usar función común
};


const putUpdateHuesped = async (uuid = "", huesped = {}) => {
    const fields = [
        "identification_number",
        "document_type",
        "name",
        "last_name",
        "email",
        "phone",
        "origin",
        "state",
        "city",
        "address",
        "transport_origin",
        "date_of_birth",
        "reason_trip",
        "is_first_time",
    ];

    const pickedHuesped = pick(huesped, fields);
    const query = `
        UPDATE pre_register
        SET ${fields.map((field, index) => `${field} = $${index + 1}`).join(", ")}
        WHERE uuid = $${fields.length + 1} RETURNING *;
    `;
    return await handleHuespedQuery(query, [...Object.values(pickedHuesped), uuid]); // Usar función común
};


const deleteHuesped = async (uuid = "") => {
    const query = "DELETE FROM pre_register WHERE uuid = $1 RETURNING *;";
    return await handleHuespedQuery(query, [uuid]); // Usar función común
};


module.exports = {
    getHuesped,
    getHuespedById,
    getHuespedByUuid,
    postCreateHuesped,
    putUpdateHuesped,
    deleteHuesped,
};
