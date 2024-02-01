"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chatRepository_1 = __importDefault(require("../../infrastructure/repository/chatRepository"));
var chatUseCase_1 = __importDefault(require("../../application/chatUseCase"));
var chatService_1 = __importDefault(require("../../domain/services/chatService"));
var chatController_1 = __importDefault(require("../../controllers/chatController"));
var express_1 = require("express");
var ChatRepository = new chatRepository_1.default();
var ChatUseCase = new chatUseCase_1.default(ChatRepository);
var ChatService = new chatService_1.default(ChatUseCase);
var ChatController = new chatController_1.default(ChatService);
var chatRouter = (0, express_1.Router)();
chatRouter.post('/create_conversation', function (req, res) { return ChatController.createConversation(req, res); });
chatRouter.post('/create_message', function (req, res) { return ChatController.createMessage(req, res); });
chatRouter.get('/get_conversations/:id', function (req, res) { return ChatController.getConversations(req, res); });
chatRouter.get('/get_messages/:id', function (req, res) { return ChatController.getMessage(req, res); });
exports.default = chatRouter;
//# sourceMappingURL=chatRoutes.js.map