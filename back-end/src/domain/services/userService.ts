import {User} from '../entities/userEntity';

import userUseCase from '../../application/userUseCase';


export class userService {
    
    private user_use_case : userUseCase;

    constructor (userUseCase : userUseCase){
        
        this.user_use_case = userUseCase;
    }

    async createUser(user : User) : Promise<User>{
        return this.user_use_case.createUser(user);
    }
    async getUser(id : string) :Promise<User>{
        return this.user_use_case.getUser(id);
    }
    async getUserByEmail(email : string) :Promise<User>{
        return this.user_use_case.getUserByEmail(email);
    }
    async sendOtp(email : string):Promise<string>{
        return this.user_use_case.sendOtp(email);
    }
    async checkOtp(email : string, otp : string):Promise<boolean>{
        return this.user_use_case.checkOtp(email,otp);
    }
    async login(email: string, password: string):Promise<boolean | string>{
        return this.user_use_case.login(email,password);
    }
    async selectUser(userType:string,email:string | string[]):Promise<string>{
        return this.user_use_case.selectUser(userType,email);
    }
    async editPassword(password:string , id:string ):Promise<string>{
        return this.user_use_case.editPassword(password,id);
    }
    async editUser(id: string, editinfo: object ):Promise<User| string>{
        return this.user_use_case.editUser(id,editinfo);
    }
    async editConnection(id: string, editinfo: object ):Promise<boolean>{
        return this.user_use_case.editConnection(id,editinfo);
    }
    async getAllUsers():Promise<User[]>{
        return this.user_use_case.getAllUsers();
    }
    async razorpay(amt:number):Promise<string>{
        return this.user_use_case.razorpay(amt);
    }
}