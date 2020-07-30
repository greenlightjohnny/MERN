import express from "express";
import mongoose from "mongoose";
import { mongoURI } from "./config/keys.js";
//import { json } from "body-parser";
// Removed since body parser is now included in express
// instead of:
// app.use(json())
// app.use(express.json())

const app = express();

app.use(express.json());

console.log("############", mongoURI);
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MONGO Connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
