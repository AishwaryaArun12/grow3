"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var express_1 = require("express");
var userController_1 = require("../../controllers/userController");
var userService_1 = require("../../domain/services/userService");
var userRepository_1 = require("../repository/userRepository");
var userUseCase_1 = __importDefault(require("../../application/userUseCase"));
var multer_1 = __importDefault(require("multer"));
var UserRepository = new userRepository_1.userRepository();
var user_useCase = new userUseCase_1.default(UserRepository);
var UserService = new userService_1.userService(user_useCase);
exports.UserController = new userController_1.userController(UserService);
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
var userRouter = (0, express_1.Router)();
userRouter.post('/uploadcover', upload.single('profileImage'), function (req, res) { return exports.UserController.editCover(req, res); });
userRouter.post('/uploadimg', upload.single('profileImage'), function (req, res) { return exports.UserController.editImg(req, res); });
userRouter.patch('/editProfile', function (req, res) { return exports.UserController.editProfile(req, res); });
userRouter.patch('/edit_connection', function (req, res) { return exports.UserController.editConnection(req, res); });
userRouter.get('/get_all_users', function (req, res) { return exports.UserController.getAllUsers(req, res); });
userRouter.post('/razorpay', function (req, res) { return exports.UserController.razorpay(req, res); });
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map