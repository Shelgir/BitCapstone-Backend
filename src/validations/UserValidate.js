import Joi from "joi";

// schemay validation bo away xaritayak danein bo away chawarey ch jora datayak bkain
const userValid = Joi.object({
  firstname: Joi.string().min(3).max(25).required(),
  lastname: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(16),
  role: Joi.string().default("user"),
  age: Joi.number().required(),
});

export default userValid;
