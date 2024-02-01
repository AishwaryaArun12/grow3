"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
var createServer = function () {
    var app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    }));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({
        extended: false
    }));
    app.use(express_1.default.json());
    app.use((0, express_session_1.default)({
        secret: 'SECRET KEY',
        resave: false,
        saveUninitialized: true,
        store: connect_mongo_1.default.create({
            mongoUrl: process.env.URL,
        })
    }));
    app.use(express_1.default.static('uploads'));
    app.use((0, morgan_1.default)("dev"));
    return app;
};
exports.default = createServer;
//# sourceMappingURL=serverConfig.js.map