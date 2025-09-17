import * as fs from 'fs';
import { ClassEvent } from "./public/ClassEvent.js";
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
//Reading a JSON
// Synchronous
let eventList = [];
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
async function main() {
    const file = await openai.files.create({
        file: fs.createReadStream('TestSyllabus.pdf'), // Or a Blob in the browser
        purpose: 'user_data', // or 'fine-tune'
    });
    console.log('File uploaded with ID:', file.id);
    const response2 = await openai.responses.create({
        input: [{ role: 'user',
                content: [{ type: 'input_file',
                        file_id: file.id
                    },
                    { type: 'input_text',
                        text: 'Read the file and give me a schedule for the course in the format of a JSON. The schedule should be a list of events. Each event should have a name,  description,  an event type, and a date. The event type should be one of class, assignment, test, or project. The date should include the date and the time in this format. Use this as an example of how to format the date: 2025-10-29T10:30:00Z. The time should be the starting time of classes for the course unless specified otherwise.'
                    }]
            }],
        model: 'gpt-4o'
    });
    console.log(response2.output_text);
    try {
        let jsonString = response2.output_text;
        if (jsonString.includes("[") && jsonString.indexOf("[") != 0) {
            jsonString = jsonString.slice(jsonString.indexOf("["));
        }
        if (jsonString.includes("]") && jsonString.indexOf("]") != jsonString.length - 1) {
            jsonString = jsonString.slice(0, jsonString.indexOf("]") + 1);
        }
        const responseJSON = JSON.parse(jsonString);
        console.log(responseJSON);
    }
    catch (error) {
        console.error('Error reading or parsing JSON file:', error);
    }
}
try {
    const rawData = fs.readFileSync('./TestExample.json', 'utf8');
    const myObject = JSON.parse(rawData);
    console.log(myObject);
    console.log(myObject.events[0]?.name);
    console.log(myObject.events[1]?.date);
    console.log(myObject.events[2]?.name);
    for (const event of myObject.events) {
        let classEvent = new ClassEvent(event.name, event.description, event.eventType, event.date);
        eventList.push(classEvent);
    }
    let orderedList = [];
    for (const event of eventList) {
        if (orderedList.length === 0) {
            orderedList.push(event);
        }
        else {
            let placed = false;
            for (let i = 0; i < orderedList.length; i++) {
                const date1 = event.getDate();
                const date2 = orderedList[i]?.getDate();
                if (date2 !== undefined && date1 < date2) {
                    orderedList.splice(i, 0, event);
                    placed = true;
                    break;
                }
                else if (date2 !== undefined && !(date1 < date2) && !(date1 > date2)) {
                    console.log("Dates were the same");
                    const name1 = event.getName();
                    const name2 = orderedList[i]?.getName();
                    if (name2 !== undefined && name1 < name2) {
                        orderedList.splice(i, 0, event);
                        placed = true;
                        break;
                    }
                }
            }
            if (placed == false) {
                orderedList.push(event);
            }
        }
    }
    console.log(orderedList);
}
catch (error) {
    console.error('Error reading or parsing JSON file:', error);
}
main();
//# sourceMappingURL=index.js.map