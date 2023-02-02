// Get location for the forcast
// Start call back functions:
// write function for getting the location "getPosition"
let gotPosition = function(pos) {
    let lat = pos.coords.latitude; //define rule for latitude
    let long = pos.coords.longitude; //define rule for longitude
    
    getForecast(lat, long); //call position to get forcast
}
// write function for getting the forcast "getForecast"
let getForecast = function(lat, long) {
    let url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=7728e4dc7084f1f64c5456d0ab073c58"; //weather API defined string
    getWeatherText(url);
    
}

// write function for syncing the weather 
async function getWeatherText(url) {
    let weatherObject = await fetch(url); //making it wait to fetch data
    let weatherText = await weatherObject.text(); //making the info readable
    console.log(weatherObject);
    console.log(weatherText);
    parseWeather(weatherText);
}

// Create parse weather function (for daily forcast)
let parseWeather = function(weatherText) {
    let weatherJSON = JSON.parse(weatherText);
    console.log(weatherJSON);
    let dailyForecast = weatherJSON.daily;
    console.log(dailyForecast)
    
    for (x = 0; x < dailyForecast.length; x++) {
        let day = dailyForecast[x];
        let today = new Date().getDay() + x;
        if (today > 6) {
            today = today - 7;
        }
        let dayOfWeek = getDayOfWeek(today);
        let description = day.weather[0].description;
        let icon = day.weather[0].icon;
        let highTemp = kToF(day.temp.max);
        let lowTemp = kToF(day.temp.min);
        let humidity = day.humidity;
        displayWeatherDay(dayOfWeek, description, icon, highTemp, lowTemp, humidity);
    }
}

// Setting what's displayed in each card
let displayWeatherDay = function(dayOfWeek, description, icon, highTemp, lowTemp, humidity){
    let out = "<div class='weatherDay'><img src='http://openweathermap.org/img/wn/" + icon + ".png'/>";
    out += "<h2>" + dayOfWeek + "</h2>";
    out += "<h3>" + description + "</h3>";
    out += "<p>" + icon + "</p>";
    out += "<p>" + highTemp + "</p>";
    out += "<p>" + lowTemp + "</p>";
    out += "<p>" + humidity + "</p>";
    document.getElementById("forcast").innerHTML += out;
}

// Defining days of the week
let getDayOfWeek = function(dayNum){
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return (weekday[dayNum]);
}

// Weather calculations
let kToF = function(kelvinTemp){
    const celsius = kelvinTemp -273;
    const fahrenheit = Math.floor(celsius * (9 / 5) + 32);
    return fahrenheit 
}

let timestampToTime = function(timeStamp){
    let date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    let minutes = "";
    if (date.getMinutes() < 10){
        minutes = "0" + date.getMinutes();
    } else {
        minutes = date.getMinutes();
    }
    return hours + ":" + minutes;
}

navigator.geolocation.getCurrentPosition(gotPosition);

