"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../../controllers/userController");
var userService_1 = require("../../domain/services/userService");
var userRepository_1 = require("../repository/userRepository");
var userUseCase_1 = __importDefault(require("../../application/userUseCase"));
var jwtAuth_1 = require("../../infrastructure/middlewares/jwtAuth");
var userBlock_1 = require("../../infrastructure/middlewares/userBlock");
var UserRepository = new userRepository_1.userRepository();
var user_useCase = new userUseCase_1.default(UserRepository);
var UserService = new userService_1.userService(user_useCase);
var UserController = new userController_1.userController(UserService);
var authRouter = (0, express_1.Router)();
authRouter.post('/newUser', function (req, res) { return UserController.createUser(req, res); });
authRouter.get('/sendOtp', function (req, res) { return UserController.sendOtp(req, res); });
authRouter.get('/getUser', userBlock_1.userBlock, function (req, res) { return UserController.getUser(req, res); });
authRouter.post('/checkOtp', function (req, res) { return UserController.checkOtp(req, res); });
authRouter.post('/login', function (req, res) { return UserController.login(req, res); });
authRouter.post('/selectuser', function (req, res) { return UserController.selectUser(req, res); });
authRouter.get('/getUser/:id', userBlock_1.userBlock, function (req, res) { return UserController.getUserFromId(req, res); });
authRouter.post('/newAccessToken', jwtAuth_1.newAccessToken);
authRouter.post('/forgotemail', function (req, res) { return UserController.forgotEmail(req, res); });
authRouter.post('/changepassword', function (req, res) { return UserController.editPassword(req, res); });
exports.default = authRouter;
//# sourceMappingURL=authRoutes.js.map