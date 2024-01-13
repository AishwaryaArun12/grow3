import {User} from '../domain/entities/userEntity';
import { adminRepository } from '../infrastructure/repository/adminRepository';

export default class adminUseCase{
    private adminRepository : adminRepository;

    constructor(admin : adminRepository){
        this.adminRepository = admin;
    }

    getAllUser():Promise<User[]>{
        return this.adminRepository.getAllUser();
    }
}