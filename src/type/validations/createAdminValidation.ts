import Joi from "joi";

const createAdminValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export default createAdminValidation;
