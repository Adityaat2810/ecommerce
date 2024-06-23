import mongoose from "mongoose"

export const connectDB=()=>{
    mongoose.connect("mongodb://localhost:27017",{
        dbName:"Ecommerce_App"
    }).then(c=>{
        console.log(`Db connectd to ${c.connection.host}`)
    }).catch((e)=>console.log(e))

}