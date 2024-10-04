import "./style.css";

const form = document.querySelector('form');

// get data by location
const fetchData = async (location) => {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=EXMJNVS7XJK4WNG6ATHXBUBG2&contentType=json`)
        if (!response.ok)
            throw new Error("Something went wrong", response.status, response.statusText);

        const data = await response.json();
        console.log(data)
        return data;
    }
    catch (err) {
        console.error(err)
    }
}

// extract the data that needed
const processData = async (location) => {

    const data = await fetchData(location);
    if (data) {
        const { description, resolvedAddress: address, timezone } = data;
        const { datetime, humidity, conditions, temp, windspeed, feelslike, icon } = data.currentConditions;
        return { datetime, humidity, conditions, temp, windspeed, feelslike, description, address, timezone, icon }
    }
}

// handle form sumbit
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = document.querySelector('input').value;
    const result = document.querySelector('.result');
    const location = document.querySelector('.location');
    const temp = document.querySelector('.temp');
    const icon = document.querySelector('.icon img');

    const dataObj = await processData(input);
    if (dataObj) {
        result.textContent = dataObj.conditions || "no weather data found";
        location.textContent = dataObj.address;
        temp.innerHTML = dataObj.temp + '&deg;';
        icon.src = require(`./assets/${dataObj.icon}.png`)

    } else {
        result.textContent = 'invalid city name'
    }
    console.log(dataObj)
})