import Joi from "joi"

export const userSchema = {
    signnupUser: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    signinUser: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    sendVerificationHandler: Joi.object({
        email: Joi.string().email().required()
    }),
    verifyUserMail: Joi.object({
        token: Joi.string().required()
    })
}