import { Request, Response, response } from "express";
import { userService } from "domain/services/userService";
import Jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;
import { promises as fsPromises } from 'fs';
import dotenv from 'dotenv';
dotenv.config();



export class userController {
    private UserService: userService;

    constructor(userService: userService) {
        this.UserService = userService;
    }

    async createUser(req: Request & { body: { name: string; email: string; password: string; userType: string } },
        res: Response): Promise<void> {
        try {

            const { name, email, password, userType } = req.body;

            const user = await this.UserService.getUserByEmail(email);
            if (user) {
                if (user.verified) {
                    res.status(409).json({ data: 'User already exists', id: user._id })
                } else {
                    await this.UserService.sendOtp(email);
                    res.status(409).json({ data: 'User already exists but not verified', id: user._id })
                }

            }
            else {
                const newUser = { name, email, password, userType };
                const createdUser = await this.UserService.createUser(newUser);
                
                res.status(201).json({ id: createdUser._id, data: 'user created successfully' })
            }
        } catch (error) {
            console.error(error, 'error..............');
            res.status(500).json({ error: 'Internal server error' })
        }
    }
    async sendOtp(req: Request, res: Response): Promise<void> {
        try {

            const id = req.headers['id']?.toString();
            console.log(id);

            const user = await this.UserService.getUser(id)

            const result = await this.UserService.sendOtp(user.email)
            res.status(200).json(result);
        } catch (err) {
            console.log(err);

            res.status(500).json(err)
        }
    }
    async getUser(req: Request, res: Response) {
        try {
            const id = req.headers['id'] as string;
           
            if(id == process.env.ADMIN){
                res.status(200).json({id });
                return;
            }
            const user = await this.UserService.getUser(id)

            res.status(200).json({ user, id: user._id });
        } catch (error) {
            res.status(401).json(error);
        }
    }

    async getUserFromId(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await this.UserService.getUser(id)

            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async checkOtp(req: Request, res: Response) {
        try {
            const id = req.headers['id'].toString();
            
            const { otp } = req.body;
            const isMatched = await this.UserService.checkOtp(id, otp);
            if (isMatched) {
                res.status(200).json({ data: 'otp matched' });
            } else {
                res.status(403).json({ data: 'Failed to match otp' })
            }
        } catch (error) {
            res.status(500).json(error);
        }

    }
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            
            if(email == process.env.EMAIL && password == process.env.PASSWORD){
                const token = Jwt.sign({ id : process.env.ADMIN }, jwtSecret, { expiresIn: '5m' });
            
            const refreshToken = Jwt.sign({id : process.env.ADMIN }, jwtSecret, { expiresIn: '7d' });
                res.status(200).json({res:'verified',token,refreshToken,id:'loginAdmin'})
                return;
            }
            const result = await this.UserService.login(email, password);
             if (result == false) {
                res.status(404).json({ res: 'invalid credentials' })

            } else if (result == 'user blocked') {
                res.status(403).json({ res: 'user blocked' })
            } else if(result == true) {
                const user = await this.UserService.getUserByEmail(email)
                const token = Jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '5m' });
                const refreshToken = Jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });

                res.status(200).json({ res: 'verified', id: user._id, token, refreshToken })
            }else  {
                res.status(200).json({ res: 'user not verified' , id : result})
            }
        } catch (error) {
            res.status(500).json(error)
        }

    }
    async selectUser(req: Request, res: Response) {
        try {
            const { userType } = req.body;
            let user;
            console.log(req.headers['id'], 'checking header id');

            if (req.headers['id']) {
                const id = req.headers['id'].toString();
                try {
                    user = await this.UserService.getUser(id);

                } catch (error) {
                    res.status(401).json({ res: 'user not found' });
                }
                const result = await this.UserService.selectUser(userType, user.email)
                res.status(200).json({ id: result })
            } else {
                res.status(401).json({ res: 'user not found' })
            }
        } catch (error) {
            res.status(500).json(error)

        }
    }
    async forgotEmail(req: Request, res: Response) {
        try {
            const email = req.body.email;
            const result = await this.UserService.getUserByEmail(email);
            if (result) {
                res.status(200).json({ data: 'valid email', id: result._id })
            }
        } catch (error) {
            res.status(401).json({ data: 'Unregistered email' })
        }
    }
    async editPassword(req: Request, res: Response) {
        try {
            const password = req.body.password;
            const id = req.headers['id'].toString();
            const result = await this.UserService.editPassword(password, id);
            if (result == 'Updated successfully') {
                res.status(200).json({ result })
            }

        } catch (error) {
            res.status(500).json({ data: 'Internal server error' })
        }
    }
    async blockUser(req: Request, res: Response) {
        try {
            const id = req.query.id as any;
            if (!id) {
                throw new Error("no id");
            }
            const result = await this.UserService.editUser(id, { active: false });

            res.status(200).json({ data: 'success' })
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async unblockUser(req: Request, res: Response) {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new Error("no id");
            }
            await this.UserService.editUser(id, { active: true })
            res.status(200).json({ data: 'success' })
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async editCover(req: Request, res: Response) {
        try {
            const id = req.headers['id'].toString();

            const coverPhoto = req.file?.path;
            const user = await this.UserService.getUser(id);
            const existingCover =  user.coverPhoto;
            
            if (!req.file) {
                res.status(404).json({ message: 'no file selected' })
                return;
            }
            await this.UserService.editUser(id, { coverPhoto })
            if (existingCover?.startsWith('uploads')) {
                // Delete the existing cover photo from the 'uploads' directory
                await fsPromises.unlink(existingCover);
            }
            res.json({ success: true, message: 'Image uploaded successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
    async editImg(req: Request, res: Response) {
        try {
            const id = req.headers['id'].toString();

            const profileImg = req.file?.path;
            const user = await this.UserService.getUser(id);
            const existingImg = user.profileImg;

            if (!req.file) {
                res.status(404).json({ message: 'no file selected' })
                return;
            }
            await this.UserService.editUser(id, { profileImg })
            if (existingImg.startsWith('uploads')) {
                await fsPromises.unlink(existingImg);
            }
            res.json({ success: true, message: 'Image uploaded successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
    async editProfile(req: Request,res: Response){
        try {
            const id = req.headers['id'].toString();
            await this.UserService.editUser(id, req.body)
            res.json({ success: true, message: 'Profile uploaded successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
    async editConnection(req: Request,res: Response){
        try {
            const {userId,requestId,unfollowId,confirmId,takeId }= req.body
            
            if(requestId){
                await this.UserService.editConnection(userId, {$push : {requests : requestId}});
                await this.UserService.editConnection(requestId,{$push : {pendings : userId}});
            }else if(unfollowId){
                await this.UserService.editConnection(userId, {$push : {pendings : unfollowId},$pull : {followers : unfollowId}});
                await this.UserService.editConnection(unfollowId , {$push : {requests : userId}, $pull : {followers : userId}});
            }else if(confirmId){
                await this.UserService.editConnection(userId, {$push : {followers : confirmId}, $pull : {pendings : confirmId}})
                await this.UserService.editConnection(confirmId, {$push : {followers : userId},$pull : {requests : userId}});
            }else if(takeId){
                await this.UserService.editConnection(userId ,{$pull : {requests : takeId}});
                await this.UserService.editConnection(takeId, {$pull : {pendings : userId}});
            }
            
            res.json({ success: true, message: 'Connection edited successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        
    }
    async getAllUsers(req:Request ,res:Response){
        try {
           const result = await this.UserService.getAllUsers();
           res.status(200).json({users:result})
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
    async razorpay(req:Request, res: Response){
        try {
            const orderId = await this.UserService.razorpay(req.body.amt);
            res.status(200).json({orderId})
        } catch (error) {
            res.status(500).json(error);
        }
    }
}