/* global constant variables */
const photoFileInputLabel = document.getElementById('photo-file-input-label');
const photoFileInput = document.getElementById('photo-file-input');
const myInput = document.querySelector("#date_time")
const fp = flatpickr(myInput, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
})
const baseURLCommunityEvents = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/comments/";
const postCommunityEventMethod = 'POST';
const triggerFileInput = () => {
    photoFileInput.click();
};

const handFileChange = () => {
    let fileName = photoFileInput.files(0).name;
    
    if(fileName.length > 20) {
        fileName = fileName.substring(0, 17) + '...';
    }

    photoFileInputLabel.textContent = fileName;
};

const handleFormSubmit = event => {
    event.preventDefault();

    let formData = new FormData(event.target);
    formData.append("website_code", my_website_code);

    const requestOptions = {
        method : postCommunityEventMethod,
        body: formData,
        redirect: 'follow'
    }

    fetch(baseURLCommunityEvents, requestOptions)
    .then(response => response.json().then(data => {
        if(!response.ok) {
            console.log("Server response:", data);
            throw new Error("Network response was not ok");
        }
        return data;
}))
    .then(data =>{
        console.log(data.description);
        eventForm.reset();
        photoFileInputLabel.textContent = "Add a photo(Optional)";
        alert(`Your event ${data.description} has been added, Thanks!`);
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error.message);
        alert("Error submitting event. Please try again.");
    })
            
}
/* event listeners */
photoFileInputLabel.addEventListener('click', triggerFileInput);
photoFileInput.document.getElementById('change', handFileChange);
evenForm.addEventListener("submit,", handleFormSubmit);
/* page setup on first load */
