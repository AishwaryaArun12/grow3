import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config()

const dataBase = ()=>{
    try {
        mongoose.connect(process.env.URL).then(()=>{
            console.log('db connected successfully.......')
        });
    } catch (error) {
       console.error(error); 
    }
}

export default dataBase