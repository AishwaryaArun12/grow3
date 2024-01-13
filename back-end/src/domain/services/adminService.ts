import {User} from '../../domain/entities/userEntity';
import adminUseCase from '../../application/adminUseCase';

export default class adminService{
    private admin_use_case :adminUseCase;

    constructor(adminUseCase: adminUseCase){
        this.admin_use_case = adminUseCase;
    }

    async getAllUsers():Promise<User[]>{
        return this.admin_use_case.getAllUser();
    }
}