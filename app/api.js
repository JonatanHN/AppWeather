let city = document.getElementById("dataSearch");
let api = `YOUR_API_KEY`; //Enter your api key of open weather map, example: "561das6d1sa61ca661ac"
if (api == `YOUR_API_KEY`) {
	console.error(
		"Remember to use your api key token, so that the application can work correctly"
	);
} else {
	console.info("This application is running successfully.");
}
let language = `YOUR_LANGUAGE`; //Enter your language, example: "es"
let units = `metric`;
let map = document.getElementById("map");
let contentCity = document.getElementById("city");
let contentCountry = document.getElementById("country");
let contentTemp = document.getElementById("temp");
let contentInfo = document.getElementById("contentInfo");
let contentTime = document.getElementById("time");
let button = document.getElementById("searchButton");
button.addEventListener("click", function (e) {
	e.preventDefault();
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${api}&lang=${language}&units=${units}`;
	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			setInterval((result) => {
				result;
			}, 1000);
			const main = result.main;
			const tempData = main.temp;
			const cityName = result.name;
			const tempDataMax = main.temp_max;
			const countryName = result.sys.country;
			const tempDataMin = main.temp_min;
			const humiData = main.humidity;
			const weather = result.weather[0];
			const codeIcon = weather.icon;
			const wind = result.wind;

			contentCity.innerHTML = `
			${cityName} - ${countryName} <br>`;
			contentTime.innerHTML = `
			<div class="flex justify-center">
			<b class="tempCurrent">${tempData}°C</b> 
			<img 
			src="http://openweathermap.org/img/wn/${codeIcon}@2x.png"
			>
			</div>
			<div class="flex justify-center">
			<b>${weather.description.toUpperCase()}</b>
			</div> <br>`;
			contentTemp.innerHTML = `
			<div class="flex-1 inline-flex items-center">
				<p>Temp Minima: <span class="text-gray-900 font-bold">${tempDataMin}°C</span></p>
			</div>
			<div class="flex-1 inline-flex items-center">
				<p>Temp Maxima: <span class="text-gray-900 font-bold">${tempDataMax}°C</span></p>
			</div>`;

			contentInfo.innerHTML = `
			Velocidad del viento: <span class="text-gray-900 font-bold">${result.wind.speed}km/h</span><br>
			Presión atmosférica: <span class="text-gray-900 font-bold">${main.pressure}</span><br>
			Grado de viento: <span class="text-gray-900 font-bold">${wind.deg}°</span><br>
			Humedad: <span class="text-gray-900 font-bold">${humiData}%</span><br>
			Nubes: <span class="text-gray-900 font-bold">${result.clouds.all}%</span><br>
			`;
		})
		.catch((err) => {
			console.log(err);
		});
});
