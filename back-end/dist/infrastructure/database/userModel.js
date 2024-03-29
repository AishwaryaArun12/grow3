"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    headline: {
        type: String
    },
    country: {
        type: String
    },
    region: {
        type: String
    },
    coverPhoto: {
        type: String
    },
    profileImg: {
        type: String
    },
    otp: {
        type: String,
    },
    otpExpire: {
        type: Date
    },
    userType: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    followers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Users'
        }],
    viewers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    requests: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    pendings: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    primium: {
        endingDate: {
            type: Date
        },
        subscriptionId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Subscription'
        }
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    age: {
        type: Number
    },
    location: {
        type: String
    },
    qualification: {
        type: String
    }
});
var Users = mongoose_1.default.model('Users', userSchema);
exports.default = Users;
//# sourceMappingURL=userModel.js.map