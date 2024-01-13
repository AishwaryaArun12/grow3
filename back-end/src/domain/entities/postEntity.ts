
export interface IPost{
    _id ?: string,
    description ?: string,
    media ?: string,
    comments?: object[],
    time ?: Date,
    likes ?: string[],
    userId ?: string | object
}

export interface IComment{
    _id ?: string,
    time ?: Date,
    postId ?: string,
    userId ?:string,
    likes ?: string[],
    comment ?: string,
    reply ?: object[];
}