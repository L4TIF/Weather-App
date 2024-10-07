// this module handle rendering of data as it comes from api.
const renderTopSection = (data) => {

    // fetch dom elements
    const tempSection = document.getElementById('tempSection');
    const queryLocation = tempSection.querySelector('.location');
    const desc = tempSection.querySelector('.result');
    const icon = tempSection.querySelector('.icon img');
    const currentTemp = tempSection.querySelector('.temp');

    // render data
    desc.textContent = data.conditions || "no weather data found";
    queryLocation.textContent = data.address;
    currentTemp.innerHTML = getSelectedUnit(data.temp) + '&deg;';
    icon.src = require(`./assets/${data.icon}.png`)

}

const renderMiddleSection = (data) => {
    const mainContainer = document.querySelector('.hour-forcast');
    mainContainer.replaceChildren();

    data.forEach((element, index) => {
        const childContainer = document.createElement('div');
        childContainer.classList.add(...('single-hour flex min-w-32 flex-col gap-4 px-5 text-center justify-between').split(' '));

        if (index !== data.length - 1) childContainer.classList.add('border-r-2', 'border-r-[#2C3A4E]')

        const time = document.createElement('div');
        time.classList.add('time');
        time.textContent = convertTimeTo12HourFormat(element.datetime);

        const iconContainer = document.createElement('div');
        iconContainer.classList.add('icon-container');

        const icon = document.createElement('img');
        icon.classList.add('inline-block', 'object-contain');
        icon.src = require(`./assets/${element.icon}.png`)
        iconContainer.appendChild(icon);

        const temp = document.createElement('div');
        temp.classList.add('time-temp', 'text-lg', 'font-extrabold');
        temp.innerHTML = getSelectedUnit(element.temp) + '&deg;'

        childContainer.appendChild(time);
        childContainer.appendChild(icon);
        childContainer.appendChild(temp);
        mainContainer.appendChild(childContainer);


    });

}

const renderBottomSection = (data) =>{
 const realFeel = document.querySelector('.feels-like .data');
 const windSpeed = document.querySelector('.wind .data');
 const chanceOfRain = document.querySelector('.chances-of-rain .data');
 const uvIndex = document.querySelector('.uv-index .data');
 
    //render
    realFeel.innerHTML =  getSelectedUnit(data.feelslike) + '&deg;';
    windSpeed.textContent = data.windspeed + ' km/h';
    uvIndex.textContent = data.uvindex;
    chanceOfRain.textContent = data.precipprob + '%'
}









function convertTimeTo12HourFormat(timeString) {
    // Split the input time string into hours, minutes, and seconds
    const [hours, minutes] = timeString.split(':');

    // Convert the hours to a number
    let hourNumber = parseInt(hours, 10);

    // Determine AM or PM suffix
    const ampm = hourNumber >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hourNumber = hourNumber % 12 || 12; // Convert 0 to 12 for midnight

    // Format the minutes and return the formatted time
    return `${hourNumber}:${minutes} ${ampm}`;
}






const getSelectedUnit = (temp) => {
    const selectedUnit = document.querySelector('.toggle-btn input[name="temp-m"]:checked');
    if (selectedUnit.value === 'fahrenheit')
        return ((temp * 9.0 / 5.0) + 32.0).toFixed(0);
    return temp
}





export { getSelectedUnit, renderTopSection, renderMiddleSection,renderBottomSection }