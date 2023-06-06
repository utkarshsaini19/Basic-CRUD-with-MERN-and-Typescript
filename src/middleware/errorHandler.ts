import { ErrorRequestHandler } from "express";

export const errorHandler:ErrorRequestHandler = (err,req,res,next) =>{
    // console.log(err.message,err.statusCode,res.headersSent);
    if(res.headersSent)
    {
        return next(err)
    }
    return res.status(err.statusCode || 500).json({message: err.message})
    
}