import express from "express";
const router = express.Router();
import Item from "../../models/item.js";
import auth from "../../middleware/auth.js";

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
// @access Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

//// @route Delete api/items
// @desc Delete things
// @access Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

export default router;
