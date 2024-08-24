const express = require("express");
const router = express.Router();

const { jsonResponse } = require("../../lib/jsonResponse");
const {
    validatorBodyCreateUser,
    validatorParamsUserId,
    validatorParamsIdentificationNumber,
    validatorParamsUpdateUser,
    validatorParamsDeleteUser,
} = require("../../schemas/usersSchema");
const validacionDeParametros = require("../../middlewares/validationsMiddleware");
const validateApiKey = require("../../middlewares/validateApiKey"); // Importa el middleware

const {
    getHuesped,
    getHuespedById,
    getHuespedByUuid,
    postCreateHuesped,
    putUpdateHuesped,
    deleteHuesped,
} = require("../controllers/huespedControllers");

const handleResponse = async (res, action) => {
    try {
        const result = await action();
        res.json(jsonResponse(200, { message: "Operación exitosa:", data: result }));
    } catch (error) {
        console.error("Error en la operación:", error);
        res.json(jsonResponse(500, { error: "Error en la operación" }));
    }
};


// Ruta para obtener todos los huéspedes
router.get("/key", validateApiKey, (req, res) => handleResponse(res, getHuesped));

// Ruta para obtener un huésped por UUID
router.get("/key/:id", validateApiKey, validatorParamsIdentificationNumber, (req, res) => {
    const { id } = req.params;
    handleResponse(res, () => getHuespedById(id));
});


router.get("/key/uuid/:uuid", validateApiKey, validatorParamsUserId, validacionDeParametros, (req, res) => {
    const { uuid } = req.params;
    handleResponse(res, () => getHuespedByUuid(uuid));
});

// Ruta para crear un nuevo huésped
router.post("/key/", validateApiKey, validatorBodyCreateUser, validacionDeParametros, (req, res) => {
    const huesped = req.body;
    handleResponse(res, () => postCreateHuesped(huesped));
});

// Ruta para actualizar un huésped por ID
router.put("/key/:uuid", validateApiKey, validatorParamsUpdateUser, validacionDeParametros, (req, res) => {
    const { uuid } = req.params;
    const huesped = req.body;
    handleResponse(res, () => putUpdateHuesped(uuid, huesped));
});

// Ruta para eliminar un huésped por ID
router.delete("/key/:uuid", validateApiKey, validatorParamsDeleteUser, validacionDeParametros, (req, res) => {
    const { uuid } = req.params;
    handleResponse(res, () => deleteHuesped(uuid));
});

module.exports = router;
