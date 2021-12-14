import Joi from "joi";

// schemay validation bo away xaritayak danein bo away chawarey ch jora datayak bkain
const ordersValid = Joi.object({
  email: Joi.string(),
  total: Joi.number(),
  products: Joi.array(),
});

export default ordersValid;
