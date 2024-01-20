import { IConversation,IMessage } from "../domain/entities/chatEntity";
import { Conversation,Message } from "../infrastructure/database/chatModel";
import chatRepository from "../infrastructure/repository/chatRepository";

export default class chatUseCase{
     private chatRepository : chatRepository;

     constructor(chat : chatRepository){
        this.chatRepository = chat;
     }

     async createConversation (data: string[]): Promise<IConversation>{
        return this.chatRepository.createConversation(data);
     }
     async createMessage(data: IMessage) : Promise<IMessage>{
        return this.chatRepository.createMessage(data);
     }
     async getConversation(id: string):Promise<IConversation[]>{
        return this.chatRepository.getConversation(id);
     }
     async getMessages(id:string):Promise<IMessage[]>{
        return this.chatRepository.getMessages(id);
     }
}