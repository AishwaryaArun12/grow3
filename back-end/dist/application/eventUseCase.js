"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventUseCase = /** @class */ (function () {
    function eventUseCase(event) {
        this.eventRepository = event;
    }
    eventUseCase.prototype.create = function (event) {
        return this.eventRepository.create(event);
    };
    eventUseCase.prototype.edit = function (id, data) {
        return this.eventRepository.edit(id, data);
    };
    eventUseCase.prototype.delete = function (id) {
        return this.eventRepository.delete(id);
    };
    eventUseCase.prototype.getAllEvents = function () {
        return this.eventRepository.getAllEvents();
    };
    eventUseCase.prototype.getEvent = function (data) {
        return this.eventRepository.getEvent(data);
    };
    eventUseCase.prototype.removeAttendee = function (id, data) {
        return this.eventRepository.removeAttendee(id, data);
    };
    eventUseCase.prototype.editEvent = function (id, data) {
        return this.eventRepository.editEvent(id, data);
    };
    return eventUseCase;
}());
exports.default = eventUseCase;
//# sourceMappingURL=eventUseCase.js.map