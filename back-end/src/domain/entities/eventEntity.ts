export interface IEvent{
    _id ?: string,
    name ?: string,
    description ?: string,
    endTime?: Date,
    startTime ?: Date,
    eventLink ?: string[],
    userId ?: string | object
    attendees ?: string[];
}