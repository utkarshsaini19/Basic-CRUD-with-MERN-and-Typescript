import { Router } from "express";
import { sendVerificationHandler, signinUser, signnupUser, verifyUserMail } from "../controllers/userControllers";
import { sendVerificationHandlerValidation, signinDataValidation, signupDataValidation, verifyUserMailValidation } from "../validation/userValidation/userValidation";

const router = Router();

router.post('/signup',signupDataValidation,signnupUser)
router.post('/signin',signinDataValidation,signinUser)

router.post('/sendVerificationMail',sendVerificationHandlerValidation, sendVerificationHandler)
router.post('/verifyUserMail',verifyUserMailValidation, verifyUserMail)

export default router