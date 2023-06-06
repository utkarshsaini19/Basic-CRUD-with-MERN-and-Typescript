"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserMail = exports.sendVerificationHandler = exports.signinUser = exports.signnupUser = void 0;
const User_1 = __importDefault(require("../model/User"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_errors_1 = __importStar(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const signnupUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return next((0, http_errors_1.default)(422, "Email already exists!"));
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.default.create({ name, email, password: hashedPassword });
        res.json({ message: "User Created", user });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
});
exports.signnupUser = signnupUser;
const signinUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user1 = yield User_1.default.findOne({ email });
        if (!user1) {
            return next((0, http_errors_1.default)(404, "User not Found!"));
        }
        if (!user1.isUserVerified) {
            return next((0, http_errors_1.default)(406, "User not Verified!"));
        }
        const isValidPassword = bcrypt_1.default.compare(password, user1.password);
        if (!isValidPassword) {
            return next((0, http_errors_1.default)(401, "User not Found!"));
        }
        const token = jsonwebtoken_1.default.sign({
            userID: user1._id
        }, "Utkarshisagoodboy", {
            expiresIn: '7d'
        });
        res.cookie("jwt", token);
        res.json({ username: user1.name, message: "User Logged In", token });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
});
exports.signinUser = signinUser;
const sendVerificationHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user2 = yield User_1.default.findOne({ email });
        if (!user2) {
            return next((0, http_errors_1.default)(404, "Email not valid !"));
        }
        if (user2.isUserVerified) {
            return next((0, http_errors_1.default)(406, "User already verified !"));
        }
        const encryptedToken = yield bcrypt_1.default.hash(user2._id.toString(), 8);
        const jwtToken = jsonwebtoken_1.default.sign({ userId: user2._id }, "Utkarshisagoodboy", {
            expiresIn: '60m'
        });
        let info = yield config_1.transporter.sendMail({
            from: '"Utkarsh Saini 👻" <utkarshsaini19@gmail.com>',
            to: email,
            subject: "For Email Verification ✔",
            // text: "Hello world?", // plain text body
            html: `Your Verification for forgot password Link <a href="${config_1.FRONTEND_URL}/email-verify/${jwtToken}">Link</a>`, // html body
        });
        yield user2.updateOne({ $set: { verifyToken: encryptedToken } });
        // Preview only available when sending through an Ethereal account
        // res.status(200).json({message:`Preview URL: %s, ${nodemailer.getTestMessageUrl(info)}`});
        res.status(200).json({ message: `Preview URL: %s, ${nodemailer_1.default.getTestMessageUrl(info)}` });
    }
    catch (error) {
        console.log(error.message);
        return next(http_errors_1.InternalServerError);
    }
});
exports.sendVerificationHandler = sendVerificationHandler;
const verifyUserMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, "Utkarshisagoodboy");
        const user3 = yield User_1.default.findById(decodedToken.userId);
        if (!user3) {
            return next((0, http_errors_1.default)(401, "Invalid Token!"));
        }
        yield user3.updateOne({
            $set: { isUserVerified: true },
            $unset: { verifyToken: 0 }
        });
        return res.status(200).json({ message: "Email Verified Successfully!" });
    }
    catch (error) {
        return next((0, http_errors_1.default)(401, "Invalid Token!"));
    }
});
exports.verifyUserMail = verifyUserMail;
