import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import { myCache } from "../app.js";
import ErrorHandler from "../utils/utility-class.js";

export const newOrder= TryCatch(
    async (req:Request<{},{},NewOrderRequestBody>,res,next)=>{
        const {
            shippingInfo,
            orderItems,
            user,
            subTotal,
            tax,
            total,
            shippingCharges,
            discount} = req.body

        if(
            !shippingInfo || !orderItems || !user || !subTotal || !tax || 
            !total 
        ){
            return res.status(400).json({success:false,message:"Please fill all the fields"})
        }

        await Order.create({
            shippingCharges,
            orderItems,
            shippingInfo,
            user,
            subTotal,
            tax,
            total,
            discount
        })

        await reduceStock(orderItems);
        await invalidateCache({product:true,order:true,admin:true})
        
        return res.status(200).json({
            success:true,
            message:"Order placed successfully! "
        })
        
    }
)

export const myOrders = TryCatch(
    async (req,res ,next)=>{
        const {id:user} = req.query;
        let orders=[] ;
        if(myCache.has(`my-orders-${user}`)) 
            orders =JSON.parse(myCache.get(`my-orders-${user}`) as string) ;
        else{
            orders = await Order.find({user})
            myCache.set(`my-orders-${user}`,JSON.stringify(orders))
        }

        return res.status(200).json({
            success:true,
            orders
        })
    }
)


export const allOrders = TryCatch(
    async (req,res ,next)=>{
        let orders=[] ;
        if(myCache.has(`all-orders`)) 
            orders =JSON.parse(myCache.get(`all-orders`) as string) ;
        else{
            orders = await Order.find().populate("user")
            myCache.set(`all-orders`,JSON.stringify(orders))
        }

        return res.status(200).json({
            success:true,
            orders
        })
    }
)

export const getSingleOrder = TryCatch(
    async (req,res ,next)=>{
        const {id} = req.params;
        const key = `order-${id}`
        let orders ;
        if(myCache.has(key)) 
            orders =JSON.parse(myCache.get(key) as string) ;
        else{
            orders = await Order.findById(id).populate("user","name")
            if(!orders){
                return next(new ErrorHandler("order not found",404))
            }
            myCache.set(key,JSON.stringify(orders))
            
        }

        return res.status(200).json({
            success:true,
            orders
        })
    }
)




