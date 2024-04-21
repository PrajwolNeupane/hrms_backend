import Joi from "joi";

const changePasswordValidation = Joi.object({
  currentPassword: Joi.string().required().min(8),
  newPassword: Joi.string().required().min(8),
});

export default changePasswordValidation;
