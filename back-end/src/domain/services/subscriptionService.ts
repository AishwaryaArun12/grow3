import subscriptionUseCase from "../../application/subscriptionUseCase";
import ISubscription from "../../domain/entities/subscriptionEntity";

export default class subscriptionService{
    private subscriptionUseCase : subscriptionUseCase;


    constructor(subscription : subscriptionUseCase){
        this.subscriptionUseCase = subscription
    }

    create(data: ISubscription):Promise<ISubscription>{
        return this.subscriptionUseCase.create(data);
    }
    edit(id:string,data:object):Promise<ISubscription>{
        return this.subscriptionUseCase.edit(id,data);
    }
    delete(id:string):Promise<boolean>{
        return this.subscriptionUseCase.delete(id);
    }
    getAll():Promise<ISubscription[]>{
        return this.subscriptionUseCase.getAll();
    }
}