// Base URL of the Open Meteo API endpoint
const baseUrl = 'https://api.open-meteo.com/v1/forecast';

// Query parameters as a JavaScript object
const queryParams = {
    latitude: -27.472984,
    longitude: 153.079169,
    current_weather: true,
};

// Convert the query parameters object into a query string
const queryString = new URLSearchParams(queryParams). toString();

// Full URL with query parameters
// const urlWithParams = '${baseurl}?${queryString}';
const urlWithParams = baseUrl + "?"+queryString;

// Request options
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

// Making the fetch call
fetch(urlWithParams, requestOptions)
.then(response => response.json())
.then(data => {
    const weather = data.current_weather;
    console.log("Current temperature: " + weather.temperature + "C");
    const temperature_element = document.getElementById('current_temperature');
    const windspeed_element = document.getElementById('current_windspeed');
    temperature_element.innerText = weather.temperature + "C";
    windspeed_element.innerText = weather.windspeed + "kph"
})
.catch(error => console.log('error', error));