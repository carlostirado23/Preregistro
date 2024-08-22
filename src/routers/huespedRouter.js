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
const validateApiKey = require("../../middlewares/validateApiKey"); // Importa el middleware

const {
    getHuesped,
    getHuespedById,
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

// Aplica el middleware de validación de API key a todas las rutas
router.use(validateApiKey);

// Ruta para obtener todos los huéspedes
router.get("/", (req, res) => handleResponse(res, getHuesped));

// Ruta para obtener un huésped por ID
router.get("/:id", validatorParamsUserId, validacionDeParametros, (req, res) => {
    const { id } = req.params;
    handleResponse(res, () => getHuespedById(id));
});

// Ruta para crear un nuevo huésped
router.post("/", validatorBodyCreateUser, validacionDeParametros, (req, res) => {
    const huesped = req.body;
    handleResponse(res, () => postCreateHuesped(huesped));
});

// Ruta para actualizar un huésped por ID
router.put("/:id", validatorParamsUpdateUser, validacionDeParametros, (req, res) => {
    const { id } = req.params;
    const huesped = req.body;
    handleResponse(res, () => putUpdateHuesped(id, huesped));
});

// Ruta para eliminar un huésped por ID
router.delete("/:id", validatorParamsDeleteUser, validacionDeParametros, (req, res) => {
    const { id } = req.params;
    handleResponse(res, () => deleteHuesped(id));
});

module.exports = router;
