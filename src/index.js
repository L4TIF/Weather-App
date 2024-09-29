import "./style.css";


// get data by location
const fetchData = async (location) => {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=EXMJNVS7XJK4WNG6ATHXBUBG2&contentType=json`)
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error(err)
    }
}

// extract the data that needed
const processData = async (location) => {
    const data = await fetchData(location);
    const { datetime, humidity, conditions, temp, windspeed, feelslike } = data.currentConditions;
    return { datetime, humidity, conditions, temp, windspeed, feelslike }
}

