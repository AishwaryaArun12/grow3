import {User} from '../domain/entities/userEntity';
import {userRepository} from '../infrastructure/repository/userRepository';

export default class userUseCase {
    private userRepository : userRepository;

    constructor(user : userRepository){
        this.userRepository = user;
    }
    createUser(user : User): Promise<User>{
        return this.userRepository.createUser(user)
    }
    getUser(id : string): Promise<User>{
        return this.userRepository.getUser(id);
    }
    getUserByEmail(email : string): Promise<User>{
        return this.userRepository.getUserByEmail(email);
    }
    sendOtp(email: string): Promise<string>{
        return this.userRepository.sendOtp(email);
    }
    checkOtp(email : string, otp : string):Promise<boolean>{
        return this.userRepository.checkOtp(email,otp)
    }
    login(email : string, password : string):Promise<boolean |string>{
        return this.userRepository.login(email,password);
    }
    selectUser(userType:string,email : string | string[]):Promise<string>{
        return this.userRepository.selectUser(userType,email);
    }
    editPassword(password: string, id : string): Promise<string>{
        return this.userRepository.editPassword(password,id);
    }
    editUser(id: string, editinfo: object): Promise<User | string>{
        return this.userRepository.editUser(id,editinfo);
    }
    editConnection(id: string, editinfo: object): Promise<boolean>{
        return this.userRepository.editConnection(id,editinfo);
    }
    getAllUsers(): Promise<User[]>{
        return this.userRepository.getAllUser();
    }
    razorpay(amt:number): Promise<string>{
        return this.userRepository.razorPost(amt);
    }
   
}