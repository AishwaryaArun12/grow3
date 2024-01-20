import { IConversation, IMessage } from "../../domain/entities/chatEntity";
import chatUseCase from "../../application/chatUseCase";

export default class chatService{
    
    private chatUseCase : chatUseCase;

    constructor(chat : chatUseCase){
        this.chatUseCase = chat;
    }
    createConversation(data: string[]):Promise<IConversation>{
        return this.chatUseCase.createConversation(data);    
    }
    createMessage(data : IMessage):Promise<IMessage>{
        return this.chatUseCase.createMessage(data);
    }
    getConversations(id: string):Promise<IConversation[]>{
        return this.chatUseCase.getConversation(id);
    }
    getMessages(id: string):Promise<IMessage[]>{
        return this.chatUseCase.getMessages(id);
    }
}