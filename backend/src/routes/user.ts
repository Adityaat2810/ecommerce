import express from "express";
import {

    deleteUser,
    getAllUsers,
  getUser,
  newUser,
} from "../controllers/user.js";

const app = express.Router();

app.post("/new", newUser);
app.get("/all",getAllUsers);
app.get("/:id",getUser);
app.delete("/:id",deleteUser);





export default app;