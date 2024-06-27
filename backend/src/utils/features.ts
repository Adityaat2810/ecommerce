import mongoose from "mongoose"
import { OrderItem, invalidateCacheProps } from "../types/types.js"
import { myCache } from "../app.js"
import { Product } from "../models/product.js"
import { Order } from "../models/order.js"

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
    admin,
    userId,
    orderId,
    productId
    }:invalidateCacheProps)=>{

    if(product){
        const productKeys:string[]=[
            "latest-product",
            "categories",
            "admin-products",
           
        ]

        if(typeof productId==="string")
             productKeys.push( `single-product-${productId}`)
        if(typeof productId==="object")  
            productId.forEach(i=>{productKeys.push(`single-product-${i}`)})      
        
        myCache.del(productKeys)

    }

    if(order){
        const orderKeys:string[]=[
            "all-orders" ,
            `my-orders-${userId}`,
            `order-${orderId}`
        ]

        myCache.del(orderKeys);
        
    }


}

export const reduceStock=async (orderItems:OrderItem[])=>{
    for(let i =0 ; i < orderItems.length; ++i){
        const item =orderItems[i]
        const product =await Product.findById(item.productId)

        if(!product) throw new Error("Product not found")
        product.stock = product.stock -item.quantity
        await product.save()

    }

}

export const calculatePercentage =(
    thisMonth:number,
    lastmonth:number 
)=>{

    if(lastmonth===0) return thisMonth*100;

    const percent=( (thisMonth-lastmonth)/lastmonth)*100
    return Number(percent.toFixed(0))

}
