import Joi from "joi";

const logInEmployeeValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default logInEmployeeValidation;
