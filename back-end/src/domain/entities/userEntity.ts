
export interface User  {
    _id ?: string,
    name : string | null,
    email : string | null,
    profileImg ? : string ,
    displayName ? : string,
    age ?: number ,
    qualification ?: string,
    coverPhoto ?: string,
    userType ?: string,
    verified ?: boolean,
    followers ?: string[],
    viewers ?: string[],
    requests ?: string[],
    pendings ?: string[],
    premium ?: {
        endingDate : Date,
        subscriptionId : string
    },
    country ?: string,
    region ?: string,
    headline ?: string,
    otp ?: string,
    otpExpire ?: Date,
    password ?: string ,
    description ?: string,
    active ?: Boolean,
    location ?: string
}