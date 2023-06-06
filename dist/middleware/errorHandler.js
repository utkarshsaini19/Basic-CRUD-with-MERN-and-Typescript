"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    // console.log(err.message,err.statusCode,res.headersSent);
    if (res.headersSent) {
        return next(err);
    }
    return res.status(err.statusCode || 500).json({ message: err.message });
};
exports.errorHandler = errorHandler;
