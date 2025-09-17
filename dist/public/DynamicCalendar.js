import { ClassEvent } from "./ClassEvent.js";
//Gets important Elements of Calendar HTML File
const monthYearDisplay = document.getElementById('month-year');
const daysGrid = document.getElementById('days-grid');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
//Gets Current Date to highlight it
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
//Variable for our list of clasas events
let eventList = [];
//List of Months in Year
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
//Renders the Calendar based on the month/year being shown
function renderCalendar() {
    if (daysGrid != null && monthYearDisplay != null) {
        //blank out grid
        daysGrid.innerHTML = '';
        //Display Designated Month and Year
        monthYearDisplay.textContent = `${months[currentMonth]} ${currentYear}`;
        //Mark the First day of month and the number of days in the month
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        // Add empty cells for days before the 1st of the month
        //Year has 365 days. If this is Feb (after 31 days) cover Jan with blank spaces.
        for (let i = 0; i < firstDayOfMonth; i++) {
            const li = document.createElement('li');
            //classlist = css
            li.classList.add('empty');
            daysGrid.appendChild(li);
        }
        // Add days of the month
        //Loop is creating days starting at 1 and going through all days in month.
        for (let i = 1; i <= daysInMonth; i++) {
            //Create element for the day
            const li = document.createElement('li');
            //li text is the day of the month.
            li.textContent = i.toString();
            //Create element to contain the events
            const dayEvents = document.createElement('ul');
            dayEvents.className = 'events';
            //for all of the events
            for (const event of eventList) {
                //check if the event is in the day, and if it is...
                let eventDate = event.getDate();
                if (currentMonth == eventDate.getMonth() && currentYear == eventDate.getFullYear() && i == eventDate.getDate()) {
                    //Create elements to contain the event and its fields
                    const eventListing = document.createElement('li');
                    const eventFields = document.createElement('ul');
                    eventFields.className = 'eventItems';
                    //create element to contain time of event
                    const eventTime = document.createElement('li');
                    eventTime.textContent = eventDate.getHours() + ":" + eventDate.getMinutes() + ":" + eventDate.getSeconds();
                    eventFields.appendChild(eventTime);
                    //Create element to contain name of event
                    const eventName = document.createElement('li');
                    eventName.textContent = event.getName();
                    eventFields.appendChild(eventName);
                    //Create element to contain description of event
                    const eventDescription = document.createElement('li');
                    eventDescription.textContent = event.getDescription();
                    eventFields.appendChild(eventDescription);
                    //Create element to contain type of event
                    const eventType = document.createElement('li');
                    eventType.textContent = event.getEventType();
                    eventFields.appendChild(eventType);
                    //add event and event field elements to element containing all events of the day
                    eventListing.appendChild(eventFields);
                    dayEvents.appendChild(eventListing);
                }
            }
            //add element containing day's events to element containing the day
            li.appendChild(dayEvents);
            //if the date is the current one, highlight it
            if (i === currentDate.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
                li.classList.add('active');
            }
            //add element containing the day to the calendar
            daysGrid.appendChild(li);
        }
    }
}
//function to get list of events from JSON received
function sortToList(dataJSON) {
    console.log(dataJSON);
    for (const event of dataJSON.events) {
        let classEvent = new ClassEvent(event.name, event.description, event.eventType, event.date);
        eventList.push(classEvent);
    }
    console.log(eventList);
}
//if previous button is clicked, display previous month
if (prevBtn != null) {
    prevBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
}
//if next button is clicked, display next month
if (nextBtn != null) {
    nextBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
}
//Upon opening calendar page, call GET api to schedule to get the JSON contining the course events from the PDF
fetch('/api/schedule')
    //then accesses response. res contains Header Information (Probably)
    .then(res => res.json())
    //data contains information
    .then(data => {
    //call a helper message that sorts into list
    sortToList(data);
});
//Render the Calendar for the current month and year upon opening Calendar Page
renderCalendar();
//# sourceMappingURL=DynamicCalendar.js.map