"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserMailValidation = exports.sendVerificationHandlerValidation = exports.signinDataValidation = exports.signupDataValidation = void 0;
const userSchema_1 = require("./userSchema");
const validator_1 = __importDefault(require("../utils/validator"));
const signupDataValidation = (req, res, next) => {
    (0, validator_1.default)(userSchema_1.userSchema.signnupUser, req.body, next);
};
exports.signupDataValidation = signupDataValidation;
const signinDataValidation = (req, res, next) => {
    (0, validator_1.default)(userSchema_1.userSchema.signinUser, req.body, next);
};
exports.signinDataValidation = signinDataValidation;
const sendVerificationHandlerValidation = (req, res, next) => {
    (0, validator_1.default)(userSchema_1.userSchema.sendVerificationHandler, req.body, next);
};
exports.sendVerificationHandlerValidation = sendVerificationHandlerValidation;
const verifyUserMailValidation = (req, res, next) => {
    (0, validator_1.default)(userSchema_1.userSchema.verifyUserMail, req.body, next);
};
exports.verifyUserMailValidation = verifyUserMailValidation;
