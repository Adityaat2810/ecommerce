import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { calculatePercentage } from "../utils/features.js";

export const getdashboardStats=TryCatch(
    async(req,res,next)=>{
        let stats;
        if(myCache.has("admin-stats"))
            stats=JSON.parse(myCache.get("admin-stats") as string)
        else{
            //Revenue , user , trsansactions , product
            const today = new Date();
            const startOfThisMonth= new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            )
            const startOfLastMonth= new Date(
                today.getFullYear(),
                today.getMonth()-1,
                1
            )

            const endOfLastMonth =new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            )

            const thisMonthProductsPromis = Product.find({
                createdAt:{
                    $gte:startOfThisMonth,
                    $lte:today
                }
            });

            const lastMonthProductsPromis= Product.find({
                createdAt:{
                    $gte:startOfLastMonth,
                    $lte:endOfLastMonth
                }
            })

            const thisMonthUserPromis = User.find({
                createdAt:{
                    $gte:startOfThisMonth,
                    $lte:today
                }
            });

            const lastMonthUserPromis= User.find({
                createdAt:{
                    $gte:startOfLastMonth,
                    $lte:endOfLastMonth
                }
            })

            const thisMonthOrderPromis = Order.find({
                createdAt:{
                    $gte:startOfThisMonth,
                    $lte:today
                }
            });

            const lastMonthOrderPromis= Order.find({
                createdAt:{
                    $gte:startOfLastMonth,
                    $lte:endOfLastMonth
                }
            })

            const [
                thisMonthProducts,
                thisMonthUsers,
                thisMonthOrders,
                lastMonthProducts,
                lastMonthUsers,
                lastMonthOrders,
                productCount,
                userCount,
                allOrders,


             ] = await Promise.all([
                thisMonthProductsPromis,
                thisMonthUserPromis,
                thisMonthOrderPromis,
                lastMonthProductsPromis,
                lastMonthUserPromis,
                lastMonthOrderPromis,
                Product.countDocuments(),
                User.countDocuments(),
                Order.find({}).select("total")
            ])

            const thisMonthRevenue = thisMonthOrders.reduce(
                (total,order)=> total + (order.total || 0),0
            )

            const lastMonthrevenue = lastMonthOrders.reduce(
                (total,order)=> total + (order.total || 0),0
            )

            //percentage =( thisMonth-lastmonth)/lastmonth * 100
            const changePercent ={
                revenue:calculatePercentage(thisMonthRevenue,lastMonthrevenue)
                ,
                product:calculatePercentage(
                    thisMonthProducts.length,
                    lastMonthUsers.length
                ),
                user:calculatePercentage(
                    thisMonthUsers.length,
                    lastMonthProducts.length
                ),
                order:calculatePercentage(
                    thisMonthOrders.length,
                    lastMonthOrders.length
                )
            }

            const revenue = allOrders.reduce(
                (total,order)=> total + (order.total || 0),0
            )

            const count ={
                revenue,
                user:userCount,
                product:productCount,
                order:allOrders.length
            }
            
            stats={
                changePercent,
                count
            }

        }

        return res.status(200).json({
            success:true,
            stats
        })
    }
)

export const getPieChart=TryCatch(
    async(req,res,next)=>{
        
    }
)

export const getBarCharts=TryCatch(
    async(req,res,next)=>{
        
    }
)

export const getLineCharts=TryCatch(
    async(req,res,next)=>{
        
    }
)