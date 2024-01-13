"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userUseCase = /** @class */ (function () {
    function userUseCase(user) {
        this.userRepository = user;
    }
    userUseCase.prototype.createUser = function (user) {
        return this.userRepository.createUser(user);
    };
    userUseCase.prototype.getUser = function (email) {
        return this.userRepository.getUser(email);
    };
    userUseCase.prototype.sendOtp = function (email) {
        return this.userRepository.sendOtp(email);
    };
    userUseCase.prototype.checkOtp = function (email, otp) {
        return this.userRepository.checkOtp(email, otp);
    };
    userUseCase.prototype.login = function (email, password) {
        return this.userRepository.login(email, password);
    };
    userUseCase.prototype.selectUser = function (userType, email, name) {
        return this.userRepository.selectUser(userType, email, name);
    };
    return userUseCase;
}());
exports.default = userUseCase;
//# sourceMappingURL=userUseCase.js.map