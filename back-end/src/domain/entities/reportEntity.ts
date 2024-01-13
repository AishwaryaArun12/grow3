

interface detail {
    userId ?: string,
    time ?: Date,
    reason ?: string
}
export interface IReport{
    _id ?: string,
    itemId ?: string,
    details : detail[]
}
