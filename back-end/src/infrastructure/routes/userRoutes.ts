import {Router} from 'express';
import { userController } from '../../controllers/userController';
import  {userService} from '../../domain/services/userService'
import { userRepository } from '../repository/userRepository';
import userUseCase from '../../application/userUseCase';

const UserRepository = new userRepository();

const user_useCase = new userUseCase(UserRepository);
const UserService = new userService(user_useCase);
export const UserController = new userController(UserService);



const userRouter = Router();

userRouter.post('/uploadcover',  (req, res) => UserController.editCover(req, res));
userRouter.post('/uploadimg',  (req, res) => UserController.editImg(req, res));
userRouter.patch('/editProfile', (req,res)=> UserController.editProfile(req,res));

userRouter.patch('/edit_connection' ,(req,res)=> UserController.editConnection(req,res));
userRouter.get('/get_all_users', (req,res)=> UserController.getAllUsers(req,res));
userRouter.post('/razorpay', (req,res)=> UserController.razorpay(req,res));

export default userRouter

