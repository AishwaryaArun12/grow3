import {Request,Response,NextFunction} from 'express';
import  Jwt, { JwtPayload }  from 'jsonwebtoken';
import Users from '../database/userModel';
import dotenv from "dotenv"
dotenv.config()
const jwtSecret = process.env.JWT_SECRET;



export const jwtAuth = async(req : Request,res : Response,next : NextFunction)=>{
 
   try {
   
    const token = req.headers.authorization?.toString().split(' ')[1];
    if(!token){
      res.status(401).json({ message: 'Unauthorised' });
      return;
    }
    const decoded = Jwt.verify(token, jwtSecret);
    const parsedToken = decoded as JwtPayload
    const userId = parsedToken.id;
    if( userId == process.env.ADMIN){
      next()
      return;
    }
    const user = await Users.findById(userId);
    if(user){
        req.user = user._id;
        next();
    }else{
        throw new Error("no user");
    }
    
  } catch (error) {
    console.log(error,'eeeeeeeeeeeee')
    res.status(401).json({ message: error.message });
  }
}

export const newAccessToken = async(req : Request,res : Response)=>{
    const refreshToken = req.body.refreshToken;
    if(!refreshToken){
      res.status(500).json({ message: 'No token' });
      return;
    }
    try {
        const decoded = Jwt.verify(refreshToken, jwtSecret);
        const parsedToken = decoded as JwtPayload
        const userId = parsedToken.id;
        
        if( userId == process.env.ADMIN){
          const token = Jwt.sign({ id : userId }, jwtSecret, { expiresIn: '5m' });
        const newRefreshToken = Jwt.sign({id : userId }, jwtSecret, { expiresIn: '7d' });
        res.status(200).json({accessToken : token, refreshToken :newRefreshToken,id:userId})
        return
        }
        const user = await Users.findById(userId);
        if(user ){
        const token = Jwt.sign({ id : userId }, jwtSecret, { expiresIn: '5m' });
        const newRefreshToken = Jwt.sign({id : userId }, jwtSecret, { expiresIn: '7d' });
        res.status(200).json({accessToken : token, refreshToken :newRefreshToken,id:userId})
        }else{
            throw new Error("sorry user not found");
            
        }
 

      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
      }

}