"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subscriptionService = /** @class */ (function () {
    function subscriptionService(subscription) {
        this.subscriptionUseCase = subscription;
    }
    subscriptionService.prototype.create = function (data) {
        return this.subscriptionUseCase.create(data);
    };
    subscriptionService.prototype.edit = function (id, data) {
        return this.subscriptionUseCase.edit(id, data);
    };
    subscriptionService.prototype.delete = function (id) {
        return this.subscriptionUseCase.delete(id);
    };
    subscriptionService.prototype.getAll = function () {
        return this.subscriptionUseCase.getAll();
    };
    return subscriptionService;
}());
exports.default = subscriptionService;
//# sourceMappingURL=subscriptionService.js.map