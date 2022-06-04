// apiKey = "e930ad093094052f6fd2a1b11da372e3"
const weekTempHigh = document.getElementsByClassName('weekTempHigh')
const weekTempLow = document.getElementsByClassName('weekTempLow')
const weekDesc = document.getElementsByClassName('weekDesc')
const Day = document.getElementsByClassName('Day')
date = new Date().getDay()
week = []
makeWeek()
console.log(week)
function getData() {
    const val = document.querySelector('input').value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=e930ad093094052f6fd2a1b11da372e3&units=metric`, { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response)
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            document.querySelector(".city").innerHTML = response.name + ', ' + response.sys.country;
            weekWeather(lat, lon)
        });
}
function weekWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts,current&appid=e930ad093094052f6fd2a1b11da372e3&units=metric`, { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response)
            console.log("http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + ".png")
            for (i = 0; i < 8; i++) {
                document.getElementsByClassName("icon")[i].src = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png"
                Day[i].innerHTML = checkDay(week[i]);
                weekTempHigh[i].innerHTML = Math.round(response.daily[i].temp.max) + '&degC'
                weekTempLow[i].innerHTML = Math.round(response.daily[i].temp.min) + '&degC'
                weekDesc[i].innerHTML = response.daily[i].weather[0].description
                // the weather object console.log(response.daily)
            }
            Day[0].innerHTML = checkDay(week[0])
        });
}

var form = document.getElementById('form')
form.addEventListener('submit', getData)

function makeWeek() {
    for (i = 0; i <= 7; i++) {
        if (date + 1 > 7) {
            week[i] = 0;
            date = 1
        }
        else {
            week[i] = date
            date += 1
        }
    }
}
function checkDay(day) {
    if (day == 0) {
        return "Sunday"
    }
    if (day == 1) {
        return "Monday"
    }
    if (day == 2) {
        return "Tuesday"
    }
    if (day == 3) {
        return "Wednesday"
    }
    if (day == 4) {
        return "Thursday"
    }
    if (day == 5) {
        return "Friday"
    }
    if (day == 6) {
        return "Saturday"
    }
}
