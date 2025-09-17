//Class containing an Event for a Course
export class ClassEvent {
    //The Time and Date of the event
    date;
    //The Name of the Event
    name;
    //Whether the event is an assignment, class, test, project, or anything else.
    eventType;
    //The description of the event.
    description;
    //All-Fields constructor for the class.
    constructor(name, description, eventType, date) {
        this.name = name;
        this.eventType = eventType;
        this.description = description;
        this.date = new Date(date);
    }
    //Getter for the name
    getName() {
        return this.name;
    }
    //Setter for the name
    setName(name) {
        this.name = name;
    }
    //Getter for the eventType
    getEventType() {
        return this.eventType;
    }
    //Setter for the eventType
    setEventType(eventType) {
        this.eventType = eventType;
    }
    //Getter for the description
    getDescription() {
        return this.description;
    }
    //Setter for the description
    setDescription(description) {
        this.description = description;
    }
    ////Getter for the date
    getDate() {
        return this.date;
    }
    //Setter for the date
    setDate(date) {
        this.date = new Date(date);
    }
}
//# sourceMappingURL=ClassEvent.js.map