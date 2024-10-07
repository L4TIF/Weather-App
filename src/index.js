
import { getSelectedUnit, renderBottomSection, renderMiddleSection, renderTopSection } from "./render";
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

        const { description, resolvedAddress: address, timezone, days } = data;
        const { datetime, humidity, conditions, temp, windspeed, feelslike, icon, precipprob, uvindex } = data.currentConditions;
        return { datetime, humidity, conditions, temp, windspeed, feelslike, description, address, timezone, icon, days, precipprob, uvindex }
    }
}

// handle form sumbit
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = document.querySelector('input').value;
    const loader = document.getElementById('loader');
    loader.classList.remove('hidden');

    const dataObj = await processData(input);


    if (dataObj) {
        renderTopSection(dataObj);
        renderMiddleSection(dataObj.days[0].hours);
        renderBottomSection(dataObj)
    } else {
        console.log('invalid city')
    }

})


const defaultLocation = (async () => {
    const loader = document.getElementById('loader');
    loader.classList.remove('hidden');
    const input = 'mango jamshedpur';
    const dataObj = await processData(input);
    loader.classList.add('hidden');
    if (dataObj) {
        renderTopSection(dataObj);
        renderMiddleSection(dataObj.days[0].hours);
        renderBottomSection(dataObj)
    } else {
        console.log('invalid city')
    }
})();