import { Router } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";

const AuthRouter = Router();

AuthRouter.post("/login", async (req, res) => {
  console.log(req.body, process.env.JWT_PRIVATE_KEY);
  let user;
  try {
    user = await Users.findOne({ email: req.body.email });
  } catch (error) {
    return res.json("Unknown Error");
  }

  if (user) {
    var token = jwt.sign(req.body, process.env.JWT_PRIVATE_KEY);
    console.log(token);
    res.send({ bearer: token });
  } else {
    return res.send("User Not Found");
  }
});

export default AuthRouter;
