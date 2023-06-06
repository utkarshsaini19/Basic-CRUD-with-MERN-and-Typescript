import { RequestHandler } from "express";
import { userSchema } from "./userSchema";
import validator from "../utils/validator";

export const signupDataValidation: RequestHandler = (req,res,next) =>{
    validator(userSchema.signnupUser,req.body,next)
}

export const signinDataValidation: RequestHandler = (req,res,next) =>{
    validator(userSchema.signinUser,req.body,next)
}
export const sendVerificationHandlerValidation: RequestHandler = (req,res,next) =>{
    validator(userSchema.sendVerificationHandler,req.body,next)
}
export const verifyUserMailValidation: RequestHandler = (req,res,next) =>{
    validator(userSchema.verifyUserMail,req.body,next)
}