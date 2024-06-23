import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser =TryCatch(
    async (
        req:Request,
        res:Response,
        next:NextFunction
    )=>{

            //return next( new ErrorHandler("mera custom erroe",400) )
             
            const {name,email,photo,gender,_id,dob}=req.body;
            const user =await User.create({
                name,email,photo,gender,_id,
                dob:new Date(dob)
            })
    
            return res.status(200).json({
                success:true,
                message:`Welcome ${user.name}`
            })
    
    }
);