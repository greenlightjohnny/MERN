import express from "express";
const router = express.Router();
import User from "../../models/user.js";

//// @route POST api/users
// @desc Registers new user
// @access Public
router.post("/", (req, res) => {
  res.send("register");
});

export default router;
