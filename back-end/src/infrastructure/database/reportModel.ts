import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { IReport } from '../../domain/entities/reportEntity';

const detailSchema = new Schema({
  userId : {type : Schema.Types.ObjectId, ref : 'Users'},
  reason : {type: String},
  time : {type : Date},
})

const PostReportsSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  details: [detailSchema],
});

const CommentReportsSchema = new Schema({
    commentId: { type: Schema.Types.ObjectId, ref: 'Comments' },
    details: [detailSchema],
  });

export const PostReports = mongoose.model<IReport>('PostReports', PostReportsSchema);

export const CommentReports = mongoose.model<IReport>('CommentReports', CommentReportsSchema);


