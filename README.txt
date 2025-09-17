Course Syllabus PDF -> Calendar/Schedule

SETUP steps:
-Create .env file in ROOT directory with OpenAI API key under the name OPENAI_API_KEY
-Open terminal in Root and run command "npx tsc"
-Run Command "node dist/server.js"
-Open http://localhost:3000 in browser and upload file
-Click OK on Alert and then wait until page changes to calendar when the PDF is done being processed.

NOTE:
Program is not currently built to operate on a wide scale, or handle any more than 1 request.
To work more than locally, it will need a database and User Identification to store the JSONs and return the specific JSONs to their specific users.
User Identification on GET and POST requests, and numerous server instances would be required to return to operate on a large scale.