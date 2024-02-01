"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var fs_1 = __importStar(require("fs"));
var postController = /** @class */ (function () {
    function postController(post) {
        this.postService = post;
    }
    postController.prototype.create = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, description, file, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.headers['id'].toString();
                        description = req.body.description;
                        file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                        return [4 /*yield*/, this.postService.create({ userId: id, description: description, media: file, time: new Date() })];
                    case 1:
                        result = _b.sent();
                        res.status(200).json({ message: 'Post created successfully', result: result });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.getAllPosts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var page, skip, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        page = parseInt(req.params.page);
                        skip = parseInt(req.params.skip);
                        ;
                        return [4 /*yield*/, this.postService.getAllPosts(page, skip)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({ message: 'Posts retrieved successfully', posts: result });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).json(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, data, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, id = _a.id, data = _a.data;
                        return [4 /*yield*/, this.postService.edit(id, data)];
                    case 1:
                        _b.sent();
                        res.status(200).json({ message: 'Post edited successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        res.status(500).json(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.editPost = function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, description, id, ePostImg_1, file, data, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _c = req.body, description = _c.description, id = _c.id, ePostImg_1 = _c.ePostImg;
                        file = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : ePostImg_1;
                        data = { description: description, media: file };
                        return [4 /*yield*/, this.postService.editPost(id, data)];
                    case 1:
                        _d.sent();
                        fs_1.promises.access(ePostImg_1, fs_1.default.constants.F_OK)
                            .then(function () {
                            fs_1.promises.unlink(ePostImg_1).then(function (res) { return console.log('deleted path successfull..'); }).catch(function (err) { return console.log(err, 'error'); });
                        }).catch(function (err) {
                            console.log(err, 'getting error when access');
                        });
                        res.status(200).json({ message: 'Post edited successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _d.sent();
                        console.log(error_4);
                        res.status(500).json(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, img, up, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        id = req.params.id;
                        img = req.params.img;
                        up = req.params.up;
                        return [4 /*yield*/, this.postService.delete(id)];
                    case 1:
                        _a.sent();
                        if (!(up != 'up')) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs_1.promises.unlink(up + '/' + img)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        res.status(200).json({ message: 'Post deleted successfully' });
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        res.status(500).json(error_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.addLike = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, postId, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.headers['id'].toString();
                        postId = req.body.id;
                        return [4 /*yield*/, this.postService.edit(postId, { likes: id })];
                    case 1:
                        _a.sent();
                        res.status(200).json({ message: 'Like recorded successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        res.status(500).json(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.removeLike = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, postId, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.headers['id'].toString();
                        postId = req.body.id;
                        return [4 /*yield*/, this.postService.removeLike(postId, { likes: id })];
                    case 1:
                        _a.sent();
                        res.status(200).json({ message: 'Like recorded successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        res.status(500).json(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.addComment = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, postId, comment, comments, response, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = (_a = req.headers['id']) === null || _a === void 0 ? void 0 : _a.toString();
                        postId = req.body.id;
                        comment = req.body.comment;
                        comments = { userId: id, comment: comment, time: new Date() };
                        return [4 /*yield*/, this.postService.addComment(postId, comments)];
                    case 1:
                        response = _b.sent();
                        if (response) {
                            res.status(200).json({ message: 'comment recorded successfully', response: response });
                        }
                        else {
                            throw new Error("comment not recorded successfully");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _b.sent();
                        res.status(500).json(error_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.addReply = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, commentId, userId, mention, reply, time, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, commentId = _a.commentId, userId = _a.userId, mention = _a.mention, reply = _a.reply, time = _a.time;
                        return [4 /*yield*/, this.postService.addCommentReply(commentId, { userId: userId, mention: mention, reply: reply, time: time })];
                    case 1:
                        _b.sent();
                        res.status(200).json({ message: 'reply added successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _b.sent();
                        res.status(500).json({ message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.editComment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, data, result, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, id = _a.id, data = _a.data;
                        return [4 /*yield*/, this.postService.editComment(id, data)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json({ message: 'Post edited successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _b.sent();
                        res.status(500).json(error_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.deleteComment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.postService.deleteComment(id)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({ message: 'Post comment removed successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _a.sent();
                        res.status(500).json(error_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.editReplyComment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, commentId, replyId, text, result, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, commentId = _a.commentId, replyId = _a.replyId, text = _a.text;
                        return [4 /*yield*/, this.postService.editCommentReply(commentId, replyId, text)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json({ message: 'reply edited successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _b.sent();
                        res.status(500).json(error_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.deleteReplyComment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, commentId, replyId, result, error_13;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, commentId = _a.commentId, replyId = _a.replyId;
                        return [4 /*yield*/, this.postService.removeCommentReply(commentId, replyId)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json({ message: 'reply edited successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_13 = _b.sent();
                        res.status(500).json(error_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.likeComment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, userId, error_14;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, id = _a.id, userId = _a.userId;
                        return [4 /*yield*/, this.postService.like(id, userId)];
                    case 1:
                        _b.sent();
                        res.status(200).json({ message: 'Comment edited successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_14 = _b.sent();
                        res.status(500).json({ message: "Internal server error " });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.report = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, reportFor, reason, itemId, userId, result, result, error_15;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 15, , 16]);
                        _a = req.body, reportFor = _a.reportFor, reason = _a.reason, itemId = _a.itemId, userId = _a.userId;
                        if (!(reportFor == 'post')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.postService.checkPostReport(itemId, userId)];
                    case 1:
                        result = _b.sent();
                        if (!(result == 'User already reported')) return [3 /*break*/, 2];
                        res.status(201).json({ message: 'Reported already' });
                        return [2 /*return*/];
                    case 2:
                        if (!(result == 'post deleted')) return [3 /*break*/, 3];
                        res.status(201).json({ message: 'Reported successfully' });
                        return [2 /*return*/];
                    case 3:
                        if (!(result == 'user not exist')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.postService.addPostReport(itemId, { details: { userId: userId, reason: reason, time: new Date() } })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.postService.newPostReport({ postId: itemId, details: [{ userId: userId, reason: reason, time: new Date() }] })];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [3 /*break*/, 14];
                    case 8: return [4 /*yield*/, this.postService.checkCommentReport(itemId, userId)];
                    case 9:
                        result = _b.sent();
                        if (!(result == 'User already reported')) return [3 /*break*/, 10];
                        res.status(201).json({ message: 'Reported already' });
                        return [2 /*return*/];
                    case 10:
                        if (!(result == 'user not exist')) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.postService.addCommentReport(itemId, { details: { userId: userId, reason: reason, time: new Date() } })];
                    case 11:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, this.postService.newCommentReport({ commentId: itemId, details: [{ userId: userId, reason: reason, time: new Date() }] })];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14:
                        res.status(201).json({ message: 'Reported successfully' });
                        return [3 /*break*/, 16];
                    case 15:
                        error_15 = _b.sent();
                        res.status(500).json({ message: "Internal server error " });
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    postController.prototype.getAllReports = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.postService.getAllReports()];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({ result: result });
                        return [3 /*break*/, 3];
                    case 2:
                        error_16 = _a.sent();
                        res.status(500).json({ error: error_16 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return postController;
}());
exports.default = postController;
//# sourceMappingURL=postController.js.map