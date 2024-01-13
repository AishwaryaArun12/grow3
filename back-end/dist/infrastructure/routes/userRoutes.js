"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../../controllers/userController");
var userServices_1 = require("../../domain/services/userServices");
var userRepository_1 = require("../../infrastructure/repository/userRepository");
var userUseCase_1 = __importDefault(require("../../application/userUseCase"));
var UserRepository = new userRepository_1.userRepository();
var user_useCase = new userUseCase_1.default(UserRepository);
var UserService = new userServices_1.userService(user_useCase);
var UserController = new userController_1.userController(UserService);
var userRouter = (0, express_1.Router)();
userRouter.post('/newUser', function (req, res) {
    req.session.email = req.body.email;
    return UserController.createUser(req, res);
});
userRouter.get('/', function (req, res) { return res.send('haillllllllll'); });
userRouter.get('/sendOtp', function (req, res) {
    console.log(req.session.email, 'email from sendOtp route');
    return UserController.sendOtp(req, res);
});
userRouter.get('/getUser', function (req, res) { return UserController.getUser(req, res); });
userRouter.post('/checkOtp', function (req, res) { return UserController.checkOtp(req, res); });
userRouter.post('/login', function (req, res) { return UserController.login(req, res); });
userRouter.post('/selectuser', function (req, res) { return UserController.selectUser(req, res); });
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map