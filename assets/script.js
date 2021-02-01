// variables
var searchButton =  $("#search-button");
var searchCity = $("#");
var currentCity = $("#currentCity");
var currentTemp = $("#tempurature");
var currentHumidty = $("#humitity");
var currenWind = $("#wind");
var currentUv = $("#uvIndex");
//filled by search function
var city ="";
//stores previous searches
var historyarray =[];
//API uses url + city+ query+key
var openweather="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + "APIKey;a0aca8a89948154a4182dcecc780b513";


function display(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
     city=searchCity.val().trim();
     currentWeather(city);
    }
}

function currentWeather(city){
  

function fiveDayForcast{

    }
function forecast{

}


function pastCity{
}

function PastSearch(event){

    }

}

function cityHistory(){

    }

}
//Handlers
$("#search-button").on("click",displayWeather);
$(document).on("click",invokePastSearch);
$(window).on("load",loadlastCity);
