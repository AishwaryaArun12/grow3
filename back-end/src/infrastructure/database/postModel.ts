import mongoose, { Schema} from 'mongoose';
import { IPost } from '../../domain/entities/postEntity';

const PostSchema: Schema = new Schema({
  description: { type: String },
  media: { type: String },
  comments: [{type : Schema.Types.ObjectId, ref : 'Comments',default : []}],
  time: { type: Date },
  likes: [ {type: Schema.Types.ObjectId, ref : 'Users'}],
  userId: { type: Schema.Types.ObjectId , ref : 'Users'},
});

const Post = mongoose.model<IPost>('Post', PostSchema);

export  {Post};

