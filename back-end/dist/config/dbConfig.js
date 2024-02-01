"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var dataBase = function () {
    try {
        mongoose_1.default.connect(process.env.URL).then(function () {
            console.log('db connected successfully.......');
        });
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = dataBase;
//# sourceMappingURL=dbConfig.js.map