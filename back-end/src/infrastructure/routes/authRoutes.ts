import {Router} from 'express';
import { userController } from '../../controllers/userController';
import  {userService} from '../../domain/services/userServices'
import { userRepository } from '../repository/userRepository';
import userUseCase from '../../application/userUseCase';
import {jwtAuth, newAccessToken } from '../../infrastructure/middlewares/jwtAuth';


const UserRepository = new userRepository();
const user_useCase = new userUseCase(UserRepository);
const UserService = new userService(user_useCase);
const UserController = new userController(UserService);

const authRouter = Router();

authRouter.post('/newUser', (req ,res)=> UserController.createUser(req,res));
authRouter.get('/sendOtp', (req ,res)=> UserController.sendOtp(req,res))
authRouter.get('/getUser',(req  ,res)=> UserController.getUser(req,res))
authRouter.post('/checkOtp',(req,res)=> UserController.checkOtp(req,res));
authRouter.post('/login', (req , res)=> UserController.login(req,res))
authRouter.post('/selectuser',(req,res)=> UserController.selectUser(req,res));
authRouter.post('/newAccessToken', newAccessToken)
authRouter.post('/forgotemail',(req,res)=> UserController.forgotEmail(req,res))
authRouter.post('/changepassword', (req,res)=> UserController.editPassword(req,res));
authRouter.get('/block', (req,res)=> UserController.blockUser(req,res));
authRouter.get('/unblock', (req,res)=> UserController.unblockUser(req,res));
export default authRouter;