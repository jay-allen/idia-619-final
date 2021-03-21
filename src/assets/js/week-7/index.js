

const weatherDisplayLocation = document.querySelector('.js-weather-results');
const submitBtn = document.querySelector('form button[type="submit"]');
submitBtn.addEventListener('click', getWeather);

function getWeather(event) {

	event.preventDefault();

	const apiUrl = getApiUrl();

	console.log(apiUrl);
	fetch(apiUrl, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "1ae5caff17msh1427d7c4bdbf408p18ec1ajsnd1ca552a79a6",
			"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
		}
	})
	.then(response => response.json())
	.then(data => {
		console.log("data", data);

		weatherDisplayLocation.classList.remove("u-hidden");

		const markup = getWeatherHTML(data);
		const newElement = appendHtml(markup, "div");
		weatherDisplayLocation.innerHTML = "";
		weatherDisplayLocation.appendChild(newElement);
	})
	.catch(err => {
		console.error("err",err);
	});
}

function getApiUrl() {

	let apiUrl = "https://community-open-weather-map.p.rapidapi.com/weather?units=imperial";
	const zip  = document.querySelector('#zip') ? document.querySelector('#zip').value : null;
	const city = document.querySelector('#city') ? document.querySelector('#city').value : null;
 
	if (city) {
		apiUrl += `&q=${city}`;
		return apiUrl;
	}
	
	if (zip) {
		apiUrl += `&zip=${zip}`;
		return apiUrl;
	}

	return;
}


function getWeatherHTML(data) {
	const city 			= data.name || "Not Found";
	const temperature 	= Math.round(data.main.temp) || "Not Found";
	const description 	= data.weather[0].description.toUpperCase() || "Not Found";

	return `
		<div class="result__city">${city}</div>
		<div class="result__temperature">${temperature}&deg;F</div>
		<div class="result__description">${description}</div>
	`
}

function appendHtml(htmlString, elementType) {
    let element = document.createElement(elementType);
    element.innerHTML = htmlString;
    return element;
}

