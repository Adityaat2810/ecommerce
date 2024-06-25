import mongoose from "mongoose"
import { invalidateCacheProps } from "../types/types.js"
import { myCache } from "../app.js"
import { Product } from "../models/product.js"

export const connectDB=(uri:string)=>{
    mongoose.connect(uri,{
        dbName:"Ecommerce_App"
    }).then(c=>{
        console.log(`Db connectd to ${c.connection.host}`)
    }).catch((e)=>console.log(e))

}

export const invalidateCache =async({
    product,
    order,
    admin
    }:invalidateCacheProps)=>{

    if(product){
        const productKeys:string[]=[
            "latest-product",
            "categories",
            "admin-products"
        ]
        const products =await Product.find({}).select("_id");
        products.forEach(i=>{
            productKeys.push(`single-product-${i}`);
        })
        myCache.del(productKeys)

    }


}
