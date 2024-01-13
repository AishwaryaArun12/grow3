"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth2_1 = require("passport-google-oauth2");
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use(new passport_google_oauth2_1.Strategy({
    clientID: '201831658510-n0cr16kupf6bv0cua9s08ht8ldv9j2rv.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/callback',
    passReqToCallback: true,
}, function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));
exports.default = passport_1.default;
//# sourceMappingURL=passportConfig.js.map