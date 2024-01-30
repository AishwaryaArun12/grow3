import { IEvent } from "../domain/entities/eventEntity";
import eventRepository from "../infrastructure/repository/eventRepository";

export default class eventUseCase{
    private eventRepository: eventRepository;

    constructor (event: eventRepository){
        this.eventRepository = event;
    }

    create(event: IEvent):Promise<IEvent>{
        return this.eventRepository.create(event);
    }
    edit(id: string,data: object):Promise<boolean | IEvent>{
        return this.eventRepository.edit(id,data);
    }
    delete(id:string): Promise<boolean>{
        return this.eventRepository.delete(id);
    }
    getAllEvents():Promise<IEvent[]>{
        return this.eventRepository.getAllEvents();
    }
    getEvent(data: object):Promise<IEvent[]>{
        return this.eventRepository.getEvent(data);
    }
    removeAttendee(id: string,data: object):Promise<boolean>{
        return this.eventRepository.removeAttendee(id,data);
    }
    editEvent(id:string,data:object):Promise<boolean| IEvent>{
        return this.eventRepository.editEvent(id,data)
    }
    
}