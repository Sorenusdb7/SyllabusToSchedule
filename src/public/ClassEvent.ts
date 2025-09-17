//Class containing an Event for a Course
export class ClassEvent {
    //The Time and Date of the event
    private date: Date;
    //The Name of the Event
    private name: string;
    //Whether the event is an assignment, class, test, project, or anything else.
    private eventType: string;
    //The description of the event.
    private description: string;

    //All-Fields constructor for the class.
    constructor(name: string, description: string, eventType: string, date: string)
    {
        this.name = name;
        this.eventType = eventType;
        this.description = description;
        this.date = new Date(date);
    }

    //Getter for the name
    getName(): string
    {
        return this.name;
    }

    //Setter for the name
    setName(name: string): void
    {
        this.name = name;
    }

    //Getter for the eventType
    getEventType(): string
    {
        return this.eventType;
    }

    //Setter for the eventType
    setEventType(eventType: string): void
    {
        this.eventType = eventType;
    }

    //Getter for the description
    getDescription(): string
    {
        return this.description;
    }

    //Setter for the description
    setDescription(description: string): void
    {
        this.description = description;
    }

    ////Getter for the date
    getDate(): Date
    {
        return this.date;
    }

    //Setter for the date
    setDate(date: string): void
    {
        this.date = new Date(date);
    }
}