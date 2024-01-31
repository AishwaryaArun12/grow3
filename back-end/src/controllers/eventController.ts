import { Request,Response } from "express";
import eventService from "../domain/services/eventService";
import { IEvent } from "../domain/entities/eventEntity";
import fs, { promises as fsPromises } from 'fs';

export default class eventController {
    private eventService:eventService

    constructor(event:eventService){
        this.eventService = event
    }
    async create(req:Request,res:Response):Promise<void>{
       try {
        const file = req.file?.path
        const result = await this.eventService.create({...req.body,media:file,})
        res.status(200).json({message:'Post created successfully',result })
       } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal server error',...error})
       }
        
    }
    async getAllEvents(req:Request,res:Response):Promise<void>{
        try {
            
            const result = await this.eventService.getAllEvents();
            res.status(200).json({message:'Events retrieved successfully',events:result})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async edit(req:Request,res:Response):Promise<void>{
        try {
            const {id,data} = req.body
            await this.eventService.edit(id,data);
            res.status(200).json({message:'Event edited successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async getEvent(req:Request,res:Response):Promise<void>{
        try {
           
            const result = await this.eventService.getEvent(req.params);
            res.status(200).json({message:'Event edited successfully',result})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async editEvent(req:Request,res:Response):Promise<void>{
        try {
            const {id,eEventImg,description,name,eventLink,startTime,endTime,userId,speakers} = req.body
            console.log(endTime,'aaaaaaaaaaa')
            const file = req.file?.path ?? eEventImg;
            console.log(file,'sssssss')
            const data = {description,media:file,name,eventLink,startTime,endTime,userId,speakers}
            await this.eventService.editEvent(id,data);
            fsPromises.access(eEventImg, fs.constants.F_OK)
            .then(() => {
                fsPromises.unlink(eEventImg).then(res=>console.log('deleted path successfull..')).catch(err=>console.log(err,'error'))
            }).catch(err=>{
                console.log(err,'getting error when access')
            })
            
            res.status(200).json({message:'Event edited successfully'})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    async delete(req:Request,res:Response):Promise<void>{
        try {
            const id = req.params.id
        const img = req.params.img;
        const up = req.params.up;
        await this.eventService.delete(id);
        if(up != 'up'){
           await fsPromises.unlink(up+'/'+img);
        }
        res.status(200).json({message:'Event deleted successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async addAttendee(req :Request, res: Response):Promise<void>{
       try {
        const {eventId,id} = req.body;
        await this.eventService.edit(eventId, {attendees:id});
        res.status(200).json({message:'Attendee recorded successfully'})
       } catch (error) {
        res.status(500).json(error)
       }
    }
    async removeAttendee(req :Request, res: Response):Promise<void>{
        try {
         const {eventId,id} = req.body;
         await this.eventService.removeAttendee(eventId, {attendees:id});
         res.status(200).json({message:'Attendee removed successfully'})
        } catch (error) {
         res.status(500).json(error)
        }
     }
    
    }