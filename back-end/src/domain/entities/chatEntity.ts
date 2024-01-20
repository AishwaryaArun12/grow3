
export interface IConversation{
    _id ?: string,
    members ?: string[],
    createdAt ?: Date,
    updatedAt ?: Date 
}

export interface IMessage{
    _id ?: string,
   conversationId ?: string,
   sender ?: string,
   text ?: string,
   createdAt ?: Date,
    updatedAt ?: Date 
}