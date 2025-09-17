import { ClassEvent } from "./ClassEvent.js";

//Class containing a list of class events for class courses. Used to move and iterate through all events at once
export class ClassEventList {
    //list of the ClassEvents for a course
    private events: ClassEvent[];

    //all-fields constructor for the class
    constructor(events: ClassEvent[])
    {
        this.events = events;
    }

    //Getter for events
    getEvents(): ClassEvent[]
    {
        return this.events;
    }

    //Setter for events
    setEvents(events: ClassEvent[]): void
    {
        this.events = events;
    }
}