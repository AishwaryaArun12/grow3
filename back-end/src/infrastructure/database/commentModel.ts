import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { IComment } from '../../domain/entities/postEntity';

const replySchema = new Schema({
  userId : {type : Schema.Types.ObjectId, ref : 'Users'},
  reply : {type: String},
  time : {type : Date},
  mention : {type : Schema.Types.ObjectId, ref : 'Users'}
})

const CommentsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Users' },
  comment: { type: String },
  time: { type: Date }, 
  likes: [{type : Schema.Types.ObjectId, ref : 'Users'}],
  reply : [replySchema]
});

const Comments = mongoose.model<IComment>('Comments', CommentsSchema);

export default Comments;

