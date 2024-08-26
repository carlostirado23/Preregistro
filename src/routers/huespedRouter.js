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

        if (result === null) {
            return res
                .status(200)
                .json(
                    jsonResponse(200, {
                        message: "No se encontró ningún usuario registrado con ese número de identificación.",
                        data: null,
                    })
                );
        }

        const uuid = result.uuid;

        res.json(jsonResponse(200, { message: "Operación exitosa", data: result, uuid }));
    } catch (error) {
        console.error("Error en la operación:", error);

        const errorMessage = error.message || "Ocurrió un error desconocido.";
        const errorDetails = {
            message: errorMessage,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
            code: error.code || "INTERNAL_SERVER_ERROR",
            details: error.details || null,
        };

        res.status(500).json(jsonResponse(500, { error: errorDetails }));
    }
};




// Ruta para obtener todos los huéspedes
router.get("/key", validateApiKey, (req, res) => handleResponse(res, getHuesped));

// Ruta para obtener un huésped por UUID
router.get("/key/id/:id", validateApiKey, validatorParamsIdentificationNumber, (req, res) => {
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
router.put("/key/edit/:uuid", validateApiKey, validatorParamsUpdateUser, validacionDeParametros, (req, res) => {
    const { uuid } = req.params;
    const huesped = req.body;
    handleResponse(res, () => putUpdateHuesped(uuid, huesped));
});

// Ruta para eliminar un huésped por ID
router.delete("/key/delete/:uuid", validateApiKey, validatorParamsDeleteUser, validacionDeParametros, (req, res) => {
    const { uuid } = req.params;
    handleResponse(res, () => deleteHuesped(uuid));
});

module.exports = router;
