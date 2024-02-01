"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var admin_1 = require("../../infrastructure/middlewares/admin");
var userBlock_1 = require("../../infrastructure/middlewares/userBlock");
var subscriptionRepository_1 = __importDefault(require("../repository/subscriptionRepository"));
var subscriptionUseCase_1 = __importDefault(require("../../application/subscriptionUseCase"));
var subscriptionService_1 = __importDefault(require("../../domain/services/subscriptionService"));
var subscriptionCotroller_1 = __importDefault(require("../../controllers/subscriptionCotroller"));
var SubscriptionRepository = new subscriptionRepository_1.default();
var SubscriptionUseCase = new subscriptionUseCase_1.default(SubscriptionRepository);
var SubscriptionService = new subscriptionService_1.default(SubscriptionUseCase);
var SubscriptionController = new subscriptionCotroller_1.default(SubscriptionService);
var subscriptionRouter = (0, express_1.Router)();
subscriptionRouter.post('/create', admin_1.adminJwtAuth, function (req, res) { return SubscriptionController.create(req, res); });
subscriptionRouter.patch('/add_feature', admin_1.adminJwtAuth, function (req, res) { return SubscriptionController.addFeature(req, res); });
subscriptionRouter.delete('/delete/:id', admin_1.adminJwtAuth, function (req, res) { return SubscriptionController.delete(req, res); });
subscriptionRouter.patch('/edit', admin_1.adminJwtAuth, function (req, res) { return SubscriptionController.edit(req, res); });
subscriptionRouter.get('/get_features', userBlock_1.userBlock, function (req, res) { return SubscriptionController.getFeature(req, res); });
subscriptionRouter.get('/get_subscriptions', userBlock_1.userBlock, function (req, res) { return SubscriptionController.getAllSubscription(req, res); });
exports.default = subscriptionRouter;
//# sourceMappingURL=subscriptionRoutes.js.map