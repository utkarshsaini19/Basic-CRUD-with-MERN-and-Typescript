import { RequestHandler } from "express";
import User from "../model/User";
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import createHttpError, { InternalServerError } from "http-errors";
import jwt from "jsonwebtoken";
import { FRONTEND_URL, transporter } from "../config";

export const signnupUser: RequestHandler = async (req, res, next) => {
    const { name, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return next(createHttpError(422, "Email already exists!"))
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })

        res.json({ message: "User Created", user })

    } catch (error) {
        return next(InternalServerError)
    }
}

export const signinUser: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user1 = await User.findOne({ email })
        if (!user1) {
            return next(createHttpError(404, "User not Found!"))
        }

        if(!user1.isUserVerified)
        {
            return next(createHttpError(406, "User not Verified!"))
        }

        const isValidPassword = bcrypt.compare(password, user1.password)
        if (!isValidPassword) {
            return next(createHttpError(401, "User not Found!"))
        }

        const token = jwt.sign({
            userID: user1._id
        },
            "Utkarshisagoodboy",
            {
                expiresIn: '7d'
            })

        res.cookie("jwt", token);
        res.json({ username:user1.name,message: "User Logged In", token })

    } catch (error) {
        return next(InternalServerError)
    }
}

export const sendVerificationHandler: RequestHandler = async (req, res, next) => {

    const { email }: { email: string } = req.body;

    try {
        const user2 = await User.findOne({ email });

        if (!user2) {
            return next(createHttpError(404, "Email not valid !"))
        }

        if (user2.isUserVerified) {
            return next(createHttpError(406, "User already verified !"))
        }

        const encryptedToken = await bcrypt.hash(user2._id.toString(), 8);

        const jwtToken = jwt.sign({ userId: user2._id }, "Utkarshisagoodboy", {
            expiresIn: '60m'
        })



        

        let info = await transporter.sendMail({
            from: '"Utkarsh Saini 👻" <utkarshsaini19@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "For Email Verification ✔", // Subject line
            // text: "Hello world?", // plain text body
            html: `Your Verification for forgot password Link <a href="${FRONTEND_URL}/email-verify/${jwtToken}">Link</a>`, // html body
        })

        

        
        await user2.updateOne({ $set: { verifyToken: encryptedToken } })

        // Preview only available when sending through an Ethereal account
        // res.status(200).json({message:`Preview URL: %s, ${nodemailer.getTestMessageUrl(info)}`});
        res.status(200).json({message:`Preview URL: %s, ${nodemailer.getTestMessageUrl(info)}`});

    } catch (error: any) {
        console.log(error.message);
        
        return next(InternalServerError)
    }
}

export const verifyUserMail: RequestHandler = async (req,res,next) =>{
    const {token} : {token:string} = req.body
    try {
        
        const decodedToken : any = jwt.verify(token,"Utkarshisagoodboy");
        const user3 = await User.findById(decodedToken.userId)

        if(!user3)
        {
            return next(createHttpError(401,"Invalid Token!"))
        }

        await user3.updateOne({
            $set: { isUserVerified : true},
            $unset: { verifyToken: 0}
        })

        return res.status(200).json({message:"Email Verified Successfully!"})
    } catch (error) {
        return next(createHttpError(401,"Invalid Token!"))
    }
}