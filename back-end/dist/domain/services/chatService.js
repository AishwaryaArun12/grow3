"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chatService = /** @class */ (function () {
    function chatService(chat) {
        this.chatUseCase = chat;
    }
    chatService.prototype.createConversation = function (data) {
        return this.chatUseCase.createConversation(data);
    };
    chatService.prototype.createMessage = function (data) {
        return this.chatUseCase.createMessage(data);
    };
    chatService.prototype.getConversations = function (id) {
        return this.chatUseCase.getConversation(id);
    };
    chatService.prototype.getMessages = function (id) {
        return this.chatUseCase.getMessages(id);
    };
    return chatService;
}());
exports.default = chatService;
//# sourceMappingURL=chatService.js.map