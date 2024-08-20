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
    const query = "SELECT * FROM huespedes";
    console.log("Ejecutando consulta:", query);
    return await executeQuery(query);
};

const getHuespedById = async (id = "") => {
    const query = "SELECT * FROM huespedes WHERE numero_identificacion = $1";
    return (await executeQuery(query, [id]))[0]; // Simplificar la llamada
};

const handleHuespedQuery = async (query, params) => {
    const rows = await executeQuery(query, params);
    return rows[0];
};

const postCreateHuesped = async (huesped = {}) => {
    const fields = [
        "numero_identificacion",
        "nombre",
        "apellido",
        "correo",
        "telefono",
        "nacionalidad",
        "direccion",
        "fecha_nacimiento",
    ];
    const pickedHuesped = pick(huesped, fields);
    const query = `
        INSERT INTO huespedes (numero_identificacion, nombre, apellido, correo, telefono, nacionalidad, direccion, fecha_nacimiento)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
    `;
    return await handleHuespedQuery(query, Object.values(pickedHuesped)); // Usar función común
};

const putUpdateHuesped = async (id = "", huesped = {}) => {
    const fields = [
        "numero_identificacion",
        "nombre",
        "apellido",
        "correo",
        "telefono",
        "nacionalidad",
        "direccion",
        "fecha_nacimiento",
    ];
    const pickedHuesped = pick(huesped, fields);
    const query = `
        UPDATE huespedes
        SET ${fields.map((field, index) => `${field} = $${index + 1}`).join(", ")}
        WHERE id_huesped = $${fields.length + 1} RETURNING *;
    `;
    return await handleHuespedQuery(query, [...Object.values(pickedHuesped), id]); // Usar función común
};

const deleteHuesped = async (id = "") => {
    const query = "DELETE FROM huespedes WHERE id_huesped = $1 RETURNING *;";
    return await handleHuespedQuery(query, [id]); // Usar función común
};

module.exports = {
    getHuesped,
    getHuespedById,
    postCreateHuesped,
    putUpdateHuesped,
    deleteHuesped,
};
