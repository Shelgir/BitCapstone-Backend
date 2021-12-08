import { Router } from "express";
import jwt from "jsonwebtoken";

const AuthRouter = Router();

AuthRouter.post("/login", (req, res) => {
  console.log(req.body, "amaya xoyati");
  var token = jwt.sign(req.body, "jsonsupersecret");
  console.log(token);
  res.json({ bearer: token });
});

export default AuthRouter;
