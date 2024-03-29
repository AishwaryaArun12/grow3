"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentReports = exports.PostReports = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var detailSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users' },
    reason: { type: String },
    time: { type: Date },
});
var PostReportsSchema = new mongoose_1.Schema({
    postId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Post' },
    details: [detailSchema],
});
var CommentReportsSchema = new mongoose_1.Schema({
    commentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Comments' },
    details: [detailSchema],
});
exports.PostReports = mongoose_1.default.model('PostReports', PostReportsSchema);
exports.CommentReports = mongoose_1.default.model('CommentReports', CommentReportsSchema);
//# sourceMappingURL=reportModel.js.map