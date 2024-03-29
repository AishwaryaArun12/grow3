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
exports.userRepository = void 0;
var userModel_1 = __importDefault(require("../database/userModel"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var otp_generator_1 = __importDefault(require("otp-generator"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var razorpay_1 = __importDefault(require("razorpay"));
var transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});
var razorpay = new razorpay_1.default({
    key_id: process.env.RAZORKEY,
    key_secret: process.env.RAZORSECRET,
});
var userRepository = /** @class */ (function () {
    function userRepository() {
    }
    userRepository.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var saltRounds, hash, createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        saltRounds = 10;
                        return [4 /*yield*/, bcrypt_1.default.hash(user.password, saltRounds)];
                    case 1:
                        hash = _a.sent();
                        user.password = hash;
                        return [4 /*yield*/, userModel_1.default.create(user)];
                    case 2:
                        createdUser = _a.sent();
                        return [2 /*return*/, createdUser.toObject()];
                }
            });
        });
    };
    userRepository.prototype.sendOtp = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var otp, otpExpire, toEmail, mailOptions, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        otp = otp_generator_1.default.generate(6, { digits: true, specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false });
                        otpExpire = new Date(Date.now() + 60 * 1000);
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ email: email }, { otp: otp, otpExpire: otpExpire })];
                    case 1:
                        _a.sent();
                        console.log(otp, 'otp', otpExpire);
                        toEmail = email;
                        mailOptions = {
                            from: 'grow345678@gmail.com',
                            to: toEmail,
                            subject: 'OTP for registration in grow3',
                            html: "<p>Hai, </p><p> this OTP only valid for 5 minutes </p><p>".concat(otp, "</p><p>with regards,</p><p> grow3</p>")
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.error('Error sending mail : ', error);
                                result = 'Error in sending email';
                            }
                            else {
                                result = 'Email send successfully';
                            }
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    userRepository.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findById(id).populate('pendings').populate('requests').populate('followers').populate('primium.subscriptionId')];
                    case 1:
                        user = (_a.sent());
                        return [2 /*return*/, user];
                }
            });
        });
    };
    userRepository.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    userRepository.prototype.checkOtp = function (id, otp) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!(otp == user.otp && user.otpExpire > new Date(Date.now()))) return [3 /*break*/, 3];
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ email: user.email }, { verified: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    userRepository.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, false];
                        }
                        else if (!user.verified) {
                            return [2 /*return*/, user._id];
                        }
                        else if (!user.active) {
                            return [2 /*return*/, 'user blocked'];
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    userRepository.prototype.selectUser = function (userType, email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ email: email }, { userType: userType }, { new: true })];
                    case 2:
                        update = _a.sent();
                        return [2 /*return*/, update._id];
                    case 3: return [2 /*return*/, 'user not found'];
                }
            });
        });
    };
    userRepository.prototype.editPassword = function (password, id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ id: id }, { $set: { password: password } }, { new: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, 'Updated successfully'];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, 'Invalid userId'];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userRepository.prototype.editUser = function (_id, editinfo) {
        return __awaiter(this, void 0, void 0, function () {
            var edit, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: _id }, { $set: editinfo }, { new: true, upsert: true })];
                    case 1:
                        edit = _a.sent();
                        return [2 /*return*/, edit];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, 'Invalid userId'];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userRepository.prototype.editConnection = function (_id, editinfo) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1.default.findOneAndUpdate({ _id: _id }, editinfo, { new: true })];
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
    userRepository.prototype.getAllUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1.default.find({ active: true })];
                    case 1:
                        allUsers = _a.sent();
                        return [2 /*return*/, allUsers];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userRepository.prototype.razorPost = function (amt) {
        return __awaiter(this, void 0, void 0, function () {
            var amount, options, order, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amount = amt;
                        options = {
                            amount: amount * 100, // Razorpay expects the amount in paise (100 paise = 1 INR)
                            currency: 'INR',
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, razorpay.orders.create(options)];
                    case 2:
                        order = _a.sent();
                        return [2 /*return*/, order.id];
                    case 3:
                        error_5 = _a.sent();
                        console.error('Error creating order:', error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return userRepository;
}());
exports.userRepository = userRepository;
//# sourceMappingURL=userRepository.js.map