import chatRepository from "../../infrastructure/repository/chatRepository";
import chatUseCase from "../../application/chatUseCase";
import chatService from "../../domain/services/chatService";
import chatController from "../../controllers/chatController";
import { Router } from "express";

const ChatRepository = new chatRepository();
const ChatUseCase = new chatUseCase(ChatRepository);
const ChatService = new chatService(ChatUseCase);
const ChatController = new chatController(ChatService);

const chatRouter = Router();

chatRouter.post( '/create_conversation' ,(req,res)=> ChatController.createConversation(req,res));
chatRouter.post( '/create_message' ,(req,res)=> ChatController.createMessage(req,res));
chatRouter.get( '/get_conversations/:id' ,(req,res)=> ChatController.getConversations(req,res));
chatRouter.get( '/get_messages/:id' ,(req,res)=> ChatController.getMessage(req,res));


export default chatRouter;