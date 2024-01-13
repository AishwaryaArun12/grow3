import { Request,Response } from "express";
import subscriptionService from "../domain/services/subscriptionService";
import  ISubscription from "../domain/entities/subscriptionEntity";

export default class subscriptionController {
    private subscriptionService:subscriptionService
    private features:string[] = ['Unlock the power to host and personalize exclusive events','Break barriers and connect with a diverse range of professionals',
                                    'Ensure a seamless, ad-free experience','Customer support ensuring quicker responses to their queries or concerns.']

    constructor(subscription:subscriptionService){
        this.subscriptionService = subscription
    }
    async create(req:Request,res:Response):Promise<void>{
       try {
        console.log(req.body);
        const result = await this.subscriptionService.create(req.body)
        res.status(200).json({message:'subscription created successfully',result })
       } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal server error'})
       } 
    }
    async edit(req: Request,res: Response):Promise<void>{
        try {
            const {id,name,fees,duration,durationIn,features} = req.body;
            await this.subscriptionService.edit(id,{name,fees,duration,durationIn,features})
            res.status(200).json({message:'subscription edited successfully'})
        } catch (error) {
            res.status(500).json({message : 'Internal server error'})
        }
    }
    async addFeature(req:Request,res:Response):Promise<void>{
        try {
            this.features.push(req.body.feature)
            res.status(200).json({message:'feature added successfully'})
        } catch (error) {
            res.status(500).json({message:  'Internal server error' });
        }
    }
    async delete(req:Request,res:Response):Promise<void>{
        try {
            const result = await this.subscriptionService.delete(req.params.id);
            if(result){
                res.status(200).json({message:'subscription deleted successfully'})
            }else{
                throw new Error("internal server error");
                
            }
        } catch (error) {
            res.status(500).json({message : 'Internal server error'})
        }
    }
    async getFeature(req: Request,res: Response):Promise<void>{
        try {
            res.status(200).json({features:this.features})
        } catch (error) {
            res.status(500).json({message : 'Internal server error'})
        }
    }
    async getAllSubscription(req:Request,res:Response):Promise<void>{
        try {
            const result = await this.subscriptionService.getAll();
            res.status(200).json({message:'subscription retrieved successfully',result})
        } catch (error) {
            res.status(500).json({message:'internal server error'})
        }
    }
}