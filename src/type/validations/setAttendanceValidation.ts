import Joi from "joi";

const setAttendanceValidation = Joi.object({
  clockIn:Joi.string(),
  clockOut:Joi.string()
});

export default setAttendanceValidation;
