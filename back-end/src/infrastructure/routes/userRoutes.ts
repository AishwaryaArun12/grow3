import {Router} from 'express';
import { userController } from '../../controllers/userController';
import  {userService} from '../../domain/services/userService'
import { userRepository } from '../repository/userRepository';
import userUseCase from '../../application/userUseCase';
import multer from 'multer';



const UserRepository = new userRepository();

const user_useCase = new userUseCase(UserRepository);
const UserService = new userService(user_useCase);
export const UserController = new userController(UserService);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

const userRouter = Router();

userRouter.post('/uploadcover', upload.single('profileImage'), (req, res) => UserController.editCover(req, res));
userRouter.post('/uploadimg', upload.single('profileImage'), (req, res) => UserController.editImg(req, res));
userRouter.patch('/editProfile', (req,res)=> UserController.editProfile(req,res));

userRouter.patch('/edit_connection' ,(req,res)=> UserController.editConnection(req,res));
userRouter.get('/get_all_users', (req,res)=> UserController.getAllUsers(req,res));
userRouter.post('/razorpay', (req,res)=> UserController.razorpay(req,res));

export default userRouter

