import express from 'express';
import path from 'path';
import { put } from '@vercel/blob';
import { fileURLToPath } from 'url';
import { PDFInteracter } from "./PDFInteracter.js";
import multer from 'multer';
//import cors from 'cors';
//Set up to get the location of our files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
let pdfInteracter = new PDFInteracter();
// Serve static files from public/
//app.use(express.static(path.join(__dirname, '/public')));
//app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });
console.log("Starting Up 1");
console.error("Starting Up 2");
// Home route - HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/Upload.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Upload.js'));
});
//POST API REQUEST
//Receives PDF for processing
app.post("/api/upload", upload.single("pdf"), async (req, res) => {
    console.log("Received a Request");
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        const file = req.file;
        // file.buffer contains the PDF data as a Buffer
        console.log("Received PDF in memory:");
        console.log("Original name:", file.originalname);
        console.log("Size (bytes):", file.size);
        console.log("Storing in Blob");
        //contains url
        const blob = await put(file.originalname, file.buffer, {
            access: 'public', // Or 'private'
            addRandomSuffix: true,
        });
        console.log("Successfully Storing in Blob. URL: " + blob.url);
        console.log("Successfully Storing in Blob. Download URL: " + blob.downloadUrl);
        // Check if it's a valid PDF by looking at the header and respond if it isn't
        const isPDF = file.mimetype === "application/pdf";
        if (!isPDF) {
            return res.status(400).json({ message: "Uploaded file is not a valid PDF." });
        }
        console.log("Reached Processing");
        //Starts processing the PDF asynchronously
        pdfInteracter.processPDF(blob.url);
        // Tell that we've successfully received PDF
        return res.json({
            message: "PDF received and is being processed. Please wait.",
            filename: file.originalname,
            size: file.size
        });
    }
    catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file.' });
    }
});
//GET API REQUEST
//Returns the Event List from the course in the PDF
app.get('/api/schedule', (req, res) => {
    res.json(pdfInteracter.getEventList());
});
//GET API REQUEST
//Returns if the processing is finished
app.get('/api/checkProcess', (req, res) => {
    console.log("Received a Check");
    res.json({ "processed": pdfInteracter.getProcessed() });
});
//Starts server
/*
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
*/
export default app;
//# sourceMappingURL=index.js.map