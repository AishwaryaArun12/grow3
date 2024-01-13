import { Router } from "express";
import  subscriptionRepository  from "../repository/subscriptionRepository";
import subscriptionUseCase from "../../application/subscriptionUseCase";
import subscriptionService from '../../domain/services/subscriptionService';
import subscriptionController from '../../controllers/subscriptionCotroller';

const SubscriptionRepository = new subscriptionRepository();
const SubscriptionUseCase = new subscriptionUseCase(SubscriptionRepository);
const SubscriptionService = new subscriptionService(SubscriptionUseCase);
const SubscriptionController = new subscriptionController(SubscriptionService);

const subscriptionRouter = Router();

subscriptionRouter.post('/create', (req,res)=> SubscriptionController.create(req,res));
subscriptionRouter.patch('/add_feature', (req,res)=> SubscriptionController.addFeature(req,res));
subscriptionRouter.delete('/delete/:id', (req,res)=> SubscriptionController.delete(req,res));
subscriptionRouter.patch('/edit', (req,res)=> SubscriptionController.edit(req,res))
subscriptionRouter.get('/get_features', (req,res)=> SubscriptionController.getFeature(req,res));
subscriptionRouter.get('/get_subscriptions', (req,res)=> SubscriptionController.getAllSubscription(req,res));


export default subscriptionRouter;