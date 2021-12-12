import jwt from "jsonwebtoken";

export function isAuth(req, res, next) {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token.split(" ")[1], process.env.JWT_PRIVATE_KEY);
    req.user = user;
  } catch (error) {
    return res.status(401).json("Not Authorized");
  }
  next();
}
export function isAdmin(req, res, next) {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Access Denied!" });
  }
}

export default { isAdmin, isAuth };
