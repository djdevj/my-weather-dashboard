// Get location for the forcast
// Start call back functions:
// write function for getting the location "getPosition"
var gotPosition = function(pos) {
    var lat = pos.coords.latitude; //define rule for latitude
    var long = pos.coords.longitude; //define rule for longitude
    //console.log(lat, long)
    getForcast(lat, long) //call position to get forcast
}
// write function for getting the forcast "getForcast"
var getForcast = function(lat, long) {
    var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=7728e4dc7084f1f64c5456d0ab073c58"; //weather API defined string
    getWeatherText(url);
    
}

// write function for syncing the weather 
async function getWeatherText(url) {
    var weatherObject = await fetch(url); //making it wait to fetch data
    var weatherText = await weatherObject.text(); //making the info readable
    parseWeather(weatherText);
}

// Create parse weather function (for daily forcast)
var parseWeather = function(weatherText) {
    var weatherJson = JSON.parse(weatherText);
    var dailyForcast = weatherJson.daily;
    //console.log(weatherJson)
    for (x = 0; x < dailyForcast.length; x++) {
        var day = dailyForcast[x];
        var today = new Date().getDay() + x;
        if (today > 6) {
            today = today - 7;
        }
    }
}

navigator.geolocation.getCurrentPosition(gotPosition);

