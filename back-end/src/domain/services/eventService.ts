import eventUseCase from "../../application/eventUseCase";
import { IEvent } from "../../domain/entities/eventEntity";

export default class eventService{
    private eventUseCase : eventUseCase;

    constructor(event : eventUseCase){
        this.eventUseCase = event;
    }

    create(event: IEvent):Promise<IEvent>{
        return this.eventUseCase.create(event);
    }
    edit(id:string, data:object):Promise<boolean | IEvent>{
        return this.eventUseCase.edit(id,data);
    }
    delete(id:string):Promise<boolean>{
        return this.eventUseCase.delete(id);
    }
    getAllEvents():Promise<IEvent[]>{
        return this.eventUseCase.getAllEvents()
    }
    getEvent(data:object):Promise<IEvent[]>{
        return this.eventUseCase.getEvent(data);
    }
    removeAttendee(id:string, data:object):Promise<boolean>{
        return this.eventUseCase.removeAttendee(id,data);
    }
    editEvent(id:string, data:object):Promise<boolean | IEvent>{
        return this.eventUseCase.editEvent(id,data);
    }
   
}