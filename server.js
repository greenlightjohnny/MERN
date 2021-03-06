import express from "express";
import mongoose from "mongoose";
//import { mongoURI } from "./config/default.json";
import items from "./routes/api/items.js";
import users from "./routes/api/users.js";
import auth from "./routes/api/auth.js";
import path from "path";
import config from "config";
//import { json } from "body-parser";
// Removed since body parser is now included in express
// instead of:
// app.use(json())
// app.use(express.json())
const db = config.get("mongoURI");

const app = express();

app.use(express.json());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGO Connected"))
  .catch((err) => console.log(err));

app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
