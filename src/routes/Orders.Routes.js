import { Router } from "express";
import Orders from "../models/OrdersModel.js";
import orderValid from "../validations/OrdersValidation.js";
import { isAdmin, isAuth } from "../middlewares/auth.middleware.js";
const OrdersRouter = Router();

OrdersRouter.get("/orders", (req, res) => {
  Orders.find().then((data) => res.send(data));
});

OrdersRouter.post("/orders", isAuth, isAdmin, async (req, res) => {
  // try validate akain agar validate bu anja ache addi user bka, agin err message return akaw function awaste
  try {
    await orderValid.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const { body } = req;
  console.log(body);
  const ord = new Orders(body);
  ord.save().then((e) => res.send(e));
});

OrdersRouter.get("/orders/:id", isAuth, isAdmin, async (req, res) => {
  const ord = await Orders.findById(req.params.id);
  res.json(ord);
});

OrdersRouter.put("/orders/:id", isAuth, isAdmin, async (req, res) => {
  const ord = await Orders.findByIdAndUpdate(req.params.id, req.body);
  res.json(ord);
});

OrdersRouter.delete("/orders/:id", isAuth, isAdmin, (req, res) => {
  Orders.findOneAndDelete(req.body).then((data) => res.send(data));
});

export default OrdersRouter;
