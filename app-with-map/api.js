let api = `YOUR_API_KEY`; //Enter your api key of open weather map, example: "561das6d1sa61ca661ac"
if (api == `YOUR_API_KEY`) {
	console.error(
		"Remember to use your api key token, so that the application can work correctly"
	);
} else {
	console.info("This application is running successfully.");
}
let city = "YOUR_CITY"; // Enter your city, example: "Guadalajara"
let languaje = `YOU_LENGUAJE`; // Enter your language, example: "es"
let units = `metric`;
let map = document.getElementById("map");
let contentCity = document.getElementById("city");
let contentCountry = document.getElementById("country");
let contentTemp = document.getElementById("temp");
let contentInfo = document.getElementById("contentInfo");
let contentTime = document.getElementById("time");

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&lang=${languaje}&units=${units}`;

fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((result) => {
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
		var map = L.map("map").setView([result.coord.lat, result.coord.lon], 8);
		L.tileLayer(
			"https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
			{
				maxZoom: 19,
			}
		).addTo(map);
		var iconJHN = L.icon({
			iconUrl: "https://jonatanhn.github.io/GeoMapPlus/punto.png",
			iconSize: [90, 90], // size of the icon
			shadowSize: [50, 64], // size of the shadow
			iconAnchor: [50, 115], // point of the icon which will correspond to marker's location
			shadowAnchor: [4, 62], // the same for the shadow
			popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
		});

		L.marker([result.coord.lat, result.coord.lon], { icon: iconJHN }).addTo(
			map
		);

		let circle = L.circle([result.coord.lat, result.coord.lon], {
			color: "#222",
			fillColor: "#222",
			fillOpacity: 0.5,
			radius: 45000,
		}).addTo(map);

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
		Velocidad del viento: <b>${result.wind.speed}</b> <br>
		Presión atmosférica: <b>${main.pressure}</b> <br>
		Grado de viento: <b>${wind.deg}</b> <br>
		Humedad: <b>${humiData}%</b> <br>
		Nubes: <b>${result.clouds.all}%</b> <br>
		`;
	})
	.catch((err) => {
		// console.log(err);
	});
