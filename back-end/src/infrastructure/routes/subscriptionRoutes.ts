import { Router } from "express";
import { jwtAuth } from "../../infrastructure/middlewares/jwtAuth";
import { adminJwtAuth } from "../../infrastructure/middlewares/admin";
import { userBlock } from "../../infrastructure/middlewares/userBlock";
import  subscriptionRepository  from "../repository/subscriptionRepository";
import subscriptionUseCase from "../../application/subscriptionUseCase";
import subscriptionService from '../../domain/services/subscriptionService';
import subscriptionController from '../../controllers/subscriptionCotroller';

const SubscriptionRepository = new subscriptionRepository();
const SubscriptionUseCase = new subscriptionUseCase(SubscriptionRepository);
const SubscriptionService = new subscriptionService(SubscriptionUseCase);
const SubscriptionController = new subscriptionController(SubscriptionService);

const subscriptionRouter = Router();

subscriptionRouter.post('/create',adminJwtAuth, (req,res)=> SubscriptionController.create(req,res));
subscriptionRouter.patch('/add_feature',adminJwtAuth, (req,res)=> SubscriptionController.addFeature(req,res));
subscriptionRouter.delete('/delete/:id',adminJwtAuth, (req,res)=> SubscriptionController.delete(req,res));
subscriptionRouter.patch('/edit',adminJwtAuth, (req,res)=> SubscriptionController.edit(req,res))
subscriptionRouter.get('/get_features',userBlock, (req,res)=> SubscriptionController.getFeature(req,res));
subscriptionRouter.get('/get_subscriptions',userBlock, (req,res)=> SubscriptionController.getAllSubscription(req,res));


export default subscriptionRouter;