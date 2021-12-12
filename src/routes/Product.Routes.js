import { Router } from "express";
import Product from "../models/ProductModel.js";
import prodValid from "../validations/ProductValidate.js";
import { isAdmin, isAuth } from "../middlewares/auth.middleware.js";
import winston from "winston";
const ProductRouter = Router();

ProductRouter.get("/products", (req, res) => {
  Product.find().then((data) => res.send(data));
  winston.info("da bika");
});

ProductRouter.post("/products", isAuth, isAdmin, async (req, res) => {
  // try validate akain agar validate bu anja ache addi user bka, agin err message return akaw function awaste
  try {
    await prodValid.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const { body } = req;
  console.log(body);
  const prod = new Product(body);
  prod.save().then((e) => res.send(e));
});

ProductRouter.get("/products/:id", async (req, res) => {
  const prod = await Product.findById(req.params.id);
  res.json(prod);
});

ProductRouter.put("/products/:id", isAuth, isAdmin, async (req, res) => {
  const prod = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json(prod);
});

ProductRouter.delete("/products/:id", isAuth, isAdmin, (req, res) => {
  Product.findOneAndDelete(req.body).then((data) => res.send(data));
});

export default ProductRouter;
