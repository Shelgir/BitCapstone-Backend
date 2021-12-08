import { Router } from "express";
import Users from "../models/UserModel.js";
import userValid from "../validations/UserValidate.js";
import { isAuth } from "../middlewares/auth.middleware.js";
const UserRouter = Router();

UserRouter.get("/users", isAuth, (req, res) => {
  Users.find().then((data) => res.send(data));
});

UserRouter.post("/users", async (req, res) => {
  // try validate akain agar validate bu anja ache addi user bka, agin err message return akaw function awaste
  try {
    await userValid.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const { body } = req;
  console.log(body);
  const user = new Users(body);
  user.save().then((e) => res.send(e));
});

UserRouter.get("/users/:id", async (req, res) => {
  const user = await Users.findById(req.params.id);
  res.json(user);
});

UserRouter.put("/users/:id", async (req, res) => {
  const user = await Users.findByIdAndUpdate(req.params.id, req.body);
  res.json(user);
});

UserRouter.delete("/users/:id", (req, res) => {
  Users.findOneAndDelete(req.body).then((data) => res.send(data));
});

export default UserRouter;
