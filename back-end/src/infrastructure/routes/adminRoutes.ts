import { Router } from "express";
import { adminRepository } from "../repository/adminRepository";
import adminUseCase from "../../application/adminUseCase";
import adminService from '../../domain/services/adminService';
import adminController from '../../controllers/adminController';

const AdminRepository = new adminRepository();
const AdminUseCase = new adminUseCase(AdminRepository);
const AdminService = new adminService(AdminUseCase);
const AdminController = new adminController(AdminService);

const adminRouter = Router();

adminRouter.get('/getAllUsers', (req,res)=> AdminController.getAllUsers(req,res))

export default adminRouter;