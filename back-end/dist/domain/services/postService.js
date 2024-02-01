"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var postService = /** @class */ (function () {
    function postService(post, comment) {
        this.postUseCase = post;
        this.commentUseCase = comment;
    }
    postService.prototype.create = function (post) {
        return this.postUseCase.create(post);
    };
    postService.prototype.edit = function (id, data) {
        return this.postUseCase.edit(id, data);
    };
    postService.prototype.delete = function (id) {
        return this.postUseCase.delete(id);
    };
    postService.prototype.getAllPosts = function (page, skip) {
        return this.postUseCase.getAllPosts(page, skip);
    };
    postService.prototype.getPost = function (id) {
        return this.postUseCase.getPost(id);
    };
    postService.prototype.removeLike = function (id, data) {
        return this.postUseCase.removeLike(id, data);
    };
    postService.prototype.editPost = function (id, data) {
        return this.postUseCase.editPost(id, data);
    };
    postService.prototype.addComment = function (id, comment) {
        return __awaiter(this, void 0, void 0, function () {
            var res, add, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.commentUseCase.create(comment)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, this.postUseCase.edit(id, { comments: res._id })];
                    case 2:
                        add = _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    postService.prototype.editComment = function (id, data) {
        return this.commentUseCase.edit(id, data);
    };
    postService.prototype.deleteComment = function (id) {
        return this.commentUseCase.delete(id);
    };
    postService.prototype.addCommentReply = function (id, data) {
        return this.commentUseCase.addReply(id, data);
    };
    postService.prototype.removeCommentReply = function (id, replyId) {
        return this.commentUseCase.removeReply(id, replyId);
    };
    postService.prototype.editCommentReply = function (id, replyId, updatedText) {
        return this.commentUseCase.editReply(id, replyId, updatedText);
    };
    postService.prototype.like = function (id, userId) {
        return this.commentUseCase.like(id, userId);
    };
    postService.prototype.newPostReport = function (data) {
        return this.postUseCase.report(data);
    };
    postService.prototype.newCommentReport = function (data) {
        return this.commentUseCase.report(data);
    };
    postService.prototype.addPostReport = function (id, data) {
        return this.postUseCase.editReport(id, data);
    };
    postService.prototype.addCommentReport = function (id, data) {
        return this.commentUseCase.editReport(id, data);
    };
    postService.prototype.checkPostReport = function (id, userId) {
        return this.postUseCase.checkReport(id, userId);
    };
    postService.prototype.checkCommentReport = function (id, userId) {
        return this.commentUseCase.checkReport(id, userId);
    };
    postService.prototype.getAllReports = function () {
        return this.postUseCase.getAllReports();
    };
    return postService;
}());
exports.default = postService;
//# sourceMappingURL=postService.js.map