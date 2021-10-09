var apiKey = "d29b6e9a830354248c78f8a426be59d7";
var city = "";

$("#search").on("click", function () {
    city = $(this).siblings("#city-search").val();
    console.log(city);
    searchWeatherApi(city);
});

https://api.openweathermap.org/data/2.5/forecast?q=Rome&appid=d29b6e9a830354248c78f8a426be59d7

function searchWeatherApi(city) {
    var apiUrl =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        apiKey;
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var weatherArray = [];

            for (i = 0; i < data.length; i++) {
                var weatherDetails = {
                    date: data[i].list.dt,
                    icon: data[i].list.weather.icon,
                    temperature: data[i].list.main.temp,
                    wind: data[i].list.wind.speed,
                    humidity: data[i].list.main.humidity,
                };

                console.log(weatherDetails);
                weatherArray.push(weatherDetails);
            }

            var weatherArrayString = JSON.stringify(weatherArray);
            window.localStorage.setItem("weather", weatherArrayString);

            window.location.href = "index.html";
        });
        
    
};

function buildWeatherCard(weather) {
    var weatherCard = $(
        "<div class='p-3 mb-2card' id='card" +
            i +
            "'></div>"
    );
    var dateEl = $(
        "<div class='card-header' id='dateEl'>" + dateString + "</div>"
    );
    var cardBody = $("<div class='card-body'></div>");
    var iconEl = $(
        "<h5 class='card-title' id='iconEl'>" + icon + "</h5>"
    );
    var tempEl = $("<p class='card-text' id='tempEl'>" + temperature + "</p>");
    var windEl = $("<p class='card-text' id='windEl'>" + wind + "</p>");
    var humidEl = $("<p class='card-text' id='tempEl'>" + humidity + "</p>");

    cardBody.append(iconEl);
    cardBody.append(tempEl);
    cardBody.append(windEl);
    cardBody.append(humidEl);
    weatherBody.append(dateEl);
    weatherBody.append(cardEl);
    return weatherCard; 
}