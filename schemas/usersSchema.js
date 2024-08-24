const { body, param } = require("express-validator");
const _ = require("lodash");

// Validación de parámetro para el ID de usuario
const validatorParamsUserId = [
    param("uuid")
        .exists()
        .withMessage("El UUID es obligatorio")
        .isUUID(4)
        .withMessage("El UUID debe ser un UUID válido"),
];

// Validación de parámetro para `identification_number`
const validatorParamsIdentificationNumber = [
    param("identification_number")
        .exists()
        .withMessage("El número de identificación es obligatorio")
        .isNumeric()
        .withMessage("El número de identificación debe ser numérico"),
];

// Validación de cuerpo para crear un usuario
const validatorBodyCreateUser = [
    body("identification_number")
        .exists()
        .withMessage("El número de identificación es obligatorio")
        .isNumeric()
        .withMessage("El número de identificación debe ser numérico"),
    body("document_type")
        .exists()
        .withMessage("El tipo de documento es obligatorio")
        .isString()
        .withMessage("El tipo de documento debe ser string"),
    body("name")
        .exists()
        .withMessage("El nombre es obligatorio")
        .isString()
        .withMessage("El nombre debe ser una cadena de texto"),
    body("last_name")
        .exists()
        .withMessage("El apellido es obligatorio")
        .isString()
        .withMessage("El apellido debe ser una cadena de texto"),
    body("email")
        .exists()
        .withMessage("El correo es obligatorio")
        .isEmail()
        .withMessage("El correo debe ser un correo válido"),
    body("phone")
        .exists()
        .withMessage("El teléfono es obligatorio")
        .isNumeric()
        .withMessage("El teléfono debe ser numérico"),
    body("origin")
        .exists()
        .withMessage("El origen es obligatoria")
        .isString()
        .withMessage("El origen debe ser una cadena de texto"),
    body("state")
        .exists()
        .withMessage("El estado es obligatoria")
        .isString()
        .withMessage("El estado debe ser una cadena de texto"),
    body("city")
        .exists()
        .withMessage("La ciudad es obligatoria")
        .isString()
        .withMessage("La ciudad debe ser una cadena de texto"),
    body("address")
        .exists()
        .withMessage("La direccion es obligatoria")
        .isString()
        .withMessage("La direccion debe ser una cadena de texto"),
    body("transport_origin")
        .exists()
        .withMessage("El transporte de origen es obligatoria")
        .isString()
        .withMessage("El transporte de origen debe ser una cadena de texto"),
    body("reason_trip")
        .exists()
        .withMessage("El motivo de viaje es obligatoria")
        .isString()
        .withMessage("El motivo de viaje debe ser una cadena de texto"),
    body("date_of_birth")
        .exists()
        .withMessage("La fecha de nacimiento es obligatoria")
        .isDate()
        .withMessage("La fecha debe ser válida"),
    body("reason_trip")
        .exists()
        .withMessage("El motivo del viaje es obligatoria")
        .isString()
        .withMessage("El motivo del viaje debe ser una cadena de texto"),
    body("is_first_time")
        .exists()
        .withMessage("Es la primera vez del viaje es obligatoria")
        .isBoolean()
        .withMessage("Es la primera vez del viaje debe ser un boolean"),
];

// Validación de parámetro para actualizar un usuario
const validatorParamsUpdateUser = [
    param("uuid")
        .notEmpty().withMessage("El UUID no puede estar vacío")
        .isUUID(4).withMessage("El UUID debe ser un UUID válido"),
];

// Validación de parámetro para eliminar un usuario
const validatorParamsDeleteUser = [
    param("uuid")
        .exists().withMessage("El UUID es obligatorio")
        .isUUID(4).withMessage("El UUID debe ser un UUID válido"),
];

module.exports = _.pick(
    {
        validatorBodyCreateUser,
        validatorParamsIdentificationNumber,
        validatorParamsUserId,
        validatorParamsDeleteUser,
        validatorParamsUpdateUser,
    },
    [
        "validatorBodyCreateUser",
        "validatorParamsIdentificationNumber",
        "validatorParamsUserId",
        "validatorParamsDeleteUser",
        "validatorParamsUpdateUser",
    ]
);
