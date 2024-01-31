import {Request,Response,NextFunction} from 'express';
import  Jwt, { JwtPayload }  from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;
const adminId = process.env.ADMIN


export const adminJwtAuth = async(req : Request,res : Response,next : NextFunction)=>{
   const token = req.headers.authorization?.toString().split(' ')[1];
   try {
    if(token){
      const decoded = Jwt.verify(token, jwtSecret);
      const parsedToken = decoded as JwtPayload
      const id = parsedToken.id;
      console.log(id,'object')
    if(id == adminId){
        next();
    }
    }else{
        res.status(401).json({message: 'Unauthorized'})
    }
    
  } catch (error) {
    console.log(error,'error')
    res.status(401).json({ message: 'Unauthorized' });
  }
}

