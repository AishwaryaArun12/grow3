"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subscriptionUseCase = /** @class */ (function () {
    function subscriptionUseCase(subscription) {
        this.subscriptionRepository = subscription;
    }
    subscriptionUseCase.prototype.create = function (data) {
        return this.subscriptionRepository.create(data);
    };
    subscriptionUseCase.prototype.edit = function (id, data) {
        return this.subscriptionRepository.edit(id, data);
    };
    subscriptionUseCase.prototype.delete = function (id) {
        return this.subscriptionRepository.delete(id);
    };
    subscriptionUseCase.prototype.getAll = function () {
        return this.subscriptionRepository.getAll();
    };
    return subscriptionUseCase;
}());
exports.default = subscriptionUseCase;
//# sourceMappingURL=subscriptionUseCase.js.map