import config from "config";

import jwt from "jsonwebtoken";

const auth = function (req, res, next) {
  const token = req.header("x-auth-token");

  //check for token
  if (!token) res.status(401).json({ msg: "No Token, auth denied" });

  try {
    // Verify Token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Add user
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};
export default auth;
