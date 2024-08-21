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
    body("numero_identificacion")
        .exists()
        .withMessage("El número de identificación es obligatorio")
        .isNumeric()
        .withMessage("El número de identificación debe ser numérico"),
    body("tipo_documento")
        .exists()
        .withMessage("El tipo de documento es obligatorio")
        .isNumeric()
        .withMessage("El tipo de documento debe ser numérico"),
    body("nombre")
        .exists()
        .withMessage("El nombre es obligatorio")
        .isString()
        .withMessage("El nombre debe ser una cadena de texto"),
    body("apellido")
        .exists()
        .withMessage("El apellido es obligatorio")
        .isString()
        .withMessage("El apellido debe ser una cadena de texto"),
    body("correo")
        .exists()
        .withMessage("El correo es obligatorio")
        .isEmail()
        .withMessage("El correo debe ser un correo válido"),
    body("telefono")
        .exists()
        .withMessage("El teléfono es obligatorio")
        .isNumeric()
        .withMessage("El teléfono debe ser numérico"),
    body("nacionalidad")
        .exists()
        .withMessage("La nacionalidad es obligatoria")
        .isString()
        .withMessage("La nacionalidad debe ser una cadena de texto"),
    body("direccion")
        .exists()
        .withMessage("La dirección es obligatoria")
        .isString()
        .withMessage("La dirección debe ser una cadena de texto"),
    body("fecha_nacimiento")
        .exists()
        .withMessage("La fecha de nacimiento es obligatoria")
        .isDate()
        .withMessage("La fecha debe ser válida"),
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
