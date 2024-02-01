"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var eventRepository_1 = __importDefault(require("../../infrastructure/repository/eventRepository"));
var eventUseCase_1 = __importDefault(require("../../application/eventUseCase"));
var eventService_1 = __importDefault(require("../../domain/services/eventService"));
var eventController_1 = __importDefault(require("../../controllers/eventController"));
var multer_1 = __importDefault(require("multer"));
var EventRepository = new eventRepository_1.default();
var EventUseCase = new eventUseCase_1.default(EventRepository);
var EventService = new eventService_1.default(EventUseCase);
var EventController = new eventController_1.default(EventService);
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
var eventRouter = (0, express_1.Router)();
eventRouter.post('/create', upload.single('file'), function (req, res) { return EventController.create(req, res); });
eventRouter.get('/getallevents', function (req, res) { return EventController.getAllEvents(req, res); });
eventRouter.get('/user_event/:userId', function (req, res) { return EventController.getEvent(req, res); });
eventRouter.get('/:_id', function (req, res) { return EventController.getEvent(req, res); });
eventRouter.patch('/edit', function (req, res) { return EventController.edit(req, res); });
eventRouter.patch('/edit_event', upload.single('file'), function (req, res) { return EventController.editEvent(req, res); });
eventRouter.delete('/delete/:id/:up/:img', function (req, res) { return EventController.delete(req, res); });
eventRouter.patch('/add_attendee', function (req, res) { return EventController.addAttendee(req, res); });
eventRouter.patch('/remove_attendee', function (req, res) { return EventController.removeAttendee(req, res); });
exports.default = eventRouter;
//# sourceMappingURL=eventRoutes.js.map