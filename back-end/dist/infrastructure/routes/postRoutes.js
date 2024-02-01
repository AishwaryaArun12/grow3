"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var postRepository_1 = __importDefault(require("../../infrastructure/repository/postRepository"));
var commentRepository_1 = __importDefault(require("../../infrastructure/repository/commentRepository"));
var postUseCase_1 = __importDefault(require("../../application/postUseCase"));
var postService_1 = __importDefault(require("../../domain/services/postService"));
var postController_1 = __importDefault(require("../../controllers/postController"));
var commentUseCase_1 = __importDefault(require("../../application/commentUseCase"));
var multer_1 = __importDefault(require("multer"));
var PostRepository = new postRepository_1.default();
var CommentRepository = new commentRepository_1.default;
var PostUseCase = new postUseCase_1.default(PostRepository);
var CommentUseCase = new commentUseCase_1.default(CommentRepository);
var PostService = new postService_1.default(PostUseCase, CommentUseCase);
var PostController = new postController_1.default(PostService);
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
var postRouter = (0, express_1.Router)();
postRouter.post('/create', upload.single('file'), function (req, res) { return PostController.create(req, res); });
postRouter.get('/getallposts/:page/:skip', function (req, res) { return PostController.getAllPosts(req, res); });
postRouter.patch('/edit', function (req, res) { return PostController.edit(req, res); });
postRouter.patch('/edit_post', upload.single('file'), function (req, res) { return PostController.editPost(req, res); });
postRouter.delete('/delete/:id/:up/:img', function (req, res) { return PostController.delete(req, res); });
postRouter.patch('/add_like', function (req, res) { return PostController.addLike(req, res); });
postRouter.patch('/remove_like', function (req, res) { return PostController.removeLike(req, res); });
postRouter.patch('/add_comment', function (req, res) { return PostController.addComment(req, res); });
postRouter.patch('/add_reply', function (req, res) { return PostController.addReply(req, res); });
postRouter.patch('/edit_comment', function (req, res) { return PostController.editComment(req, res); });
postRouter.delete('/delete_comment/:id', function (req, res) { return PostController.deleteComment(req, res); });
postRouter.patch('/edit_comment_reply', function (req, res) { return PostController.editReplyComment(req, res); });
postRouter.patch('/delete_reply', function (req, res) { return PostController.deleteReplyComment(req, res); });
postRouter.patch('/comment_like', function (req, res) { return PostController.likeComment(req, res); });
postRouter.post('/report', function (req, res) { return PostController.report(req, res); });
postRouter.get('/get_all_reports', function (req, res) { return PostController.getAllReports(req, res); });
exports.default = postRouter;
//# sourceMappingURL=postRoutes.js.map