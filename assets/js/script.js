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

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (response) {
                console.log(response);
                $("#weatherBox").empty();

                for (var i = 0; i < response.length; i++) {
                    if (response[i].cod === "200") {
                        var dateString = moment
                            .unix(response[i].list.dt)
                            .format("MM/DD/YYYY");
                        var icon = response[i].list.weather.icon;
                        var temperature =
                            (response[i].list.main.temp * 9) / 5 + 32;
                        var wind = response[i].list.wind.speed;
                        var humidity = response[i].list.main.humidity;
                        var card = buildWeatherCard(
                            dateString,
                            icon,
                            temperature,
                            wind,
                            humidity,
                            i
                        );
                        $("#weatherBox").append(card);
                    }
                }
            });
        } else {
            alert("ERROR: Enter a valid city.");
        }
    });
}

function buildWeatherCard(dateString, icon, temperature, wind, humidity, i) {
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
