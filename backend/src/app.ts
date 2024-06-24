import express, { NextFunction, Request, Response } from "express"

// user routes
import userRoutes from './routes/user.js'
import productRoutes from './routes/product.js'
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

const port =4000;
const app = express();
app.use(express.json())
connectDB();

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/product",productRoutes)


app.use('/uploads',express.static("uploads"))
//error handling middleware
app.use(errorMiddleware)

app.listen(port,()=>{
    console.log(`server is running on localhost ${port}`)
})