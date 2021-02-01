// variables
var searchBtn =  $("#search-button");
var searchCity = $("#search-city");
var currentCity = $("#current-City");
var currentTemp = $("#tempurature");
var currentHumidty = $("#humitity");
var currentWind = $("#wind");
var currentUv = $("#uv-index");
//filled by search function
var city ="";
//stores previous searches
var historyarray =[];
//API uses url+city+query+key
var openweather="a0aca8a89948154a4182dcecc780b513";
function display(event) {
    event.preventDefault();
    if(searchCity.val().trim()!==""){
     city=searchCity.val().trim();
     currentWeather(city);
    }
}
//gets uv info from openweather
function UVIndex(ln,lt){
    var uvURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ openweather+"&lat="+lt+"&lon="+ln;
        $.ajax({
        url:uvURL,
         method:"GET"
    })
        .then(function(response){
         $(currentUv).html(response.value);
 });
} 
function currentWeather(cityid){
    //defines the url
    var openweatherURL= "https://api.openweathermap.org/data/2.5/weather?q=" + cityid + "&APPID=" + openweather;
    // logs open weather api info
         $.ajax({
        url:openweatherURL,
        method:"GET",
 })
        .then(function(response){ 
         console.log(response);
 // varibles for current weather info
        var Farenheit = (response.main.temp - 273.15) * 1.80 + 32;
        var ws=response.wind.speed;
        var windsmph=(ws*2.237).toFixed(1);
        //displays current weather info
            $(currentCity).html(response.name);
            $(currentTemp).html((Farenheit).toFixed(2)+"&#8457");
            $(currentHumidty).html(response.main.humidity+"%");
            $(currentWind).html(windsmph+"MPH");
            UVIndex(response.coord.lon,response.coord.lat);
            forecast(response.id);
        if(response.cod==200){
            historyarray=JSON.parse(localStorage.getItem("cityname"));
            console.log(historyarray);
         if (historyarray==null){
             historyarray=[];
             historyarray.push(city);
             localStorage.setItem("cityname",JSON.stringify(historyarray));
            addToList(city);
            }
         else {
        if(find(city)>0){
             historyarray.push(city);
             localStorage.setItem("cityname",JSON.stringify(historyarray));
            addToList(city);
         }
        }
     }
 });
}
function forecast(cityid){
    var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+openweather;
        $.ajax({
        url:queryforcastURL,
        method:"GET"
    }).then(function(response){
        
    for (i=0;i<5;i++){
     var tempK= response.list[((i+1)*8)-1].main.temp;
     var Farenheit=(((tempK-273.5)*1.80)+32).toFixed(2);
     var humidity= response.list[((i+1)*8)-1].main.humidity;
         $("#fTemp"+i).html(Farenheit+"&#8457");
        $("#fHumidity"+i).html(humidity+"%");
     }
 });
}
function addToList(c){
    var listEl= $("<li>"+c+"</li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value",c.toUpperCase());
    $(".list-group").append(listEl);
}
function loadlastCity(){
    $("ul").empty();
    var historyarray = JSON.parse(localStorage.getItem("cityname"));
    if(historyarray!==null){
     historyarray=JSON.parse(localStorage.getItem("cityname"));
    for(i=0; i<historyarray.length;i++){
         addToList(historyarray[i]);
    }
    city=historyarray[i-1];
     currentWeather(city);
    }
}
function invokePastSearch(event){
    var liEl=event.target;
    if (event.target.matches("li")){
    city=liEl.textContent.trim();
     currentWeather(city);
    }
}
//Handlers
$("#search-button").on("click",display);
$(document).on("click",invokePastSearch);
$(window).on("load",loadlastCity);
