import {Event} from "../../infrastructure/database/eventModel";
import Users from "../../infrastructure/database/userModel";
import {IEvent} from '../../domain/entities/eventEntity'

export default class eventRepository{
    async create(event:object):Promise<IEvent>{
        const newEvent = await Event.create(event);
        return newEvent.toObject();
    }
    async edit(id:string, data: object):Promise<boolean | IEvent>{
        try {
            
           const update =  await Event.findOneAndUpdate({_id : id},{$push : data}, {new : true});
           
           return update
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async editEvent(id:string, data: object):Promise<boolean | IEvent>{
        try {
           const update =  await Event.findOneAndUpdate({_id : id},{$set : data}, {new : true});
           return update
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async delete(id: string):Promise<boolean>{
        try {
            await Event.findByIdAndDelete(id);
            return true
        } catch (error) {
            return false
        }
       
    }
    async getAllEvents():Promise<IEvent[]>{
        try {
            
            const result = await Event.find({'userId': { $in: await Users.find({ active: true }).distinct('_id') }}).populate('userId').sort({startTime : -1})
              console.log(result,'dddd');
            return result
        } catch (error) {
            console.log(error)
            return error;
        }
    }
    async getEvent(data : object):Promise<IEvent[]>{
        try {
            const result = await Event.find(data).populate('userId')
            return result;
        } catch (error) {
            return error;            
        }
    }
    async removeAttendee(id:string,data:object):Promise<boolean>{
        try {
            await Event.findOneAndUpdate({_id : id},{$pull : data}, {new : true});
            return true
        } catch (error) {
            return false
        }
    }
    
   
}