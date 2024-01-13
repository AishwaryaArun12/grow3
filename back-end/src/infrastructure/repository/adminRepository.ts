import Users from "../database/userModel";
import { User } from "../../domain/entities/userEntity";

export class adminRepository{
    async getAllUser():Promise<User[]>{
        const allUsers = await Users.find();
        return allUsers
    }

}