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
exports.newAccessToken = exports.jwtAuth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userModel_1 = __importDefault(require("../database/userModel"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var jwtSecret = process.env.JWT_SECRET;
var jwtAuth = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded, parsedToken, userId, user, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.toString().split(' ')[1];
                if (!token) {
                    res.status(401).json({ message: 'Unauthorised' });
                    return [2 /*return*/];
                }
                decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
                parsedToken = decoded;
                userId = parsedToken.id;
                if (userId == process.env.ADMIN) {
                    next();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _b.sent();
                if (user) {
                    req.user = user._id;
                    next();
                }
                else {
                    throw new Error("no user");
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.log('eeeeeeeeeeeee');
                res.status(401).json({ message: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.jwtAuth = jwtAuth;
var newAccessToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, decoded, parsedToken, userId, token, newRefreshToken, user, token, newRefreshToken, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.body.refreshToken;
                if (!refreshToken) {
                    res.status(500).json({ message: 'No token' });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                decoded = jsonwebtoken_1.default.verify(refreshToken, jwtSecret);
                parsedToken = decoded;
                userId = parsedToken.id;
                if (userId == process.env.ADMIN) {
                    token = jsonwebtoken_1.default.sign({ id: userId }, jwtSecret, { expiresIn: '5m' });
                    newRefreshToken = jsonwebtoken_1.default.sign({ id: userId }, jwtSecret, { expiresIn: '7d' });
                    res.status(200).json({ accessToken: token, refreshToken: newRefreshToken, id: userId });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 2:
                user = _a.sent();
                if (user) {
                    token = jsonwebtoken_1.default.sign({ id: userId }, jwtSecret, { expiresIn: '5m' });
                    newRefreshToken = jsonwebtoken_1.default.sign({ id: userId }, jwtSecret, { expiresIn: '7d' });
                    res.status(200).json({ accessToken: token, refreshToken: newRefreshToken, id: userId });
                }
                else {
                    throw new Error("sorry user not found");
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(401).json({ message: 'Unauthorized' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.newAccessToken = newAccessToken;
//# sourceMappingURL=jwtAuth.js.map