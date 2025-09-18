//Get elements from initial HTML page
const form = document.getElementById("uploadForm");
const fileInput = document.getElementById("pdfFile");
console.log("Loaded");
//If elements are not null
if (form != null && fileInput != null) {
    //add listener on the submit/upload button
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        //if a file has been input
        if (fileInput.files != null) {
            const file = fileInput.files[0];
            if (!file) {
                console.log("See if we're logging");
                return alert("No file selected.");
            }
            //add the file to a form data object
            console.log("Check 1");
            const formData = new FormData();
            console.log("Check 2");
            formData.append("pdf", file);
            console.log("Check 3");
            try {
                //send the file to the server with a POST request
                console.log("Uploading a file");
                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData
                });
                //Get the response of the upload
                const result = await response.json();
                alert("Upload status: " + result.message);
                //Check to see if we've Processed the PDF once per second
                let processed = false;
                const intervalId = setInterval(() => {
                    console.log("Waiting for response");
                    //use a GET request to checkProcess to see if it has been uploaded
                    fetch('/api/checkProcess')
                        .then(res => res.json())
                        .then(data => {
                        //if we have processed the PDF, move to the Calendar page
                        if (data.processed == true) {
                            console.log("Setting to True");
                            processed = true;
                            window.location.href = 'Calendar.html';
                        }
                        else {
                            console.log(data.processed);
                        }
                    });
                    if (processed === true) {
                        clearInterval(intervalId);
                    }
                }, 1000);
            }
            catch (err) {
                console.error(err);
                alert("Upload failed.");
            }
        }
    });
}
export {};
//# sourceMappingURL=Upload.js.map