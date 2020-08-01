import express from "express";
const router = express.Router();
import Item from "../../models/item.js";

//// @route GET api/items
// @desc Get all items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//// @route POST api/items
// @desc Create a post
// @access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

//// @route Delete api/items
// @desc Delete things
// @access Public
router.delete("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

export default router;
