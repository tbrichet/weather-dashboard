
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
    
    // Pass to City Name and Date Display Function, Reset Input, and Pass to Fetch Function
    if(cityName) {
        displayCityName(cityName, currentDay);
        nameInputEl.value="";
        getTodayData(cityName);
        document.getElementById('past-search').innerHTML = cityName;
    } else {
        alert("Apologies, the city name you have entered is not in our database.")
    }
};

//Function to Display Searched City Name and Today's Date
var displayCityName = function(cityName, currentDay) {
    var cityNameDisplayEl = document.getElementById('city-name-display');
    cityNameDisplayEl.innerHTML = "<h3>" + cityName + " (" + currentDay + ") " + "</h3>";
};

//Function to Fetch and Combine Today's and Forecasted Weather Data
var getTodayData = function(cityName) {
    
    var apiRequestOne = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=f1da1483f8c358f7d202dc774184334a")
        .then(function(response) {
            return response.json()
        });
    
    var apiRequestTwo = fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=f1da1483f8c358f7d202dc774184334a")
        .then(function(response) {
            return response.json()
        });

    //Combine API Requests | Code Adapted from Sophia Shoemaker "Using the Javascript Fetch API"
    var combinedData = {"apiRequestOne":{}, "apiRequestTwo":{}};
    Promise.all([apiRequestOne,apiRequestTwo]).then(function(values) {
        combinedData["apiRequestOne"] = values[0];
        combinedData["apiRequestTwo"] = values[1];

        //Today's Weather Data
        var todayTemp = combinedData["apiRequestOne"].main.temp;
        var todayHumid = combinedData["apiRequestOne"].main.humidity;
        var todayWind = combinedData["apiRequestOne"].wind.speed;
        displayTodayWeather(todayTemp, todayHumid, todayWind);

        //Forecast Day 1
        var dayOneTemp = combinedData["apiRequestTwo"].list[0].main.temp;
        var dayOneHumid = combinedData["apiRequestTwo"].list[0].main.humidity;
        forecastDayOne(dayOneTemp, dayOneHumid);

        //Forecast Day 2
        var dayTwoTemp = combinedData["apiRequestTwo"].list[1].main.temp;
        var dayTwoHumid = combinedData["apiRequestTwo"].list[1].main.humidity;
        forecastDayTwo(dayTwoTemp, dayTwoHumid);

        //Forecast Day 3
        var dayThreeTemp = combinedData["apiRequestTwo"].list[2].main.temp;
        var dayThreeHumid = combinedData["apiRequestTwo"].list[2].main.humidity;
        forecastDayThree(dayThreeTemp, dayThreeHumid);

        //Forecast Day 4
        var dayFourTemp = combinedData["apiRequestTwo"].list[3].main.temp;
        var dayFourHumid = combinedData["apiRequestTwo"].list[3].main.humidity;
        forecastDayFour(dayFourTemp, dayFourHumid);

        //Forecast Day 5
        var dayFiveTemp = combinedData["apiRequestTwo"].list[4].main.temp;
        var dayFiveHumid = combinedData["apiRequestTwo"].list[4].main.humidity;
        forecastDayFive(dayFiveTemp, dayFiveHumid);
        

        return combinedData;
        
    });
};

//Function to Display Today's Temperature, Humidity, and Wind Speed
var displayTodayWeather =function(todayTemp, todayHumid, todayWind) {
    document.getElementById("temperature").innerHTML = "Temperature: " + todayTemp + " F";
    document.getElementById("humidity").innerHTML = "Humidity: " + todayHumid + " %";
    document.getElementById("wind-speed").innerHTML = "Wind Speed: " + todayWind + " MPH";
    
    //document.getElementById("uv").innerHTML = 
    //getForecastData(cityName);
};

//Function to Display 5-Day Forecast | Day 1
var forecastDayOne = function(dayOneTemp, dayOneHumid) {
    document.getElementById('dayone').innerHTML = dayOne;
    document.getElementById('temperature-one').innerHTML = "Temp: " + dayOneTemp + " F";
    document.getElementById('humidity-one').innerHTML = "Humidity: " + dayOneHumid + "%";
};
//Function to Display 5-Day Forecast | Day 2
var forecastDayTwo = function(dayTwoTemp, dayTwoHumid) {
    document.getElementById('daytwo').innerHTML = dayTwo;
    document.getElementById('temperature-two').innerHTML = "Temp: " + dayTwoTemp + " F";
    document.getElementById('humidity-two').innerHTML = "Humidity: " + dayTwoHumid + "%";
};
//Function to Display 5-Day Forecast | Day 3
var forecastDayThree = function(dayThreeTemp, dayThreeHumid) {
    document.getElementById('daythree').innerHTML = dayThree;
    document.getElementById('temperature-three').innerHTML = "Temp: " + dayThreeTemp + " F";
    document.getElementById('humidity-three').innerHTML = "Humidity: " + dayThreeHumid + "%";
};
//Function to Display 5-Day Forecast | Day 4
var forecastDayFour = function(dayFourTemp, dayFourHumid) {
    document.getElementById('dayfour').innerHTML = dayFour;
    document.getElementById('temperature-four').innerHTML = "Temp: " + dayFourTemp + " F";
    document.getElementById('humidity-four').innerHTML = "Humidity: " + dayFourHumid + "%";
};
//Function to Display 5-Day Forecast | Day 4
var forecastDayFive = function(dayFiveTemp, dayFiveHumid) {
    document.getElementById('dayfive').innerHTML = dayFive;
    document.getElementById('temperature-five').innerHTML = "Temp: " + dayFiveTemp + " F";
    document.getElementById('humidity-five').innerHTML = "Humidity: " + dayFiveHumid + "%";
};


//Event Handler for Submit Button
userFormEl.addEventListener("submit", formSubmitHandler);