import express from "express";
const router = express.Router();
import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth.js";
const { response } = express;
//// @route POST api/auth
// @desc Auth user
// @access private
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
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

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
  //// @route get api/auth/user
  // @desc Get user data
  // @access Private
  router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
      .select("-password")
      .then((user) => res.json(user));
  });
});

export default router;
