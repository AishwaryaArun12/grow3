"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventService = /** @class */ (function () {
    function eventService(event) {
        this.eventUseCase = event;
    }
    eventService.prototype.create = function (event) {
        return this.eventUseCase.create(event);
    };
    eventService.prototype.edit = function (id, data) {
        return this.eventUseCase.edit(id, data);
    };
    eventService.prototype.delete = function (id) {
        return this.eventUseCase.delete(id);
    };
    eventService.prototype.getAllEvents = function () {
        return this.eventUseCase.getAllEvents();
    };
    eventService.prototype.getEvent = function (data) {
        return this.eventUseCase.getEvent(data);
    };
    eventService.prototype.removeAttendee = function (id, data) {
        return this.eventUseCase.removeAttendee(id, data);
    };
    eventService.prototype.editEvent = function (id, data) {
        return this.eventUseCase.editEvent(id, data);
    };
    return eventService;
}());
exports.default = eventService;
//# sourceMappingURL=eventService.js.map