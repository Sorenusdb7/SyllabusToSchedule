import * as fs from 'fs';
import * as OpenAI from 'openai';
import { ClassEvent } from "./public/ClassEvent.js";
import { ClassEventList } from "./public/ClassEventList.js";

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();


//Support/Set-Up Steps
const openAIKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI.OpenAI({
    apiKey: openAIKey,
});

//Interface to receive a List of Events from a JSON
interface JSONEventList {
    events: JSONEvent[];
}

//Interface to receive an event object from a JSON
interface JSONEvent {
    name: string;
    description: string;
    eventType: string;
    date: string;
}

//Class used to convert a PDF into usable information asynchronously
export class PDFInteracter {

    //Contains the List of Class Events that were obtained from the PDF
    private eventList : ClassEventList = new ClassEventList([]);
    //Field to tell when the PDF is done being processed
    private processed: boolean = false;

    //Getter for the eventList
    getEventList(): ClassEventList
    {
        return this.eventList;
    }

    //Setter for the eventList
    setEventList(eventList: ClassEventList): void
    {
        this.eventList = eventList;
    }

    //Getter for the processed
    getProcessed(): boolean
    {
        return this.processed;
    }

    //Setter for the processed
    setProcessed(processed: boolean): void
    {
        this.processed = processed;
    }

    //Function to process the PDF by sending it to OpenAI, then sorting the result.
    async processPDF(filePath: string) {

        console.log("Fetching from blob");

        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch PDF: ${response.statusText}`);
            }

            console.log("File received from blob");

            //Send the PDF to open AI
            const aifile = await openai.files.create({
                file: response, // Or a Blob in the browser
                purpose: 'user_data', // or 'fine-tune'
            });
            console.log('File uploaded with ID:', aifile.id);
            //Tell open AI to reaad the PDF and process it into a JSON based on our prompt, then stores the result.
            const response2 = await openai.responses.create({
                input: [{ role: 'user',
                    content: [{type: 'input_file',
                        file_id: aifile.id
                    },
                    {
                        type: 'input_text',
                        text: 'Read the file and give me a schedule for the course in the format of a JSON. The schedule should be a list of events. Each event should have a name,  description,  an eventType, and a date. The eventType should be one of class, assignment, test, or project. The date should include the date and the time in this format. Use this as an example of how to format the date: 2025-10-29T10:30:00Z. The time should be the starting time of classes for the course unless specified otherwise.'
                    }]
                }],
                model: 'gpt-4o'
            });
            console.log(response2.output_text);
            try {
                //Cuts off any excess information from the response from openAI other than the JSON
                let jsonString: string = response2.output_text;
                if(jsonString.includes("[") && jsonString.indexOf("[") != 0) {
                    jsonString = jsonString.slice(jsonString.indexOf("["));
                }
                if(jsonString.includes("]") && jsonString.indexOf("]") != jsonString.length - 1) {
                    jsonString = jsonString.slice(0, jsonString.indexOf("]") + 1);
                }
                //formats the JSON as a list of events
                jsonString = "{\n\"events\": " + jsonString + "\n}";
                console.log(jsonString);
                //Converts the JSON into our JSONEventList interface
                const responseJSON: JSONEventList = JSON.parse(jsonString);
                console.log(responseJSON);
            
                //Converts the interface into our Class of Lists of Events (Important for how we store the Date and Time)
                for (const event of responseJSON.events) {
                    let classEvent : ClassEvent = new ClassEvent(event.name, event.description, event.eventType, event.date);
                    this.eventList.getEvents().push(classEvent);
                }
            
                //Sorts our List based on Earliest Date and Time, then Alphabetically.
                let orderedList : ClassEvent[] = [];
                for (const event of this.eventList.getEvents()) {
                    if (orderedList.length === 0) {
                        orderedList.push(event);
                    }
                    else {
                        let placed : boolean = false;
                        for (let i = 0; i < orderedList.length; i++) {
                            const date1 = event.getDate();
                            const date2 = orderedList[i]?.getDate();
                            if(date2 !== undefined && date1 < date2) {
                                orderedList.splice(i, 0, event);
                                placed = true;
                                break;
                            }
                            else if(date2 !== undefined && !(date1 < date2) && !(date1 > date2)) {
                                console.log("Dates were the same");
                                const name1 = event.getName();
                                const name2 = orderedList[i]?.getName();
                                if(name2 !== undefined && name1 < name2) {
                                orderedList.splice(i, 0, event);
                                placed = true;
                                break;
                                }
                            }
                        }
                        if(placed == false) {
                            orderedList.push(event);
                        }
                    }
                }

                this.eventList.setEvents(orderedList);

                this.processed = true;
            } catch (error) {
                console.error('Error reading or parsing JSON file:', error);
            }

        } catch (error) {
            console.error("Error reading PDF from Vercel Blob:", error);
        }

    }
}
