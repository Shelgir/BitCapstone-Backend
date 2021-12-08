import { Router } from "express";
import Category from "../models/CategoryModel.js";
import catValid from "../validations/CategoryValidate.js";
const CategroyRouter = Router();

CategroyRouter.get("/category", (req, res) => {
  Category.find().then((data) => res.send(data));
});

CategroyRouter.post("/category", async (req, res) => {
  // try validate akain agar validate bu anja ache addi user bka, agin err message return akaw function awaste
  try {
    await catValid.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const { body } = req;
  console.log(body);
  const categ = new Category(body);
  categ.save().then((e) => res.send(e));
});

CategroyRouter.get("/category/:id", async (req, res) => {
  const categ = await Category.findById(req.params.id);
  res.json(categ);
});

CategroyRouter.put("/category/:id", async (req, res) => {
  const categ = await Category.findByIdAndUpdate(req.params.id, req.body);
  res.json(categ);
});

CategroyRouter.delete("/category/:id", (req, res) => {
  Category.findOneAndDelete(req.body).then((data) => res.send(data));
});

export default CategroyRouter;
