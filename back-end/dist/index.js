"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var userRoutes_1 = __importDefault(require("./infrastructure/routes/userRoutes"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var passportConfig_1 = __importDefault(require("../src/passportConfig"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
var port = parseInt(process.env.port);
mongoose_1.default.connect(process.env.URL).then(function () {
    console.log('db connected successfully.......');
});
app.use((0, express_session_1.default)({
    secret: 'SECRET KEY',
    resave: false,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.URL,
    })
}));
app.use(passportConfig_1.default.initialize());
app.use(passportConfig_1.default.session());
app.use(express_1.default.json());
app.use('/', userRoutes_1.default);
app.get('/auth', passportConfig_1.default.authenticate('google', { scope: ['email', 'profile']
}));
// Auth Callback
app.get('/auth/callback', passportConfig_1.default.authenticate('google', {
    successRedirect: '/auth/callback/success',
    failureRedirect: '/auth/callback/failure'
}));
// Success 
app.get('/auth/callback/success', function (req, res) {
    req.session.user = req.user;
    var user = req.user;
    if (!req.user) {
        res.redirect('/auth/callback/failure');
    }
    else {
        if (user.displayName == 'Aishwarya Arun' && user.email == 'aishwarya4arun@gmail.com') {
            res.redirect('http://localhost:5173/admin/home');
        }
        else {
            res.redirect('http://localhost:5173/selectuser');
        }
    }
});
// failure
app.get('/auth/callback/failure', function (req, res) {
    res.redirect('http://localhost:5173/login');
});
app.listen(port, function () {
    console.log("server running on the port ".concat(port));
});
//# sourceMappingURL=index.js.map