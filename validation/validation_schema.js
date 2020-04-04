const Joi = require("@hapi/joi");

const registrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
    .max(15)
    .min(8)
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
    .max(15)
    .min(8)
});
module.exports = { registrationSchema, loginSchema };
