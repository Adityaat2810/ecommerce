import express from "express"

// user routes
import userRoutes from './routes/user.js'
import { connectDB } from "./utils/features.js";

const port =4000;
const app = express();
app.use(express.json())
connectDB();

app.use("/api/v1/user",userRoutes)

app.listen(port,()=>{
    console.log(`server is running on localhost ${port}`)
})