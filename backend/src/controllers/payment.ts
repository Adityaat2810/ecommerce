import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";

export const newCoupon =TryCatch(
    async (req, res,next) => {
        const {coupon,amount}=req.body ;

        if(!coupon || !amount)
            return next(new ErrorHandler("Plese enter both field",400))
        await Coupon.create({
            couponCode:coupon
            ,amount
        })

        return res.status(200).json({
           success:true,
           message:"Coupan created successfully" 
        });

    }
)

export const applyDiscount =TryCatch(
    async (req, res,next) => {
        const {coupon}=req.query ;
        const discount = await Coupon.findOne({couponCode:coupon})

        if(!discount){
            return next(new ErrorHandler("Invalid coupon code",400))
        }

        return res.status(201).json({
            success:true,
            discount:discount.amount
        })

    }
)

export const allCoupons =TryCatch(
    async (req, res,next) => {
        const coupons = await Coupon.find()

        return res.status(201).json({
            success:true,
            coupons:coupons
        })

    }
)

export const deleteCoupon =TryCatch(
    async (req, res,next) => {
        const {id}=req.params ;
        const coupon =await Coupon.findByIdAndDelete(id)

        if(!coupon){
            return next(new ErrorHandler("Invalid coupon id",400))
        }
        return res.status(201).json({
            success:true,
            message:"coupon dleted successfully"
        })

    }
)
