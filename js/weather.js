
// function get_coords_by_city_name() {
//     function get_city_name() {
//         input_field = document.getElementById('input_field');
//         return(input_field.value);
//     }
//     let city_name = get_city_name();
//     if (city_name) {
//         let xhr = new XMLHttpRequest();
//         xhr.timeout = 10000;
//         xhr.responseType = 'json';
//         let url = new URL('http://api.openweathermap.org/geo/1.0/direct');
//         url.searchParams.set('q', city_name);
//         url.searchParams.set('limit', '1');
//         url.searchParams.set('appid', '577b3bd2eec54e5a84a1ae825e746783');
//         xhr.overrideMimeType("application/json");
//         xhr.open("GET", url, true);
//         xhr.send();
//         xhr.onload  = function() {
//             if (xhr.status != 200) {
//                 alert(`error ${xhr.status}: ${xhr.statusText}`);
//             } else {
//                 let result_field = document.getElementById('city');
//                 result_field.innerHTML = xhr.response[0].lat.toString()+" "+xhr.response[0].lon.toString();
//             }
//         };


//         xhr.onerror = function() {
//             alert(`Unable get weather for ${city_name}`);
//         };

//     } else {
//         alert('Input city name!');
//     }
// }



// function get_weather_data(lat, lon) {

// }


function makeRequest(method, url) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open(method, url);
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
  }


function append_data(data, id){
    var list = document.getElementById('info');
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(data));
    list.appendChild(entry);
}

async function get_weather() {
    let city_name = document.getElementById('input_field').value;

    let coords_url = new URL('http://api.openweathermap.org/geo/1.0/direct');
    coords_url.searchParams.set('q', city_name);
    coords_url.searchParams.set('limit', '1');
    coords_url.searchParams.set('appid', '577b3bd2eec54e5a84a1ae825e746783');
    let coords_data = await makeRequest("GET", coords_url);
    try {
      console.log(coords_data[0].lat+" - "+coords_data[0].lon)
      append_data("Coordinates: "+coords_data[0].lat.toString()+" "+coords_data[0].lon.toString(), 'info');
    } catch {
      alert("can't find such city! try another one")
    }
    

    let weather_url = new URL('https://api.openweathermap.org/data/2.5/weather');
    weather_url.searchParams.set('lat', coords_data[0].lat);
    weather_url.searchParams.set('lon', coords_data[0].lon);
    weather_url.searchParams.set('appid', '577b3bd2eec54e5a84a1ae825e746783');
    weather_url.searchParams.set('units', 'metric');

    let weather_data = await makeRequest("GET", weather_url)
    console.log(weather_data)
    document.getElementById('weather_title').innerHTML = "Current weather";
    append_data(`description: ${weather_data.weather[0].description}`, 'info');
    append_data(`temp: ${weather_data.main.temp}`, 'info');
    append_data(`feels like: ${weather_data.main.feels_like}`, 'info');
    
    let forecast_url = new URL('https://api.openweathermap.org/data/2.5/forecast');
    forecast_url.searchParams.set('lat', coords_data[0].lat);
    forecast_url.searchParams.set('lon', coords_data[0].lon);
    forecast_url.searchParams.set('appid', '577b3bd2eec54e5a84a1ae825e746783');
    forecast_url.searchParams.set('units', 'metric');
    forecast_url.searchParams.set('cnt', '2');
    let forecast_data = await makeRequest("GET", forecast_url);
    console.log(forecast_data);


    document.getElementById('forecast_title').innerHTML = "Forecast on next day";
    append_data(`temp ${forecast_data.list[1].main.temp}`, "forecast");
    append_data(`feels like ${forecast_data.list[1].main.feels_like}`, "forecast");
    append_data(`description ${forecast_data.list[1].weather[0].description}`, "forecast");

    let weather_icon = document.getElementById('weather_icon');
    weather_icon.src = "http://openweathermap.org/img/w/10d.png";


}