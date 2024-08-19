const express = require("express");
const router = express.Router();

const { jsonResponse } = require("../../lib/jsonResponse");
const {
    validatorBodyCreateUser,
    validatorParamsUserId,
    validatorParamsUpdateUser,
    validatorParamsDeleteUser,
} = require("../../schemas/usersSchema");
const validacionDeParametros = require("../../middlewares/validationsMiddleware");

const {
    getHuesped,
    getHuespedById,
    postCreateHuesped,
    putUpdateHuesped,
    deleteHuesped,
} = require("../controllers/huespedControllers");

// Ruta para obtener todos los huéspedes
router.get("/", async (req, res) => {
    try {
        const result = await getHuesped();
        res.json(jsonResponse(200, { message: "Huéspedes obtenidos:", data: result }));
    } catch (error) {
        console.error("Error al obtener los huéspedes:", error);
        res.json(jsonResponse(500, { error: "Error al obtener los huéspedes" }));
    }
});

// Ruta para obtener un huésped por ID
router.get("/:id", validatorParamsUserId, validacionDeParametros, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getHuespedById(id);
        res.json(jsonResponse(200, { message: "Huésped obtenido:", data: result }));
    } catch (error) {
        console.error("Error al obtener el huésped:", error);
        res.json(jsonResponse(500, { error: "Error al obtener el huésped" }));
    }
});

// Ruta para crear un nuevo huésped
router.post("/", validatorBodyCreateUser, validacionDeParametros, async (req, res) => {
    const huesped = req.body;
    try {
        const result = await postCreateHuesped(huesped);
        res.json(jsonResponse(201, { message: "Huésped creado:", data: result }));
    } catch (error) {
        console.error("Error al crear el huésped:", error);
        res.json(jsonResponse(500, { error: "Error al crear el huésped" }));
    }
});

// Ruta para actualizar un huésped por ID
router.put("/:id", validatorParamsUpdateUser, validacionDeParametros, async (req, res) => {
    const { id } = req.params;
    const huesped = req.body;
    try {
        const result = await putUpdateHuesped(id, huesped);
        res.json(jsonResponse(200, { message: "Huésped actualizado:", data: result }));
    } catch (error) {
        console.error("Error al actualizar el huésped:", error);
        res.json(jsonResponse(500, { error: "Error al actualizar el huésped" }));
    }
});

// Ruta para eliminar un huésped por ID
router.delete("/:id", validatorParamsDeleteUser, validacionDeParametros, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteHuesped(id);
        res.json(jsonResponse(200, { message: "Huésped eliminado:", data: result }));
    } catch (error) {
        console.error("Error al eliminar el huésped:", error);
        res.json(jsonResponse(500, { error: "Error al eliminar el huésped" }));
    }
});

module.exports = router;
