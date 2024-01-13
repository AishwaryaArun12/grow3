import {Request,Response} from 'express';
import adminService from '../domain/services/adminService';

export default class adminController{

    private AdminService :adminService;
    constructor(adminService :adminService){
        this.AdminService = adminService;
    }

    async getAllUsers(req: Request, res: Response):Promise<void>{
       try {
        const users = await this.AdminService.getAllUsers();
        res.status(200).json({users})
       } catch (error) {
        res.status(500).json(error);
       }

    }
}