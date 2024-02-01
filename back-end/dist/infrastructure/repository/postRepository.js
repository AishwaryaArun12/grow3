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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var postModel_1 = require("../../infrastructure/database/postModel");
var userModel_1 = __importDefault(require("../../infrastructure/database/userModel"));
var reportModel_1 = require("../../infrastructure/database/reportModel");
var postRepository = /** @class */ (function () {
    function postRepository() {
    }
    postRepository.prototype.create = function (comment) {
        return __awaiter(this, void 0, void 0, function () {
            var newComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postModel_1.Post.create(comment)];
                    case 1:
                        newComment = _a.sent();
                        return [2 /*return*/, newComment.toObject()];
                }
            });
        });
    };
    postRepository.prototype.edit = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var update, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, postModel_1.Post.findOneAndUpdate({ _id: id }, { $push: data }, { new: true })];
                    case 1:
                        update = _a.sent();
                        return [2 /*return*/, update];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postRepository.prototype.editPost = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var update, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(id, 'id');
                        return [4 /*yield*/, postModel_1.Post.findOneAndUpdate({ _id: id }, { $set: data }, { new: true })];
                    case 1:
                        update = _a.sent();
                        return [2 /*return*/, update];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, postModel_1.Post.findByIdAndDelete(id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, reportModel_1.PostReports.findOneAndDelete({ postId: id })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    postRepository.prototype.getAllPosts = function (page, skip) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b, _c, error_4;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 3, , 4]);
                        _b = (_a = postModel_1.Post).find;
                        _d = {};
                        _c = 'userId';
                        _e = {};
                        return [4 /*yield*/, userModel_1.default.find({ active: true }).distinct('_id')];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_d[_c] = (_e.$in = _f.sent(), _e), _d)]).populate('userId').populate({
                            path: 'comments',
                            options: { sort: { time: 'desc' } },
                            populate: [
                                {
                                    path: 'userId',
                                },
                                {
                                    path: 'reply.userId',
                                },
                                {
                                    path: 'reply.mention',
                                },
                            ],
                        }).sort({ time: -1 }).skip(skip).limit(page * 2)];
                    case 2:
                        result = _f.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_4 = _f.sent();
                        console.log(error_4);
                        return [2 /*return*/, error_4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    postRepository.prototype.getPost = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, postModel_1.Post.find({ userId: id }).populate('userId').populate({
                                path: 'comments',
                                options: { sort: { time: 'desc' } },
                                populate: [
                                    {
                                        path: 'userId',
                                    },
                                    {
                                        path: 'reply.userId',
                                    },
                                    {
                                        path: 'reply.mention',
                                    },
                                ],
                            }).sort({ time: -1 })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, error_5];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postRepository.prototype.removeLike = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, postModel_1.Post.findOneAndUpdate({ _id: id }, { $pull: data }, { new: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postRepository.prototype.report = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, reportModel_1.PostReports.create(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postRepository.prototype.editReport = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, reportModel_1.PostReports.findOneAndUpdate({ postId: id }, { $push: data })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    postRepository.prototype.checkReport = function (id, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, checkUser, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, reportModel_1.PostReports.findOne({ postId: id })];
                    case 1:
                        res = _a.sent();
                        if (!res) return [3 /*break*/, 8];
                        return [4 /*yield*/, reportModel_1.PostReports.findOne({ postId: id, 'details.userId': userId })];
                    case 2:
                        checkUser = _a.sent();
                        if (!checkUser) return [3 /*break*/, 3];
                        return [2 /*return*/, 'User already reported'];
                    case 3:
                        console.log(res.details.length, 'nooooooooooo');
                        if (!(res.details.length >= 2)) return [3 /*break*/, 6];
                        return [4 /*yield*/, reportModel_1.PostReports.findOneAndDelete({ postId: id })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, postModel_1.Post.findOneAndDelete({ _id: id })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, 'post deleted'];
                    case 6: return [2 /*return*/, "user not exist"];
                    case 7: return [3 /*break*/, 9];
                    case 8: throw new Error("not exist");
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_9 = _a.sent();
                        console.log(error_9, 'error');
                        return [2 /*return*/, false];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    postRepository.prototype.getAllReports = function () {
        return __awaiter(this, void 0, void 0, function () {
            var postRes, commentRes, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, reportModel_1.PostReports.find().populate({
                            path: 'postId',
                            populate: {
                                path: 'userId',
                                model: 'Users',
                            },
                        }).populate({
                            path: 'details.userId',
                            model: 'Users',
                        })];
                    case 1:
                        postRes = _a.sent();
                        return [4 /*yield*/, reportModel_1.CommentReports.find().populate({
                                path: 'commentId',
                                populate: {
                                    path: 'userId',
                                    model: 'Users',
                                },
                            }).populate({
                                path: 'details.userId',
                                model: 'User',
                            })];
                    case 2:
                        commentRes = _a.sent();
                        res = __spreadArray(__spreadArray([], postRes, true), commentRes, true);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return postRepository;
}());
exports.default = postRepository;
//# sourceMappingURL=postRepository.js.map