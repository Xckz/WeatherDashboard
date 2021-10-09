var apiKey = "d29b6e9a830354248c78f8a426be59d7";
var pastSearchButtonEl = document.querySelector("previousSearch");

$("#search").on("click", function () {
    city = $(this).siblings("#input").val();
    console.log(city);
    searchWeatherApi(city);
});

https://api.openweathermap.org/data/2.5/forecast?q=Rome&units=imperial&appid=d29b6e9a830354248c78f8a426be59d7

// function searchWeatherApi(city) {
//     var apiUrl =
//         "https://api.openweathermap.org/data/2.5/forecast?q=" +
//         city +
//         "&units=imperial&appid=" +
//         apiKey;
//     console.log(apiUrl);

//     fetch(apiUrl)  
//     .then(function(resp) { return resp.json() }) // Convert data to json
//     .then(function(data) {
//       weatherDetails(data);
//     })
//     .catch(function() {
//       // catch any errors
//     });
// }

// function weatherDetails( d ) {
//     var temp = d.main.temp;

//     $("#dayOneTemp").innerHTML = temp;
// }


function searchWeatherApi(city) {
    var apiUrl =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=" +
        apiKey;
    console.log(apiUrl);

    fetch(apiUrl).then(function (resp) {
        if (resp.ok) {
            resp.json().then(function (resp) {
                console.log(resp);
                $("#five-day").empty();

                for (var i=0; i < resp.length; i++) {
                    if (resp[0].city.country === "US") {
                        var date = moment.unix(resp[i].dt).format("MM/DD/YYYY");
                        var icon = resp[i].weather.icon;
                        var temp = resp[i].main.temp;
                        var wind = resp[i].wind.speed;
                        var humid = resp[i].main.humidity;
                        var uvIndex = resp[i].main.temp_kf;
                        var card = buildWeatherCard(
                            date,
                            icon,
                            temp,
                            wind,
                            humid,
                            uvIndex,
                            i
                        );
                        
                        console.log(response[0]);
                        $("#five-day").append(card);
                    }
                }
            });
        } else {
            alert("Enter in a valid city.")
        }
    
        // previousSearch(city);
    });
}

function buildWeatherCard(date, icon, temp, wind, humid, uvIndex, i) {
    var weatherCard = $(
        "<div class='currentDay" + i + "'></div>"
    );
    var dateEl = $(
        "<p>" + "(" + date + ")" + " " + icon + "</p>"
    );
    var tempEl = $(
        "<p> Temp:" + temp + "°F" + "</p>"
    );
    var windEl = $(
        "<p> Wind: " + wind + "MPH</p>"
    );
    var humidEl = $(
        "<p> Humidity: " + humid + "%</p>"
    );
    var uvIndex = $(
        "<p> UV Index: " + uvIndex + "</p>"
    );

    weatherCard.append(dateEl);
    weatherCard.append(tempEl);
    weatherCard.append(windEl);
    weatherCard.append(humidEl);
    return weatherCard;
    
}


// var previousSearch = function (pastSearch) {

//     pastSearchEl = document.createElement("button");
//     pastSearchEl.textContent = pastSearch;
//     pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
//     pastSearchEl.setAttribute("previous-city", pastSearch);
//     pastSearchEl.setAttribute("type", "submit");

//     pastSearchButtonEl.append(pastSearchEl);
// };

// var pastSearchHandler = function (event) {
//     var city = event.target.getAttribute("previous-city");
//     if (city) {
//         searchArtistApi(city);
//     }
// };

// $(pastSearchButtonEl).click(pastSearchHandler)