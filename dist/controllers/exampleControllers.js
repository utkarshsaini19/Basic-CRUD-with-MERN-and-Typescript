"use strict";
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
exports.getExampleData = exports.getExample = void 0;
const Example_1 = __importDefault(require("../model/Example"));
const http_errors_1 = __importDefault(require("http-errors"));
const getExample = (req, res, next) => {
    res.json({ message: "hello" });
};
exports.getExample = getExample;
const getExampleData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id } = req.body;
    const example = yield Example_1.default.findOne({ name });
    console.log(next);
    if (example) {
        return next((0, http_errors_1.default)(406, "Example already exists!"));
    }
    yield Example_1.default.create({ name, id });
    res.json({ name, id });
});
exports.getExampleData = getExampleData;
