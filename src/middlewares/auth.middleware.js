import jwt from "jsonwebtoken";

export function isAuth(req, res, next) {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = user;
  } catch (error) {
    return res.status(401).json("auth failed");
  }
  next();
}
export function isAdmin(req, res, next) {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = user;
  } catch (error) {
    return res.status(401).json("auth failed");
  }
  next();
}

export default { isAdmin, isAuth };
