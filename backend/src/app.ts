import express, { NextFunction, Request, Response } from "express"
import NodeCache from "node-cache";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import {config} from "dotenv"
import morgan from "morgan"

// user routes
import orderRoutes from './routes/orders.js'
import userRoutes from './routes/user.js'
import productRoutes from './routes/product.js'

config({
    path: './.env'
})
const port =process.env.PORT || 4000;
const app = express();

app.use(express.json())
app.use(morgan('dev'))  //a middleware that logs HTTP requests and errors
connectDB(process.env.MONGO_URI!);

export const myCache = new NodeCache();

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/product",productRoutes)
app.use("/api/v1/order",orderRoutes)


app.use('/uploads',express.static("uploads"))
//error handling middleware
app.use(errorMiddleware)

app.listen(port,()=>{
    console.log(`server is running on localhost ${port}`)
})