import Joi from "joi";

const createEmployeeValidation = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  middle_name: Joi.string().allow("").optional(),
  last_name: Joi.string().required(),
  phone: Joi.string().allow("").optional(),
  gender: Joi.string().required(),
  dob: Joi.date().required(),
  address: Joi.string().required(),
  salary: Joi.number().default(0),
  pan_number: Joi.string().allow("").optional().default(""),
  date_joined: Joi.date().default(new Date()),
  role: Joi.string().required(), // Assuming the role IDs are strings
  isDeleted: Joi.boolean().default(false),
});

export default createEmployeeValidation;
