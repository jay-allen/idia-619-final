/*
 *
 *      Config Variables
 *
 *      Edit these to match your local setup
 */
const dataLocation        = '/assets/js/week-6/weather.txt';
const imageLocationPrefix = '/assets/img/week-6/';


let weatherList = document.querySelector(".js-weather");

fetch(dataLocation)
.then( response => {
    // https://gomakethings.com/getting-html-with-fetch-in-vanilla-js/
    let data = response.text();
    return data;
    
})
.then(data => {
    let test = JSON.parse(data);    

    const markup = renderWeather(test);
    const newElement = appendHtml(markup, "ul");
    weatherList.appendChild(newElement);
    
})
.catch( err => console.warn("Error", err) );

// Helper object to access provided images
let iconLocation = {
    clear: {
        "url": imageLocationPrefix + "clear.png",
        "alt": "clear weather"
    },
    cloudy: {
        "url": imageLocationPrefix + "cloudy.png",
        "alt": "cloud weather"
    },
    mostlysunny: {
        "url": imageLocationPrefix + "mostlysunny.png",
        "alt": "mostly sunny weather"
    },
    rain03: {
        "url": imageLocationPrefix + "rain03.png",
        "alt": "rainy weather"
    },
    thunderstorms01: {
        "url": imageLocationPrefix + "thunderstorms01.png",
        "alt": "thunderstorm weather"
    },
};

function createWeatherHtml(weatherJson) {
    let html = "";
    weatherJson.forEach((weather) => {
        let date = `<div>${weather.date}</div>`;
        let temperature = `<div>${weather.temperature}</div>`;

        html += date + temperature;
    });
    return html;
}

function renderWeather(weatherJson) {
    //  https://wesbos.com/template-strings-html
    return `
        ${weatherJson
            .map(
                (weather) => `
            <li class="o-media">
                <div class="o-media__img">
                    <img src="${getIcon(weather).url}" alt="${getIcon(weather).alt}" />
                </div>
                <div class="o-media__content">
                    <h2>${weather.date}</h2>
                    <div class="weather-detail">
                        <div class="weather-detail__label">Temperature</div>
                        <div>${weather.temperature}</div>
                    </div>
                    <div class="weather-detail">
                        <div class="weather-detail__label">Chance of precipitation</div>
                        <div>${weather.precipitation}%</div>
                    </div>
                    <div class="weather-detail">
                        <div class="weather-detail__label">Clouds</div>
                        <div>${weather.clouds}%</div>
                    </div>
                </div>
            </li>
        `
            )
            .join("")}
    `;
}

function appendHtml(htmlString, elementType) {
    let element = document.createElement(elementType);
    element.innerHTML = htmlString;
    return element;
}

function getIcon(weather) {
    if (!weather) {
        return;
    }

    if (weather.precipitation >= 80) {
        return iconLocation.rain03;
    }

    if (weather.clouds > 75) {
        return iconLocation.cloudy;
    }
    if (weather.clouds < 75 && weather.clouds > 25) {
        return iconLocation.mostlysunny;
    }

    return iconLocation.clear;
}