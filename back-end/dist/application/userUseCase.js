"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userUseCase = /** @class */ (function () {
    function userUseCase(user) {
        this.userRepository = user;
    }
    userUseCase.prototype.createUser = function (user) {
        return this.userRepository.createUser(user);
    };
    userUseCase.prototype.getUser = function (id) {
        return this.userRepository.getUser(id);
    };
    userUseCase.prototype.getUserByEmail = function (email) {
        return this.userRepository.getUserByEmail(email);
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
    userUseCase.prototype.selectUser = function (userType, email) {
        return this.userRepository.selectUser(userType, email);
    };
    userUseCase.prototype.editPassword = function (password, id) {
        return this.userRepository.editPassword(password, id);
    };
    userUseCase.prototype.editUser = function (id, editinfo) {
        return this.userRepository.editUser(id, editinfo);
    };
    userUseCase.prototype.editConnection = function (id, editinfo) {
        return this.userRepository.editConnection(id, editinfo);
    };
    userUseCase.prototype.getAllUsers = function () {
        return this.userRepository.getAllUser();
    };
    userUseCase.prototype.razorpay = function (amt) {
        return this.userRepository.razorPost(amt);
    };
    return userUseCase;
}());
exports.default = userUseCase;
//# sourceMappingURL=userUseCase.js.map