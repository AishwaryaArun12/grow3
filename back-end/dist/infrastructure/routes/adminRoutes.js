"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var adminRepository_1 = require("../repository/adminRepository");
var adminUseCase_1 = __importDefault(require("../../application/adminUseCase"));
var adminService_1 = __importDefault(require("../../domain/services/adminService"));
var adminController_1 = __importDefault(require("../../controllers/adminController"));
var userRoutes_1 = require("./userRoutes");
var AdminRepository = new adminRepository_1.adminRepository();
var AdminUseCase = new adminUseCase_1.default(AdminRepository);
var AdminService = new adminService_1.default(AdminUseCase);
var AdminController = new adminController_1.default(AdminService);
var adminRouter = (0, express_1.Router)();
adminRouter.get('/getAllUsers', function (req, res) { return AdminController.getAllUsers(req, res); });
adminRouter.get('/block', function (req, res) { return userRoutes_1.UserController.blockUser(req, res); });
adminRouter.get('/unblock', function (req, res) { return userRoutes_1.UserController.unblockUser(req, res); });
exports.default = adminRouter;
//# sourceMappingURL=adminRoutes.js.map