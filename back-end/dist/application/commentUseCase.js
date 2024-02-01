"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commentUseCase = /** @class */ (function () {
    function commentUseCase(comment) {
        this.commentRepository = comment;
    }
    commentUseCase.prototype.create = function (comment) {
        return this.commentRepository.create(comment);
    };
    commentUseCase.prototype.edit = function (id, data) {
        return this.commentRepository.edit(id, data);
    };
    commentUseCase.prototype.delete = function (id) {
        return this.commentRepository.delete(id);
    };
    commentUseCase.prototype.addReply = function (id, data) {
        return this.commentRepository.addReply(id, data);
    };
    commentUseCase.prototype.removeReply = function (id, replyId) {
        return this.commentRepository.removeReply(id, replyId);
    };
    commentUseCase.prototype.editReply = function (id, replyId, updatedText) {
        return this.commentRepository.editReply(id, replyId, updatedText);
    };
    commentUseCase.prototype.like = function (id, userId) {
        return this.commentRepository.like(id, userId);
    };
    commentUseCase.prototype.report = function (data) {
        return this.commentRepository.report(data);
    };
    commentUseCase.prototype.editReport = function (id, data) {
        return this.commentRepository.editReport(id, data);
    };
    commentUseCase.prototype.checkReport = function (id, userId) {
        return this.commentRepository.checkReport(id, userId);
    };
    return commentUseCase;
}());
exports.default = commentUseCase;
//# sourceMappingURL=commentUseCase.js.map