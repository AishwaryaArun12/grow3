import { Conversation,Message } from "../../infrastructure/database/chatModel";
import { IConversation, IMessage } from "../../domain/entities/chatEntity";

export default class chatRepository{
    async createConversation(data : string[]):Promise<IConversation>{
        const newConversation = await Conversation.create({members:data});
        return newConversation;
    }
    async getConversation(id : string): Promise<IConversation[]>{
        const res = await Conversation.find({ members : { $in : [id]}}).populate('members');;
        return res;
    }
    async createMessage(data : object): Promise <IMessage>{
        const res = await Message.create(data);
        return res;
    }
    async getMessages(id : string): Promise<IMessage[]>{
        const res = await Message.find({ conversationId : id}).sort({createdAt : 1});
        return res;
    }
}