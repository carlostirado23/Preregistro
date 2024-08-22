const { body, param } = require("express-validator");
const _ = require("lodash");

// Validación de parámetro para el ID de usuario
const validatorParamsUserId = [
  param("id")
    .exists()
    .withMessage("El ID es obligatorio")
    .isNumeric()
    .withMessage("El ID debe ser numérico"),
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
    body("transport_origin")
        .exists()
        .withMessage("La dirección es obligatoria")
        .isString()
        .withMessage("La dirección debe ser una cadena de texto"),
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
];

// Validación de parámetro para actualizar un usuario
const validatorParamsUpdateUser = [
  param("id")
    .notEmpty()
    .withMessage("El ID no puede estar vacío")
    .isNumeric()
    .withMessage("El ID tiene que ser numérico"),
];

// Validación de parámetro para eliminar un usuario
const validatorParamsDeleteUser = [
  param("id")
    .exists()
    .withMessage("El ID es obligatorio")
    .isNumeric()
    .withMessage("El ID debe ser numérico"),
];

module.exports = _.pick(
  {
    validatorBodyCreateUser,
    validatorParamsUserId,
    validatorParamsDeleteUser,
    validatorParamsUpdateUser,
  },
  [
    "validatorBodyCreateUser",
    "validatorParamsUserId",
    "validatorParamsDeleteUser",
    "validatorParamsUpdateUser",
  ]
);
