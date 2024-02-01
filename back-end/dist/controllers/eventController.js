"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var eventController = /** @class */ (function () {
    function eventController(event) {
        this.eventService = event;
    }
    eventController.prototype.create = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var file, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                        return [4 /*yield*/, this.eventService.create(__assign(__assign({}, req.body), { media: file }))];
                    case 1:
                        result = _b.sent();
                        res.status(200).json({ message: 'Post created successfully', result: result });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        res.status(500).json(__assign({ message: 'Internal server error' }, error_1));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    eventController.prototype.getAllEvents = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.eventService.getAllEvents()];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({ message: 'Events retrieved successfully', events: result });
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
    eventController.prototype.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, data, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, id = _a.id, data = _a.data;
                        return [4 /*yield*/, this.eventService.edit(id, data)];
                    case 1:
                        _b.sent();
                        res.status(200).json({ message: 'Event edited successfully' });
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
    eventController.prototype.getEvent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.eventService.getEvent(req.params)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({ message: 'Event edited successfully', result: result });
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
    eventController.prototype.editEvent = function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, id, eEventImg_1, description, name_1, eventLink, startTime, endTime, userId, speakers, file, data, error_5;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _c = req.body, id = _c.id, eEventImg_1 = _c.eEventImg, description = _c.description, name_1 = _c.name, eventLink = _c.eventLink, startTime = _c.startTime, endTime = _c.endTime, userId = _c.userId, speakers = _c.speakers;
                        console.log(endTime, 'aaaaaaaaaaa');
                        file = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : eEventImg_1;
                        console.log(file, 'sssssss');
                        data = { description: description, media: file, name: name_1, eventLink: eventLink, startTime: startTime, endTime: endTime, userId: userId, speakers: speakers };
                        return [4 /*yield*/, this.eventService.editEvent(id, data)];
                    case 1:
                        _d.sent();
                        fs_1.promises.access(eEventImg_1, fs_1.default.constants.F_OK)
                            .then(function () {
                            fs_1.promises.unlink(eEventImg_1).then(function (res) { return console.log('deleted path successfull..'); }).catch(function (err) { return console.log(err, 'error'); });
                        }).catch(function (err) {
                            console.log(err, 'getting error when access');
                        });
                        res.status(200).json({ message: 'Event edited successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _d.sent();
                        console.log(error_5);
                        res.status(500).json(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    eventController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, img, up, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        id = req.params.id;
                        img = req.params.img;
                        up = req.params.up;
                        return [4 /*yield*/, this.eventService.delete(id)];
                    case 1:
                        _a.sent();
                        if (!(up != 'up')) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs_1.promises.unlink(up + '/' + img)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        res.status(200).json({ message: 'Event deleted successfully' });
                        return [3 /*break*/, 5];
                    case 4:
                        error_6 = _a.sent();
                        res.status(500).json(error_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    eventController.prototype.addAttendee = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, eventId, id, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, eventId = _a.eventId, id = _a.id;
                        return [4 /*yield*/, this.eventService.edit(eventId, { attendees: id })];
                    case 1:
                        _b.sent();
                        res.status(200).json({ message: 'Attendee recorded successfully' });
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _b.sent();
                        res.status(500).json(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    eventController.prototype.removeAttendee = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, eventId, id, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, eventId = _a.eventId, id = _a.id;
                        return [4 /*yield*/, this.eventService.removeAttendee(eventId, { attendees: id })];
                    case 1:
                        _b.sent();
                        res.status(200).json({ message: 'Attendee removed successfully' });
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
    return eventController;
}());
exports.default = eventController;
//# sourceMappingURL=eventController.js.map