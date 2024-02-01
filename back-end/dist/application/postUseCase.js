"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var postUseCase = /** @class */ (function () {
    function postUseCase(post) {
        this.postRepository = post;
    }
    postUseCase.prototype.create = function (post) {
        return this.postRepository.create(post);
    };
    postUseCase.prototype.edit = function (id, data) {
        return this.postRepository.edit(id, data);
    };
    postUseCase.prototype.delete = function (id) {
        return this.postRepository.delete(id);
    };
    postUseCase.prototype.getAllPosts = function (page, skip) {
        return this.postRepository.getAllPosts(page, skip);
    };
    postUseCase.prototype.getPost = function (id) {
        return this.postRepository.getPost(id);
    };
    postUseCase.prototype.removeLike = function (id, data) {
        return this.postRepository.removeLike(id, data);
    };
    postUseCase.prototype.editPost = function (id, data) {
        return this.postRepository.editPost(id, data);
    };
    postUseCase.prototype.report = function (data) {
        return this.postRepository.report(data);
    };
    postUseCase.prototype.editReport = function (id, data) {
        return this.postRepository.editReport(id, data);
    };
    postUseCase.prototype.checkReport = function (id, userId) {
        return this.postRepository.checkReport(id, userId);
    };
    postUseCase.prototype.getAllReports = function () {
        return this.postRepository.getAllReports();
    };
    return postUseCase;
}());
exports.default = postUseCase;
//# sourceMappingURL=postUseCase.js.map