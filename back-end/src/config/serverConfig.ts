import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan'
import path from 'path';

dotenv.config();

declare module 'express-session' {
  interface SessionData {
    email?: string;
    user?: object
  }
}

const createServer = ()=>{
    const app = express();
    app.use(cors({
        origin: 'https://grow3.vercel.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
      }));
      app.use(bodyParser.json());
      app.use(
        bodyParser.urlencoded({
          extended: false
        })
      );
      app.use(express.json());
      app.use(session({
        secret: 'SECRET KEY',
        resave: false,
        saveUninitialized: true,
         store: MongoStore.create({
          mongoUrl: process.env.URL,
         })
      }));
      app.use(express.static('uploads'));
      app.use(morgan("dev"))
    return app;  

}
export default createServer;