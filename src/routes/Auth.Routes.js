import { Router } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";
import userValid from "../validations/UserValidate.js";

const AuthRouter = Router();

AuthRouter.post("/login", async (req, res) => {
  let user;
  try {
    user = await Users.findOne({ email: req.body.email });
    console.log(user);
  } catch (error) {
    return res.json("Unknown Error");
  }

  if (user) {
    if (user.password === req.body.password) {
      let newUser = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        age: user.message,
      };
      var token = jwt.sign(newUser, process.env.JWT_PRIVATE_KEY);
      res.json(`bearer ${token}`);
    } else {
      return res.send("Username or Password Incorrect");
    }
  } else {
    return res.send("Username or Password Incorrect");
  }
});

AuthRouter.post("/register", async (req, res) => {
  // try validate akain agar validate bu anja ache addi user bka, agin err message return akaw function awaste
  let user;
  try {
    await userValid.validateAsync(req.body);
    user = await Users.findOne({ email: req.body.email });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  if (user === null) {
    const { body } = req;
    console.log(body);
    const newUser = new Users(body);
    newUser.save().then((e) => res.send(e));
  } else {
    return res.send("this email is associated with an account already");
  }
});

export default AuthRouter;
