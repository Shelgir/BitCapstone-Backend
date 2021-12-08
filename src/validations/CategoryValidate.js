import Joi from "joi";

// schemay validation bo away xaritayak danein bo away chawarey ch jora datayak bkain
const catValid = Joi.object({
  name: Joi.string().min(0).max(25).required(),
  description: Joi.string(),
});

export default catValid;
