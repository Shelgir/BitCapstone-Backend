import Joi from "joi";

// schemay validation bo away xaritayak danein bo away chawarey ch jora datayak bkain
const prodValid = Joi.object({
  name: Joi.string().min(0).max(25).required(),
  price: Joi.number().default(0),
  description: Joi.string(),
  category: Joi.string(),
  image: Joi.string(),
  quantity: Joi.number().default(0),
});

export default prodValid;
