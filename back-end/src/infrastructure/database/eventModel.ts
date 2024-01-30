import mongoose, { Schema} from 'mongoose';
import { IEvent } from '../../domain/entities/eventEntity';

const EventSchema: Schema = new Schema({
  description: { type: String },
  media: { type: String },
  name: {type : String},
  startTime: { type: String },
  endTime:{type : String},
  attendees : [ {type: Schema.Types.ObjectId, ref : 'Users'}],
  userId: { type: Schema.Types.ObjectId , ref : 'Users'},
  eventLink : {type :String}, 
  speakers : [{type: String}]
});

const Event = mongoose.model<IEvent>('Event', EventSchema);

export  {Event};

