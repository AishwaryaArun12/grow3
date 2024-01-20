import mongoose, { Schema } from 'mongoose';
import { IConversation,IMessage } from '../../domain/entities/chatEntity';


const MessageSchema = new Schema({
  conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation' },
  sender : { type: Schema.Types.ObjectId, ref: 'Users' },
  text : {
    type : String
  }},
  {timestamps : true}
);

const ConversationSchema = new Schema({
    members: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    
  },{timestamps : true});

export const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);

export const Message = mongoose.model<IMessage>('Message', MessageSchema);


