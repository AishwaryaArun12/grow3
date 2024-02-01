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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commentModel_1 = __importDefault(require("../../infrastructure/database/commentModel"));
var reportModel_1 = require("../../infrastructure/database/reportModel");
var commentRepository = /** @class */ (function () {
    function commentRepository() {
    }
    commentRepository.prototype.create = function (comment) {
        return __awaiter(this, void 0, void 0, function () {
            var newComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, commentModel_1.default.create(comment)];
                    case 1:
                        newComment = _a.sent();
                        return [2 /*return*/, newComment.toObject()];
                }
            });
        });
    };
    commentRepository.prototype.edit = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, commentModel_1.default.findOneAndUpdate({ _id: id }, { $set: data }, { new: true })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    commentRepository.prototype.addReply = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, commentModel_1.default.findOneAndUpdate({ _id: id }, { $push: { reply: data } }, { new: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    commentRepository.prototype.removeReply = function (id, replyId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, commentModel_1.default.findOneAndUpdate({ _id: id }, { $pull: { reply: { _id: replyId } } }, { new: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    commentRepository.prototype.editReply = function (id, replyId, updatedText) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedComment, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, commentModel_1.default.findOneAndUpdate({ _id: id, 'reply._id': replyId }, { $set: { 'reply.$.reply': updatedText } }, { new: true })];
                    case 1:
                        updatedComment = _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    commentRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, commentModel_1.default.findByIdAndDelete(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    commentRepository.prototype.like = function (id, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, commentModel_1.default.findOne({
                                _id: id,
                                likes: { $in: [userId] },
                            })];
                    case 1:
                        result = _a.sent();
                        console.log(id, userId, result, 'zzzzzzzzzzzzzzzzzz');
                        if (!result) return [3 /*break*/, 3];
                        return [4 /*yield*/, commentModel_1.default.findOneAndUpdate({ _id: id }, { $pull: { likes: userId } })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, commentModel_1.default.findOneAndUpdate({ _id: id }, { $push: { likes: userId } })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, true];
                    case 6:
                        error_6 = _a.sent();
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    commentRepository.prototype.report = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, reportModel_1.CommentReports.create(data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    commentRepository.prototype.editReport = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, reportModel_1.CommentReports.findOneAndUpdate({ commentId: id }, { $push: { details: data } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    commentRepository.prototype.checkReport = function (id, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, checkUser, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, reportModel_1.CommentReports.findOne({ commentId: id })];
                    case 1:
                        res = _a.sent();
                        if (!res) return [3 /*break*/, 7];
                        return [4 /*yield*/, reportModel_1.CommentReports.findOne({ 'details.userId': userId })];
                    case 2:
                        checkUser = _a.sent();
                        if (!checkUser) return [3 /*break*/, 5];
                        if (!(checkUser.details.length >= 2)) return [3 /*break*/, 4];
                        return [4 /*yield*/, reportModel_1.CommentReports.findOneAndDelete({ postId: id })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, 'post deleted'];
                    case 4: return [2 /*return*/, 'User already reported'];
                    case 5: return [2 /*return*/, "user not exist"];
                    case 6: return [3 /*break*/, 8];
                    case 7: throw new Error("not exist");
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_9 = _a.sent();
                        return [2 /*return*/, false];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return commentRepository;
}());
exports.default = commentRepository;
//# sourceMappingURL=commentRepository.js.map