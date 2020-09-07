
//Reference User Form
var userFormEl = document.querySelector("#form");

//Reference HTML Form Input
var nameInputEl = document.querySelector("#name-input");

//Date Variables
var currentDay = moment().format("MM/DD/YYYY")
var dayOne = moment().add(1, 'days').format("MM/DD/YYYY");
var dayTwo = moment().add(2, 'days').format("MM/DD/YYYY");
var dayThree = moment().add(3, 'days').format("MM/DD/YYYY");
var dayFour = moment().add(4, 'days').format("MM/DD/YYYY");
var dayFive = moment().add(5, 'days').format("MM/DD/YYYY");


//Function Button Click Handler
var formSubmitHandler = function(event) {
    event.preventDefault();
    // Variable for city name entered into form
    var cityName = nameInputEl.value.trim();
    
    // Pass to Display Function or Alert if Not City Name
    if(cityName) {
        displayCityName(cityName, currentDay);
        nameInputEl.value="";
        getTodayData(cityName);
        forecast();
    } else {
        alert("Apologies, the city name you have entered is not in our database.")
    }
};

//Function to Display Searched City Name and Today's Date
var displayCityName = function(cityName, currentDay) {
    var cityNameDisplayEl = document.getElementById('city-name-display');
    cityNameDisplayEl.innerHTML = "<h3>" + cityName + " (" + currentDay + ") " + "</h3>";
};

//Function to Fetch Today's Temperature, Humidity, and Wind Speed
var getTodayData = function(cityName) {
    //format the OpenWeather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=f1da1483f8c358f7d202dc774184334a";
    
    //make a request to the url
    fetch(apiUrl).then(function(resp) {
        return resp.json()
    })
        .then(function(data) {
           displayTodayWeather(data);
        })
        .catch(function(error) {
            alert("Unable to connect to OpenWeather App");
        });
};

//Function to Display Today's Temperature, Humidity, and Wind Speed
var displayTodayWeather =function(d) {
    document.getElementById("temperature").innerHTML = "Temperature: " + d.main.temp + " F";
    document.getElementById("humidity").innerHTML = "Humidity: " + d.main.humidity + " %";
    document.getElementById("wind-speed").innerHTML = "Wind Speed: " + d.wind.speed + " MPH";
    //document.getElementById("uv").innerHTML = 
};

//Function to Display Forecast Dates
var forecast = function() {
    //Day 1
    var displayDayOne = document.getElementById('dayone');
    displayDayOne.innerHTML = dayOne

    //Day 2
    var displayDayTwo = document.getElementById('daytwo');
    displayDayTwo.innerHTML = dayTwo

    //Day 3
    var displayDayThree = document.getElementById('daythree');
    displayDayThree.innerHTML = dayThree

    //Day 4
    var displayDayFour = document.getElementById('dayfour');
    displayDayFour.innerHTML = dayFour

    //Day 5
    var displayDayFive = document.getElementById('dayfive');
    displayDayFive.innerHTML = dayFive
    
};

//Event Handler for Submit Button
userFormEl.addEventListener("submit", formSubmitHandler);