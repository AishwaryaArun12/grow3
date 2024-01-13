import mongoose, {Document, ObjectId, Schema} from "mongoose";

import {User} from '../../domain/entities/userEntity'


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
    },
    headline : {
        type : String
    },
    country : {
        type : String
    },
    region : {
        type : String
    },
    coverPhoto : {
        type : String
    },
    profileImg : {
        type : String
    },
    
    otp : {
        type: String,
    },
    
    otpExpire : {
        type : Date
    },
    userType : {
        type : String,
        
    },
    verified : {
        type : Boolean,
        default : false
    },
    followers : [{
        type : Schema.Types.ObjectId,
        ref : 'Users'
    }],
    viewers : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Users'
        }
    ],
    requests : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Users'
        }
    ],
    pendings : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Users'
        }
    ],
    primium : {
        endingDate : {
            type : Date,
            expires: 0,
        },
        subscriptionId : {
            type : Schema.Types.ObjectId,
            ref : 'Subscription'
        }
    },
    description : {
        type : String
    },
    active : {
        type : Boolean,
        default : true
    },
    age: {
        type : Number
    },
    location : {
        type : String
    },
    qualification : {
        type : String
    }
});

const Users = mongoose.model<User>('Users' , userSchema);

export default Users;