"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_errors_1 = __importDefault(require("http-errors"));
const cors_1 = __importDefault(require("cors"));
const exampleRoutes_1 = __importDefault(require("./routes/exampleRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const errorHandler_1 = require("./middleware/errorHandler");
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middleware/passport"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// app.use(morgan('tiny'))
app.use(passport_1.default.initialize());
(0, passport_2.default)(passport_1.default);
mongoose_1.default
    .connect(config_1.DB)
    .then(() => {
    console.log("Connected to DB!");
    app.listen(config_1.PORT, () => {
        console.log(`Server started on PORT ${config_1.PORT}`);
    });
})
    .catch(() => {
    throw (0, http_errors_1.default)('501', "Unable to connect DB!");
});
app.use('/', exampleRoutes_1.default);
app.use('/', userRoutes_1.default);
app.use(() => {
    throw (0, http_errors_1.default)(404, "Route not found");
});
app.use(errorHandler_1.errorHandler);
