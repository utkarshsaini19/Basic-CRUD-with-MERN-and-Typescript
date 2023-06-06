import express from "express";
import cookieParser from 'cookie-parser'
import createHttpError from "http-errors";
import cors from 'cors'
import exampleRoute from './routes/exampleRoutes'
import userRoute from './routes/userRoutes'
import mongoose from "mongoose";
import { DB,PORT } from "./config";
import { errorHandler } from "./middleware/errorHandler";
import morgan from "morgan";
import passport from "passport";
import kpassport from "./middleware/passport";

const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())
// app.use(morgan('tiny'))
app.use(passport.initialize())
kpassport(passport)

mongoose
.connect(DB)
.then(()=>{
    console.log("Connected to DB!")
    app.listen(PORT,()=>{
        console.log(`Server started on PORT ${PORT}`);
    })
    
})
.catch(()=>{
    throw createHttpError('501',"Unable to connect DB!")
})
app.use('/',exampleRoute)
app.use('/',userRoute);


app.use(()=>{
    throw createHttpError(404,"Route not found")
})




app.use(errorHandler)

