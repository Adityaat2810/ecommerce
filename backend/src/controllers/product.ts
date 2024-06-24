import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";

export const newProduct = TryCatch(
    async(req:Request<{},{},NewProductRequestBody>,res,next)=>{

        const {name , category ,price , stock} = req.body;
        const photo = req.file ;

        if(!photo){
            return next(new ErrorHandler("please upload a photo",400));
        }
        
        if(!name || !price ||!category ||!stock){
            rm(photo.path,()=>{
                console.log("deletd")
            })
            return next(new ErrorHandler("please fill all fields",400));
        }
        
        const product= await Product.create({
            name ,
            category:category.toLowerCase() ,
            price , 
            stock,
            photo:photo?.path
        });

        res.status(201).json({
            success:true,
            message:`product created successfully`
        })


    }
)