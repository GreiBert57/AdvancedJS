$(document).ready(function() {
   fetchWeatherInt(); //nastavuje 5minutový interval fetchování hodnot
   reloadWeather(); //event listener na tlačítko pro fetchování hodnot
   fetchWeatherData(); //samotná funkce fetchující data, volaná oběma vyššími
   setClock(); //timer
});

function fetchWeatherInt() {
    setInterval(function() {
        fetchWeatherData();
    }, 300000);
}

function reloadWeather () {
    $('#rlButton').on('click', function() {
       fetchWeatherData();
    });
}

function fetchWeatherData() {
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Praha?unitGroup=metric&elements=datetime%2Ctemp%2Cfeelslike%2Chumidity%2Cpressure%2Cuvindex%2Cdescription&key=JK8RR2A5RD7RXMZEZTJEDZW95&contentType=json", {
        "method": "GET",
        "headers": {}
    })
    .then(response => {
        if(response.ok) {
            console.log(response);
            return response.json();
        }else{
            console.log("An error occured!");
        }
    })
    .then(data => {
        displayData(data);
    })
    .catch(err => {
        console.error(err);
    });
}

function displayData(data) {
    let specifics = data.currentConditions;

    let place = data.address;
    let location = data.resolvedAddress;
    let desc = data.description;

    let temp = specifics.temp;
    let feels = specifics.feelslike;
    let datetime = specifics.datetime;
    let humidity = specifics.humidity;
    let pressure = specifics.pressure;
    let uvindex = specifics.uvindex;

    $('#place').html(place);
    $('#location').html(location);
    $('#desc').html(desc);

    $('#datetime').html("Sample time: "+datetime);
    $('#temp').html("Temperature: "+temp+" °C");
    $('#feelslike').html("Feels like: "+feels+" °C");
    $('#pressure').html("Atmospheric pressure: "+pressure+" kPa");
    $('#humidity').html("Humidity: "+humidity+" %");
    $('#uvindex').html("UV Index: "+uvindex);

    console.log(specifics);

    $('#clock').html('Last reloaded: 0 minutes ago');
}

//tato funkce je spuštěna na začátku programu a počítá čas od reloadu
//automaticky se resetuje ve funkci, která načítá nová data

function setClock() {
    let clock = $('#clock');
    setInterval(function() {
        let time = clock.html().toString().slice(15, 16);
        time++;
        clock.html('Last reloaded: '+time+' minutes ago');
    }, 60000)
}


