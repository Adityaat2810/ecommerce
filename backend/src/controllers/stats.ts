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
            const sixMonthsAgo =new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth()-6)

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

            const lastSixMonthOrderPromise= Order.find({
                createdAt:{
                    $gte:sixMonthsAgo,
                    $lte:today
                }
            });

            const latestTransactionsPromise= Order.find({}).select([
                "orderItems",
                "discount",
                "total",
                "status"
            ]).limit(4)

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

                lastSixMonthOrder,
                categories,

                femaleUsersCount,

                latestTrasaction

             ] = await Promise.all([
                thisMonthProductsPromis,
                thisMonthUserPromis,
                thisMonthOrderPromis,
                lastMonthProductsPromis,
                lastMonthUserPromis,
                lastMonthOrderPromis,
                Product.countDocuments(),
                User.countDocuments(),
                Order.find({}).select("total"),
                lastSixMonthOrderPromise,
                Product.distinct("category"),
                User.countDocuments({gender:"female"}),

                latestTransactionsPromise


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
            };

            const orderMonthCounts = new Array(6).fill(0);
            const orderMonthlyRevenue = new Array(6).fill(0);


            lastSixMonthOrder.forEach((order)=>{
                const creationDate= order.createdAt
                const monthDiff = today.getMonth()-creationDate.getMonth();

                if(monthDiff<6){
                    orderMonthCounts[6-monthDiff-1]++;
                    orderMonthlyRevenue[6-monthDiff-1] += order.total;
                }
            });

            // percent distrribution for each category
            const categoriesCountPromise =categories.map(category=>
                Product.countDocuments({category})
            ) 

            const categoriesCount = await 
                Promise.all(categoriesCountPromise);
            //now array categories count has count for each category
            
            const categoryCount: { category: string; count: number; }[]=[]   
            categories.forEach((category,index)=>{
                categoryCount.push({
                    category,
                    count:Math.round((categoriesCount[index]/productCount)*100)
                })
            })

            const UsersRatio={
                male:userCount-femaleUsersCount,
                female:femaleUsersCount
            }

            const modifiedlatestTrasaction=latestTrasaction.
                 map((transaction)=>({
                    _id:transaction._id,
                    discount:transaction.discount,
                    amount:transaction.total,
                    quantity:transaction.orderItems.length,
                    status:transaction.status

                })
            )
            
            stats={
                changePercent,
                count,
                chart:{
                    orderMonthCounts,
                    orderMonthlyRevenue
                },
                categoryCount,
                UsersRatio,
                latestTrasaction:modifiedlatestTrasaction
            }

            //cache this data 
           myCache.set("admin-stats",JSON.stringify(stats)) 

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