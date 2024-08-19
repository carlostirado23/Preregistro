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
    const query = "SELECT * FROM huespedes WHERE id_huesped = $1";
    const params = [id];
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
    const params = [
        pickedHuesped.numero_identificacion,
        pickedHuesped.nombre,
        pickedHuesped.apellido,
        pickedHuesped.correo,
        pickedHuesped.telefono,
        pickedHuesped.nacionalidad,
        pickedHuesped.direccion,
        pickedHuesped.fecha_nacimiento,
    ];
    const rows = await executeQuery(query, params);
    return rows[0];
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
        SET numero_identificacion = $1, nombre = $2, apellido = $3, correo = $4, telefono = $5, nacionalidad = $6, direccion = $7, fecha_nacimiento = $8
        WHERE id_huesped = $9 RETURNING *;
    `;
    const params = [
        pickedHuesped.numero_identificacion,
        pickedHuesped.nombre,
        pickedHuesped.apellido,
        pickedHuesped.correo,
        pickedHuesped.telefono,
        pickedHuesped.nacionalidad,
        pickedHuesped.direccion,
        pickedHuesped.fecha_nacimiento,
        id,
    ];
    const rows = await executeQuery(query, params);
    return rows[0];
};

const deleteHuesped = async (id = "") => {
    const query = "DELETE FROM huespedes WHERE id_huesped = $1 RETURNING *;";
    const params = [id];
    const rows = await executeQuery(query, params);
    return rows[0];
};

module.exports = {
    getHuesped,
    getHuespedById,
    postCreateHuesped,
    putUpdateHuesped,
    deleteHuesped,
};