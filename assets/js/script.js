var apiKey = "d29b6e9a830354248c78f8a426be59d7";
var fiveDayEl = document.querySelector("#five-day");

$("#search").on("click", function () {
    city = $(this).siblings("#input").val();
    console.log(city);
    locateCity(city);
});

function locateCity(city) {
    var findCityUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey;

    fetch(findCityUrl).then(function (findResponse) {
        if (findResponse.ok) {
            findResponse.json().then(function (findResponse) {
                var longitude = findResponse.coord.lon;
                var latitude = findResponse.coord.lat;
                console.log(longitude);
                console.log(latitude);

                searchWeatherApi(latitude, longitude);
            });
        } else {
            alert("Enter in a valid city.");
        }
    });
}

function searchWeatherApi(latitude, longitude) {
    var apiUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&exclude=alerts&units=imperial&appid=" +
        apiKey;

    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (resp) {
            if (!resp.ok) {
                throw resp.json();
            }

            return resp.json();
        })

        .then(function (resp) {
            if (!resp.daily.length) {
                console.log("No results!");
            } else {
                fiveDayEl.innerHTML = "";
                displayCurrentDay(resp.daily[0]);
                for (var i = 1; i < 6; i++) {
                    displayFutureDays(resp.daily[i]);
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function displayCurrentDay(resultObj) {
    console.log(resultObj);
    var currentDay = document.createElement("div");
    currentDay.classList.add("currentDay");
    fiveDayEl.append(currentDay);

    var currentDayStrong = document.createElement("h3");
    var date = moment.unix(resultObj.dt).format("MM/DD/YYYY");
    currentDayStrong.textContent = city + " (" + date + ")";

    var icon = document.createElement("img");
    var iconSrc =
        "https://openweathermap.org/img/w/" +
        resultObj.weather[0].icon +
        ".png";
    var iconAlt = resultObj.weather[0].description;
    icon.setAttribute("src", iconSrc);
    icon.setAttribute("alt", iconAlt);

    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + resultObj.temp.day + "°F";

    var windEl = document.createElement("p");
    windEl.textContent = "Wind Speed: " + resultObj.wind_speed + " MPH";

    var humidEl = document.createAttribute("p");
    humidEl.textContent = "Humidity: " + resultObj.humidity + " %";

    var fiveDayHeader = document.createElement("h3");
    fiveDayHeader.textContent = "5-Day Forecast:";

    var uvIndex = resultObj.uvi[0];
    var uvi = document.createElement("p");
    uvi.textContent = "UV Index: " + uvIndex;

    if (uvIndex >= 7) {
        uvi.classList.add("red");
    } else if (uvIndex >= 3) {
        uvi.classList.add("yellow");
    } else {
        uvi.classList.add("green");
    }

    currentDayStrong.appendChild(
        icon,
        tempEl,
        windEl,
        humidEl,
        uvi,
        fiveDayHeader
    );
    currentDay.append(currentDayStrong);
}

function displayFutureDays(resultObj) {
    console.log(resultObj);
    var futureDays = document.createElement("div");
    futureDays.classList.add("futureDay");
    fiveDayEl.append(futureDays);

    var dateHeading = document.createElement("h5");
    var date = moment.unix(resultObj.dt).format("MM/DD/YYYY");

    dateHeading.textContent = date;

    var futureBox = document.createElement("div");

    var icon = document.createElement("img");
    var iconSrc =
        "https://openweathermap.org/img/w/" +
        resultObj.weather[0].icon +
        ".png";
    var iconAlt = resultObj.weather[0].description;
    icon.setAttribute("src", iconSrc);
    icon.setAttribute("alt", iconAlt);

    var futureDetails = document.createElement("p");
    futureDetails.innerHTML =
        "<strong>Temp: </strong>" + resultObj.temp.day + "°F";
    futureDetails.innerHTML =
        "<strong>Wind: </strong>" + resultObj.wind_speed + " MPH";
    futureDetails.innerHTML =
        "<strong>Humidity: </strong>" + resultObj.humidity + " %";

    futureBox.appendChild(icon, futureDetails);
    futureDays.append(dateHeading, futureBox);
}
