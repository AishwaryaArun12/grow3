import {Request,Response,NextFunction} from 'express';
import  Jwt, { JwtPayload }  from 'jsonwebtoken';
import Users from '../database/userModel';

const jwtSecret = process.env.JWT_SECRET;


export const userBlock = async(req : Request,res : Response,next : NextFunction)=>{
   try {
    const token = req.headers.authorization?.toString().split(' ')[1];
    if(!token){
      res.status(401).json({ message: 'Unauthorised' });
      return;
    }
    let parsedToken;
    try {
      const decoded = Jwt.verify(token, jwtSecret); 
      parsedToken = decoded as JwtPayload
      if(!parsedToken){
        throw new Error('Expired')
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorised' });
      return;
    }
    
    console.log(parsedToken,'mmmmmmmmmmm')
    const userId = parsedToken.id;
    if(userId == process.env.ADMIN){
        next();
    }else{
        const user = await Users.findById(userId);
        if(user.active){
            next();
        }else{
            throw new Error("Admin blocked");
        }
    }
  
  } catch (error) {
    console.log(error,'error')
    res.status(403).json({ message: 'Admin blocked' });
  }
}

