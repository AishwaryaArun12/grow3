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
exports.userController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtSecret = process.env.JWT_SECRET;
var fs_1 = require("fs");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var userController = /** @class */ (function () {
    function userController(userService) {
        this.UserService = userService;
    }
    userController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, email, password, userType, user, newUser, createdUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password, userType = _a.userType;
                        return [4 /*yield*/, this.UserService.getUserByEmail(email)];
                    case 1:
                        user = _b.sent();
                        if (!user) return [3 /*break*/, 5];
                        if (!user.verified) return [3 /*break*/, 2];
                        res.status(409).json({ data: 'User already exists', id: user._id });
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.UserService.sendOtp(email)];
                    case 3:
                        _b.sent();
                        res.status(409).json({ data: 'User already exists but not verified', id: user._id });
                        _b.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        newUser = { name: name_1, email: email, password: password, userType: userType };
                        return [4 /*yield*/, this.UserService.createUser(newUser)];
                    case 6:
                        createdUser = _b.sent();
                        res.status(201).json({ id: createdUser._id, data: 'user created successfully' });
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _b.sent();
                        console.error(error_1, 'error..............');
                        res.status(500).json({ error: 'Internal server error' });
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.sendOtp = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, user, result, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        id = (_a = req.headers['id']) === null || _a === void 0 ? void 0 : _a.toString();
                        console.log(id);
                        return [4 /*yield*/, this.UserService.getUser(id)];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, this.UserService.sendOtp(user.email)];
                    case 2:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.log(err_1);
                        res.status(500).json(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.headers['id'];
                        if (id == process.env.ADMIN) {
                            res.status(200).json({ id: id });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.UserService.getUser(id)];
                    case 1:
                        user = _a.sent();
                        res.status(200).json({ user: user, id: user._id });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(401).json(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.getUserFromId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.UserService.getUser(id)];
                    case 1:
                        user = _a.sent();
                        res.status(200).json({ user: user });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(500).json(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.checkOtp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, otp, isMatched, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.headers['id'].toString();
                        otp = req.body.otp;
                        return [4 /*yield*/, this.UserService.checkOtp(id, otp)];
                    case 1:
                        isMatched = _a.sent();
                        if (isMatched) {
                            res.status(200).json({ data: 'otp matched' });
                        }
                        else {
                            res.status(403).json({ data: 'Failed to match otp' });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.status(500).json(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, token, refreshToken, result, user, token, refreshToken, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = req.body, email = _a.email, password = _a.password;
                        if (email == process.env.EMAIL && password == process.env.PASSWORD) {
                            token = jsonwebtoken_1.default.sign({ id: process.env.ADMIN }, jwtSecret, { expiresIn: '5m' });
                            refreshToken = jsonwebtoken_1.default.sign({ id: process.env.ADMIN }, jwtSecret, { expiresIn: '7d' });
                            res.status(200).json({ res: 'verified', token: token, refreshToken: refreshToken, id: 'loginAdmin' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.UserService.login(email, password)];
                    case 1:
                        result = _b.sent();
                        if (!(result == false)) return [3 /*break*/, 2];
                        res.status(404).json({ res: 'invalid credentials' });
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(result == 'user blocked')) return [3 /*break*/, 3];
                        res.status(403).json({ res: 'user blocked' });
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(result == true)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.UserService.getUserByEmail(email)];
                    case 4:
                        user = _b.sent();
                        token = jsonwebtoken_1.default.sign({ id: user._id }, jwtSecret, { expiresIn: '5m' });
                        refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });
                        res.status(200).json({ res: 'verified', id: user._id, token: token, refreshToken: refreshToken });
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(200).json({ res: 'user not verified', id: result });
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_5 = _b.sent();
                        res.status(500).json(error_5);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.selectUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userType, id, user, error_6, result, token, refreshToken, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        _a = req.body, userType = _a.userType, id = _a.id;
                        user = void 0;
                        console.log(id, 'checking id');
                        if (!id) return [3 /*break*/, 6];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.UserService.getUser(id)];
                    case 2:
                        user = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _b.sent();
                        res.status(401).json({ res: 'user not found' });
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, this.UserService.selectUser(userType, user.email)];
                    case 5:
                        result = _b.sent();
                        token = jsonwebtoken_1.default.sign({ id: id }, jwtSecret, { expiresIn: '5m' });
                        refreshToken = jsonwebtoken_1.default.sign({ id: id }, jwtSecret, { expiresIn: '7d' });
                        res.status(200).json({ id: id, result: result, token: token, refreshToken: refreshToken });
                        return [3 /*break*/, 7];
                    case 6:
                        res.status(401).json({ res: 'user not found' });
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_7 = _b.sent();
                        res.status(500).json(error_7);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.forgotEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = req.body.email;
                        return [4 /*yield*/, this.UserService.getUserByEmail(email)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.status(200).json({ data: 'valid email', id: result._id });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        res.status(401).json({ data: 'Unregistered email' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.editPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var password, id, result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        password = req.body.password;
                        id = req.headers['id'].toString();
                        return [4 /*yield*/, this.UserService.editPassword(password, id)];
                    case 1:
                        result = _a.sent();
                        if (result == 'Updated successfully') {
                            res.status(200).json({ result: result });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        res.status(500).json({ data: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.blockUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.query.id;
                        if (!id) {
                            throw new Error("no id");
                        }
                        return [4 /*yield*/, this.UserService.editUser(id, { active: false })];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({ data: 'success' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _a.sent();
                        res.status(500).json(error_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.unblockUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.query.id;
                        if (!id) {
                            throw new Error("no id");
                        }
                        return [4 /*yield*/, this.UserService.editUser(id, { active: true })];
                    case 1:
                        _a.sent();
                        res.status(200).json({ data: 'success' });
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
    userController.prototype.editCover = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, coverPhoto, user, existingCover, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        id = req.headers['id'].toString();
                        coverPhoto = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                        return [4 /*yield*/, this.UserService.getUser(id)];
                    case 1:
                        user = _b.sent();
                        existingCover = user.coverPhoto;
                        if (!req.file) {
                            res.status(404).json({ message: 'no file selected' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.UserService.editUser(id, { coverPhoto: coverPhoto })];
                    case 2:
                        _b.sent();
                        if (!(existingCover === null || existingCover === void 0 ? void 0 : existingCover.startsWith('uploads'))) return [3 /*break*/, 4];
                        // Delete the existing cover photo from the 'uploads' directory
                        return [4 /*yield*/, fs_1.promises.unlink(existingCover)];
                    case 3:
                        // Delete the existing cover photo from the 'uploads' directory
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        res.json({ success: true, message: 'Image uploaded successfully.' });
                        return [3 /*break*/, 6];
                    case 5:
                        error_12 = _b.sent();
                        console.error(error_12);
                        res.status(500).json({ success: false, message: 'Internal Server Error' });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.editImg = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, profileImg, user, existingImg, error_13;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        id = req.headers['id'].toString();
                        profileImg = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                        return [4 /*yield*/, this.UserService.getUser(id)];
                    case 1:
                        user = _b.sent();
                        existingImg = user.profileImg;
                        if (!req.file) {
                            res.status(404).json({ message: 'no file selected' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.UserService.editUser(id, { profileImg: profileImg })];
                    case 2:
                        _b.sent();
                        if (!existingImg.startsWith('uploads')) return [3 /*break*/, 4];
                        return [4 /*yield*/, fs_1.promises.unlink(existingImg)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        res.json({ success: true, message: 'Image uploaded successfully.' });
                        return [3 /*break*/, 6];
                    case 5:
                        error_13 = _b.sent();
                        console.error(error_13);
                        res.status(500).json({ success: false, message: 'Internal Server Error' });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.editProfile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.headers['id'].toString();
                        return [4 /*yield*/, this.UserService.editUser(id, req.body)];
                    case 1:
                        _a.sent();
                        res.json({ success: true, message: 'Profile uploaded successfully.' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_14 = _a.sent();
                        console.error(error_14);
                        res.status(500).json({ success: false, message: 'Internal Server Error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.editConnection = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, requestId, unfollowId, confirmId, takeId, error_15;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 13, , 14]);
                        _a = req.body, userId = _a.userId, requestId = _a.requestId, unfollowId = _a.unfollowId, confirmId = _a.confirmId, takeId = _a.takeId;
                        if (!requestId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.UserService.editConnection(userId, { $push: { requests: requestId } })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.UserService.editConnection(requestId, { $push: { pendings: userId } })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 3:
                        if (!unfollowId) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.UserService.editConnection(userId, { $push: { pendings: unfollowId }, $pull: { followers: unfollowId } })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.UserService.editConnection(unfollowId, { $push: { requests: userId }, $pull: { followers: userId } })];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 6:
                        if (!confirmId) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.UserService.editConnection(userId, { $push: { followers: confirmId }, $pull: { pendings: confirmId } })];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.UserService.editConnection(confirmId, { $push: { followers: userId }, $pull: { requests: userId } })];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 9:
                        if (!takeId) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.UserService.editConnection(userId, { $pull: { requests: takeId } })];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, this.UserService.editConnection(takeId, { $pull: { pendings: userId } })];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12:
                        res.json({ success: true, message: 'Connection edited successfully.' });
                        return [3 /*break*/, 14];
                    case 13:
                        error_15 = _b.sent();
                        console.error(error_15);
                        res.status(500).json({ success: false, message: 'Internal Server Error' });
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.getAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.UserService.getAllUsers()];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({ users: result });
                        return [3 /*break*/, 3];
                    case 2:
                        error_16 = _a.sent();
                        res.status(500).json({ success: false, message: 'Internal Server Error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.razorpay = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orderId, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.UserService.razorpay(req.body.amt)];
                    case 1:
                        orderId = _a.sent();
                        res.status(200).json({ orderId: orderId });
                        return [3 /*break*/, 3];
                    case 2:
                        error_17 = _a.sent();
                        res.status(500).json(error_17);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return userController;
}());
exports.userController = userController;
//# sourceMappingURL=userController.js.map