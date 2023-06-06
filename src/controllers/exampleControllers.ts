import { RequestHandler } from "express";
import Example from "../model/Example";
import createHttpError from "http-errors";

export const getExample:RequestHandler = (req,res,next) =>{
    res.json({message: "hello"})
}
export const getExampleData:RequestHandler = async(req,res,next) =>{
    const {name,id}:IExampleData = req.body;

    const example = await Example.findOne({name})
    console.log(next);
    
    if(example)
    {
        return next(createHttpError(406,"Example already exists!"))
    }

    await Example.create({name,id});


    res.json({name,id})
}

