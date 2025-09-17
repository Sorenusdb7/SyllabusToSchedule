//Class containing a list of class events for class courses. Used to move and iterate through all events at once
export class ClassEventList {
    //list of the ClassEvents for a course
    events;
    //all-fields constructor for the class
    constructor(events) {
        this.events = events;
    }
    //Getter for events
    getEvents() {
        return this.events;
    }
    //Setter for events
    setEvents(events) {
        this.events = events;
    }
}
//# sourceMappingURL=ClassEventList.js.map