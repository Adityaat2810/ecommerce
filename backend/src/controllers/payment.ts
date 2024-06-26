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