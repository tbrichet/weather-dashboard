
//Reference User Form
var userFormEl = document.querySelector("#form");

//Reference HTML Form Input
var nameInputEl = document.querySelector("#name-input");

//Date Variable
var currentDay = moment().format("MM/DD/YYYY")


//Function Button Click Handler
var formSubmitHandler = function(event) {
    event.preventDefault();
    // Variable for city name entered into form
    var cityName = nameInputEl.value.trim();
    
    // Pass to Display Function or Alert if Not City Name
    if(cityName) {
        displayCityName(cityName, currentDay);
        nameInputEl.value="";
    } else {
        alert("Apologies, the city name you have entered is not in our database.")
    }
};

//Function to Display City Name
var displayCityName = function(cityName, currentDay) {
    var cityNameDisplayEl = document.getElementById('city-name-display')
    cityNameDisplayEl.innerHTML = "<h3>" + cityName + " (" + currentDay + ") " + "</h3>";
};


//Event Handler for Submit Button
userFormEl.addEventListener("submit", formSubmitHandler);