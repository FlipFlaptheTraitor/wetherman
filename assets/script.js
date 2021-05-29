// variables
var citySearch  =  $("#citySearch");
var searchBtn =  $("#searchBtn");
var searchHistory =  $("#searchHistory");
var picture  =  $("#picture");
var currentCity =  $("#currentCity");
var temperature =  $("#temperature");
var humidity  =  $("#humidity");
var wind =  $("#wind");
var uvIndex =  $("#uvIndex");
var city ="";
var history=[];
var APIKey="8e09c83285771082c3edc61a6a9f484b";




function displayWeather(event){
    event.preventDefault();
    if(citySearch.val().trim()!==""){
        city=citySearch.val().trim();
        currentWeather(city);
       save();
    }
}


function save(){
console.log("test")
}

function  currentWeather(city){
    var currentUrl= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({url:currentUrl,method:"GET",})
    .then(function(response){
        var icon= response.weather[0].icon;
        var iconurl= "https://openweathermap.org/img/wn/"+icon +"@2x.png";
        var date= new Date(response.dt*1000).toLocaleDateString();
        currentCity.html(response.name +"("+date+")" + "<img src="+iconurl+">");
        var fehrenheit = (response.main.temp - 273.15) * 1.80 + 32;
       temperature.html((fehrenheit).toFixed(2)+"&#8457");
        humidity.html(response.main.humidity+"%");
        var windspeed=response.wind.speed;
        var windmph=(windspeed*2.237).toFixed(1);
        wind.html(windmph+"MPH");
        uv(response.coord.lon,response.coord.lat);
        fiveForcast(response.id);
})
};
function uv(lon,lat){
    var uvUrl="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lat+"&lon="+lon;
    $.ajax({url:uvUrl,method:"GET",})
    .then(function(response){
        uvIndex.html(response.value);
    })
}
function fiveForcast(cityid){
    var fiveUrl="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
    $.ajax({url:fiveUrl,method:"GET",})
    .then(function(response){
        for (i=0;i<6;i++){
            var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
            var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
            var kelvin= response.list[((i+1)*8)-1].main.temp;
            var tempF=(((kelvin-273.5)*1.80)+32).toFixed(2);
            var humidity= response.list[((i+1)*8)-1].main.humidity;
        
            $("#date"+i).html(date);
           $("#Image"+i).html("<img src="+iconurl+">");
           $("#temp"+i).html(tempF+"&#8457");
           $("#hum"+i).html(humidity+"%");
        }
        
    });
    }
  
//Handlers
searchBtn.on("click",displayWeather);
