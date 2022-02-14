// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var x = document.getElementById("demo");


// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);


//get gps
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    // let lat = position.coords.latitude;
    // let lng = position.coords.longitude;
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }
const lat = 54.698369;
const lng = 25.296383;
let url = `https://geocode.farm/v3/json/reverse/?lat=${lat}&lon=${lng}&country=us&lang=en&count=1`;

async function showAdd() {

  const response = await fetch(url);
  const data = await response.json();  
  const results = await data.geocoding_results.RESULTS[0];
  const resultsAddr = results.ADDRESS;
  document.querySelector('.results').innerHTML += `<div>${results.formatted_address}</div>`;
  document.querySelector('.results').innerHTML += `<div>${resultsAddr.admin_2}, ${resultsAddr.street_name}, ${resultsAddr.street_number}.</div>`;
  console.log(data); 
  console.log (results);
  console.log(resultsAddr);
}
showAdd().catch(error => {
    console.log('caught error');
    console.error(error);
})

