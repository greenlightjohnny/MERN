import express from "express";
const router = express.Router();
import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";

//// @route POST api/auth
// @desc Auth user
// @access Public
router.post("/", (req, res) => {
  //res.send("register");
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing user
  User.findOne({ email: email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!ismatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

export default router;
