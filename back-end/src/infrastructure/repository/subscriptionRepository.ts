import Subscriptions from "../../infrastructure/database/subscriptionModel";
import ISubscrition from '../../domain/entities/subscriptionEntity';

export default class SubscriptionRepository{
    async create(data:ISubscrition):Promise<ISubscrition>{
        const newSubscription = await Subscriptions.create(data);
        return newSubscription;
    }
    async edit(id:string,data:object):Promise<ISubscrition>{
        const edit = await Subscriptions.findOneAndUpdate({_id : id},{$set : data},{new :true});
        return edit;
    }
    async delete(id:string):Promise<boolean>{
        const remove = await Subscriptions.findOneAndDelete({_id:id});
        if(remove){
            return true;
        }else{
            return false;
        }
    }
    async getAll():Promise<ISubscrition[]>{
        const subscriptions = await Subscriptions.find();
        return subscriptions;
    }
}