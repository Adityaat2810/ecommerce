import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { allOrders, getSingleOrder, myOrders, newOrder } from "../controllers/order.js";

const app = express.Router();

app.post("/new", newOrder);
app.get('/my',myOrders)
app.get('/all',adminOnly,allOrders)
app.get('/:id',getSingleOrder)


export default app;