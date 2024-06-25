import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";

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