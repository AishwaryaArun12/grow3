import { Router } from "express";
import postRepository from "../../infrastructure/repository/postRepository";
import commentRepository from "../../infrastructure/repository/commentRepository";
import postUseCase from "../../application/postUseCase";
import postService from "../../domain/services/postService";
import postController from "../../controllers/postController";
import commentUseCase from "../../application/commentUseCase";
import multer from "multer";

const PostRepository = new postRepository();
const CommentRepository = new commentRepository;
const PostUseCase = new postUseCase(PostRepository);
const CommentUseCase = new commentUseCase(CommentRepository)
const PostService = new postService(PostUseCase,CommentUseCase);
const PostController = new postController(PostService);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage: storage });
 
const postRouter = Router();

postRouter.post('/create', upload.single('file'), (req,res)=> PostController.create(req,res));
postRouter.get('/getallposts/:page/:skip', (req,res)=> PostController.getAllPosts(req,res));
postRouter.patch('/edit', (req,res)=> PostController.edit(req,res));
postRouter.patch('/edit_post',upload.single('file'), (req,res)=> PostController.editPost(req,res));
postRouter.delete('/delete/:id/:up/:img', (req,res)=> PostController.delete(req,res));
postRouter.patch('/add_like', (req,res)=> PostController.addLike(req,res));
postRouter.patch('/remove_like', (req,res)=> PostController.removeLike(req,res));
postRouter.patch('/add_comment' ,(req,res)=> PostController.addComment(req,res));
postRouter.patch('/add_reply', (req, res)=> PostController.addReply(req,res));
postRouter.patch('/edit_comment', (req, res)=> PostController.editComment(req,res));
postRouter.delete('/delete_comment/:id', (req, res)=> PostController.deleteComment(req,res))
postRouter.patch('/edit_comment_reply', (req,res)=> PostController.editReplyComment(req,res));
postRouter.patch('/delete_reply', (req,res)=> PostController.deleteReplyComment(req,res));
postRouter.patch('/comment_like', (req,res)=> PostController.likeComment(req,res))
postRouter.post('/report', (req,res)=> PostController.report(req,res));

export default postRouter