import { User } from '../../domain/entities/userEntity';
import Users from '../database/userModel';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();
import otpGenerator from 'otp-generator'
import bcrypt from 'bcrypt';
import Razorpay from 'razorpay'

const transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
      user : process.env.USER,
      pass : process.env.PASS
    }
  })

  const razorpay = new Razorpay({
    key_id: process.env.RAZORKEY,
    key_secret: process.env.RAZORSECRET,
  });

export class userRepository{
    async createUser(user : User): Promise<User>{
        const saltRounds : number = 10;
       
       const hash = await bcrypt.hash(user.password, saltRounds);
        user.password = hash;
        
        const createdUser = await Users.create(user);
        
        return createdUser.toObject();
    }
    async sendOtp(email:string):Promise<string | null>{
       
        const otp = otpGenerator.generate(6, { digits: true, specialChars: false, lowerCaseAlphabets : false, upperCaseAlphabets: false });
         
        const otpExpire = new Date(Date.now() +  60 * 1000); // 5 minutes from now
        await Users.findOneAndUpdate({ email : email }, { otp, otpExpire });
        console.log(otp,'otp',otpExpire);
        //const toEmail =savedUser.email;
        const toEmail = email;
        const mailOptions = {
            from : 'grow345678@gmail.com',
            to : toEmail,
            subject : 'OTP for registration in grow3',
            html : `<p>Hai, </p><p> this OTP only valid for 5 minutes </p><p>${otp}</p><p>with regards,</p><p> grow3</p>`
        } 
        let result ;
        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.error('Error sending mail : ',error);
                result = 'Error in sending email'
            }else{
             
                result= 'Email send successfully';
            }
        });
        return result;
    }
    async getUser(id : string): Promise<User>{

        const user = (await Users.findById(id).populate('pendings').populate('requests').populate('followers').populate('primium.subscriptionId'));
        
        return user;
    }
    async getUserByEmail(email: string): Promise<User>{
        const user = await Users.findOne({email});

        return user;
    }
    async checkOtp(id: string,otp:string): Promise<boolean>{
        const user = await Users.findById(id);
        if(otp == user.otp && user.otpExpire > new Date(Date.now())){
            await Users.findOneAndUpdate({email:user.email},{verified : true})
            return true;
        }else{
            return false;
        }

    }
    async login(email: string, password : string): Promise<boolean | string>{
        const user = await Users.findOne({email});
        
        if(!user){
            return false;
        }else if(!user.verified){
            return user._id;
        }else if(!user.active){
            return 'user blocked'
        }
        const result = await bcrypt.compare(password, user.password)
        if(!result){
            return false;
        }
        
        return true;
    }
    async selectUser(userType : string,email:string | string[]): Promise <string>{
        const user = await Users.findOne({email});
        if(user){
            const update = await Users.findOneAndUpdate({email},{userType},{new:true});
            return update._id;
        }else{
            
            return 'user not found';
        }
    }
    async editPassword(password :string,id :string): Promise<string>{
        try {
            await Users.findOneAndUpdate({id},{$set :{password}},{new:true});
            return 'Updated successfully'
        } catch (error) {
            return 'Invalid userId';
        }
    }
    async editUser(_id:string, editinfo: object):Promise<User | string>{
        try {           
            let edit = await Users.findOneAndUpdate({_id},{$set : editinfo},{ new: true, upsert: true });
            return edit
        } catch (error) {
            return 'Invalid userId';
        }
    }
    async editConnection(_id:string, editinfo: object):Promise<boolean>{
        try {
            
             await Users.findOneAndUpdate({_id},editinfo,{ new: true });
           
            return true
        } catch (error) {
            return false;
        }
    }
    async getAllUser():Promise<User[]>{
        try {
            const allUsers = await Users.find({active : true});
            return allUsers
        } catch (error) {
            console.log(error);
            
        }
    }
    async razorPost (amt:number):Promise<string> {
        const amount = amt;
        const options = {
          amount: amount * 100, // Razorpay expects the amount in paise (100 paise = 1 INR)
          currency: 'INR',
        };
      
        try {
          const order = await razorpay.orders.create(options);
          return order.id
        } catch (error) {
          console.error('Error creating order:', error);
        }
      }

}