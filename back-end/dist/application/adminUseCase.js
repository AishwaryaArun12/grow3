"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adminUseCase = /** @class */ (function () {
    function adminUseCase(admin) {
        this.adminRepository = admin;
    }
    adminUseCase.prototype.getAllUser = function () {
        return this.adminRepository.getAllUser();
    };
    return adminUseCase;
}());
exports.default = adminUseCase;
//# sourceMappingURL=adminUseCase.js.map