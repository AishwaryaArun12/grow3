import  ISubscription from "../domain/entities/subscriptionEntity";
import subscriptionRepository from "../infrastructure/repository/subscriptionRepository";

export default class subscriptionUseCase{
    private subscriptionRepository : subscriptionRepository

    constructor(subscription: subscriptionRepository){
        this.subscriptionRepository = subscription;
    }
    create(data : ISubscription):Promise<ISubscription>{
        return this.subscriptionRepository.create(data);
    }
    edit(id: string, data:object):Promise<ISubscription>{
        return this.subscriptionRepository.edit(id,data);
    }
    delete(id:string):Promise<boolean>{
        return this.subscriptionRepository.delete(id);
    }
    getAll():Promise<ISubscription[]>{
        return this.subscriptionRepository.getAll();
    }
}