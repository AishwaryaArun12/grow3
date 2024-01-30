import { IConversation,IMessage } from "../domain/entities/chatEntity";
import chatService from "../domain/services/chatService";
import { Request,Response } from "express";

export default class chatController{
    private chatService: chatService;

    constructor (chat : chatService){
        this.chatService = chat;
    }

    async createConversation (req:Request,res:Response){
        try {
            const id = req.headers['id'] as string;
            const {senderId,receiverId} = req.body;
            const resp = await this.chatService.createConversation([senderId,receiverId]);
            const all = await this.chatService.getConversations(id);
            const result = all.filter(i=>{ return i._id.toString() === resp._id.toString()})
            
            res.status(200).json({result:result[0]})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async createMessage(req:Request,res:Response){
        try {
            const result = await this.chatService.createMessage(req.body);
            res.status(200).json({result})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async getConversations(req:Request,res:Response){
        try {
            const result = await this.chatService.getConversations(req.params.id);
            res.status(200).json({result})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async getMessage(req:Request,res:Response){
        try {
            const result = await this.chatService.getMessages(req.params.id);
            res.status(200).json({result})
        } catch (error) {
            res.status(500).json(error)
        }
    }
}