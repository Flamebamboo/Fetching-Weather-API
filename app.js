//Weather API

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');

const apiKey = "0c49a5733796901c7832d99a9023e508";


weatherForm.addEventListener('submit', async e => {

    e.preventDefault(); // we use this because we don't want the form to submit and refresh the page

    const city = cityInput.value;

    if(city){

        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }

        catch(error){
            console.error(error);
            displayError(error);

        }

    }
    else{
        displayError("Please enter a city");
    }

});

//async function is a function that returns a promise and can use await inside it
async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data");

    }

    return await response.json();

}

function displayWeatherInfo(data){
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
        
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherIcon = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDisplay.textContent = description;
    weatherIcon.textContent = getWeatherIcon(id);

    card.appendChild(cityDisplay);
    cityDisplay.classList.add("cityDisplay");

    card.appendChild(tempDisplay);
    tempDisplay.classList.add("tempDisplay");
    
    card.appendChild(humidityDisplay);
    humidityDisplay.classList.add("humidityDisplay");

    card.appendChild(descDisplay);
    descDisplay.classList.add("descDisplay");

    card.appendChild(weatherIcon);
    weatherIcon.classList.add("weatherIcon");
}


function getWeatherIcon(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";

        case (weatherId >= 300 && weatherId < 400):
            return "⛅️";
        
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";

        case (weatherId === 800):
            return "☀️"

        case (weatherId >= 801 && weatherId < 810):
            return "☁️";

        default:
            return "❓";

    }


}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = " ";
    card.style.display = "flex";
    card.appendChild(errorDisplay); 

}