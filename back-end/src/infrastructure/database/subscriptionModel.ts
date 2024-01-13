import mongoose, { Schema } from 'mongoose';
import Isubscription from '../../domain/entities/subscriptionEntity';


const SubscriptionSchema = new Schema({
  name: { type: String },
  features : {type: [String]},
  fees : {type: Number},
  duration : {type: Number},
  durationIn : {type: String}
});


const Subscriptions = mongoose.model<Isubscription>('Subscription', SubscriptionSchema);

export default Subscriptions;
