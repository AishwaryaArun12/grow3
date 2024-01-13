import {Router} from 'express';
import passport from '../../config/passportConfig'
import Users from '../database/userModel';
import  Jwt  from 'jsonwebtoken';
import { User } from '../../domain/entities/userEntity';
import dotenv from "dotenv"

dotenv.config()


const jwtSecret = process.env.JWT_SECRET

const passportRoute = Router();

 passportRoute.get('/' , passport.authenticate('google', { scope:
            [ 'email', 'profile' ]
        }));
  passportRoute.get( '/callback', 
        passport.authenticate( 'google', {
            successRedirect: '/auth/callback/success',
            failureRedirect: '/auth/callback/failure'
        }));
    
    // Success 
    passportRoute.get('/callback/success' , async(req , res) => {
        
        const user = req.user as User;
        
        if(!req.user){
            res.redirect('/auth/callback/failure');
        }else{
        
        if(user.displayName == 'Aishwarya Arun' && user.email == 'aishwarya4arun@gmail.com'){
            req.session.user = req.user;
           
            res.redirect('http://localhost:5173/admin/home/?id=loginAdmin')
        }else{
            let isUser = await Users.findOne({email:user.email})
            if(!isUser){
            isUser = await Users.create({name:user.displayName,email :user.email,password : 'a12345',verified : true});
            
            res.redirect(`http://localhost:5173/selectuser/?id=${isUser._id}`);
                
           }else{
           
            res.redirect(`http://localhost:5173/?id=${isUser._id}`);
           }
            
        }
        
        }
    });
    passportRoute.get('/callback/failure' , (req , res) => {
        res.redirect('http://localhost:5173/login');
      })
    passportRoute.post('/setToken', async(req,res)=>{
        
        const id = req.body.id;
        console.log(id,'aaaaaaaa')
       if(id != 'loginAdmin'){
        try {
            const user = await Users.findById(req.body.id);
            const token = Jwt.sign({ id : user._id }, jwtSecret, { expiresIn: '5m' });
            
            const refreshToken = Jwt.sign({id : user._id }, jwtSecret, { expiresIn: '7d' });
           
            res.status(200).json({res:'Authorised',token,refreshToken,id:user._id,user})
        } catch (error) {
            res.status(401).json({res:'Unauthorised'})
        }
        
       }else{
           const token = Jwt.sign({ id : process.env.ADMIN }, jwtSecret, { expiresIn: '5m' });
            
            const refreshToken = Jwt.sign({id : process.env.ADMIN }, jwtSecret, { expiresIn: '7d' });
           
            res.status(200).json({res:'Authorised',token,refreshToken,id:'loginAdmin'})
       }
    })


export default passportRoute;