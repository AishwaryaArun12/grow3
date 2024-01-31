import dataBase from './config/dbConfig'
import passportRoute from './infrastructure/routes/passportRoutes';
import authRoutes from './infrastructure/routes/authRoutes'
import serverConfig from './config/serverConfig';
import passport from './config/passportConfig'
import adminRouter from './infrastructure/routes/adminRoutes';
import userRouter from './infrastructure/routes/userRoutes';
import http from 'http';
import postRoutes from './infrastructure/routes/postRoutes'
import subscriptionRoutes from './infrastructure/routes/subscriptionRoutes';
import chatRoutes from './infrastructure/routes/chatRoutes'
import { jwtAuth } from './infrastructure/middlewares/jwtAuth';
import { adminJwtAuth } from './infrastructure/middlewares/admin';
import configureSocket from './config/socket';
import eventRouter from './infrastructure/routes/eventRoutes';
import { userBlock } from './infrastructure/middlewares/userBlock';


const port = parseInt( process.env.PORT);
 dataBase();
 const app = serverConfig();

app.use(passport.initialize());
app.use(passport.session());
  

  app.use('/', authRoutes);
  app.use('/auth', passportRoute);
  app.use('/admin',adminJwtAuth, adminRouter);
  app.use('/',jwtAuth,userBlock, userRouter);
  app.use('/post',jwtAuth, postRoutes);
  app.use('/subscription', subscriptionRoutes )
  app.use('/chat',jwtAuth, chatRoutes )
  app.use('/event',jwtAuth, eventRouter)

  const server = new http.Server(app);
  const io = configureSocket(server)
 
  server.listen(port, ()=>{
    console.log(`server running on the port ${port}`)
  })