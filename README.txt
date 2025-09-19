Course Syllabus PDF -> Calendar/Schedule

SETUP steps to deploy on Vercel:
-Copy Repo as your own repo
-Link it to a Vercel project
-In Project Build and Deployment settings:
---Use 'Express' Framework Preset
---Set Build Command to 'npx tsc'
---Set Output Directory as /dist
-In Environment Variables Settings:
---Add your key to OpenAI as 'OPENAI_API_KEY'
-Go to Vercel project's storage and click 'Create Database', then select 'Blob storage', name the storage, and create it.

NOTE:
Program is not currently built to operate on a wide scale, or handle any more than 1 request.
To work more than locally, it will need a database and User Identification to store the JSONs and return the specific JSONs to their specific users.
User Identification on GET and POST requests, and numerous server instances would be required to return to operate on a large scale.

DESIGN THOUGHT PROCESS

This project was interesting for me, as I haven't worked with most of the technologies used in this project before. I haven't before used Typescript, Node.JS, or Vercel at all, and I have only done the most minimal of tutorials with CSS/HTML and JavaScript. As such, my design decisions for this project were mostly based around what would A) Be the simplest for me to accomplish as somebody still learning this particular tech stack, and B) What would allow me to learn the technologies that I was working with, and how they would interact.

The project uses a client server set-up, as that was what was most supported by Node.JS and Vercel. Express is used because it is the easiest way to set this up using these technologies, as Express has integration as a framework preset with Vercel, and can easily be used to set-up a server locally. The current project is designed to work with Vercel, as those are the submission requirements.

The project is completed in two simple screens-One where the file is uploaded, and one where the calendar is displayed. Each of these screens exist as an HTML file with one associated JavaScript file, generated from a Source Typescript file. There is also a Typescript file for the server itself, and one that handles the processing of the PDF. This includes both the communication with OPENAI, and sorting the returned information from the JSON. This PDF processing exists in a separate class for easier readability and to allow for asynchronous file handling. Lastly, the project contains two Typescript POJO (Plain Old Java Object) Files to store the actual course events. POJOs are just classes that contain all of the information for an item, but only really has a Constructor, Getters, and Setters as its functions. One is the event itself and all of its information, the other is just a list of all the events.

Notably, I use both Interfaces and POJOs for handling of the data. This is because Typescript has easy direct mapping to local interfaces, but not to POJOs. However, having the POJO is important both for good design principles, and because it allows me to convert the string containing the Date and Time to a Date object, which allows easy comparisons of dates. As such, I convert the JSONs containing the information to the Interfaces as an intermediary step, and then use that interface to construct the POJOs, which are the end form of data that I use for processing and display.

Thank you for looking at and reviewing this project/application, and please let me know what I can improve on!