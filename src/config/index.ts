import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config();

export const DB = process.env.DB!
export const PORT = process.env.PORT!
export const FRONTEND_URL = process.env.FRONTEND_URL!

export const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
        user: 'etherial mail', // generated ethereal user
        pass: 'etherial password', // generated ethereal password
    },
});