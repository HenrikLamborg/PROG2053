// Array with name, latitude, and longitude
const locations = [
    { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
    { name: "New York", latitude: 40.7128, longitude: -74.0060 },
    { name: "London", latitude: 51.5074, longitude: -0.1278 },
    { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
    { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
    { name: "Berlin", latitude: 52.5200, longitude: 13.4050 }
];


// Async function to fetch weather data for a specific latitude and longitude
async function fetchWeather (latitude, longitude){

    try {
        // Fetch the weather data and using the latitude and longitude
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await  response.json();
        return data.current_weather; // Return the current weather data from the response
    } catch (error){
        console.log('error fetching'); // logging errors
    }

}
// Async function to display weather data for each location
async function display(){

    const container = document.getElementById('weather');
    container.innerHTML = '';  // Clear the container before updating with new data

    // Loop through each location in the 'locations' array
    for (const location of locations){
        // Fetch the weather for the current location
        const weatherData = await fetchWeather(location.latitude, location.longitude);
        if(weatherData) {
            // Create a new div with this structure
            const weatherDiv = document.createElement('div');
            weatherDiv.innerHTML = `
            <ul class = "data">
               <li>${location.name}</li> 
                <li>${weatherData.temperature}°C</li>
                <li>Wind: ${weatherData.windspeed} km/h</li>
             <li>Condition: ${weatherData.weathercode}</li>
             </ul>
            `;
            container.appendChild(weatherDiv); // Append the weather div to the container
        }
    }
}

display(); // Call the display function
setInterval(display, 10000); // setting interval for the updating of data