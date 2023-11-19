
function get_coords_by_city_name() {
    function get_city_name() {
        input_field = document.getElementById('input_field');
        return(input_field.value);
    }
    let city_name = get_city_name();
    if (city_name) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = 10000;
        xhr.responseType = 'json';
        let url = new URL('http://api.openweathermap.org/geo/1.0/direct');
        url.searchParams.set('q', city_name);
        url.searchParams.set('limit', '1');
        url.searchParams.set('appid', '577b3bd2eec54e5a84a1ae825e746783');
        xhr.overrideMimeType("application/json");
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onload  = function() {
            if (xhr.status != 200) {
                alert(`error ${xhr.status}: ${xhr.statusText}`);
            } else {
                let result_field = document.getElementById('city');
                result_field.innerHTML = xhr.response[0].lat.toString()+" "+xhr.response[0].lon.toString();
            }
        };


        xhr.onerror = function() {
            alert(`Unable get weather for ${city_name}`);
        };
    } else {
        alert('Input city name!');
    }

    
    // try {
    //     xhr.send();
    //     if (xhr.status != 200) {
    //         alert('error '+xhr.status+': '+xhr.statusText);
    //     } else {
    //         let responseObj = xhr.response;
    //         // let json = JSON.parce(responseObj);
    //         console.log(typeof responseObj);
    //         console.log(responseObj.lat, responseObj.lon);
    //         return(responseObj.lat);
    //     }
    //   } catch(err) { // для отлова ошибок используем конструкцию try...catch вместо onerror
    //     alert('error '+err);
    //   }


    // xhr.onload = function() {
    //     if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    //         console.log(xhr.statusText);
    //         alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    //         return ("");
    //     } else {
    //         let responseObj = xhr.response;
    //         console.log(responseObj.message);
    //         return(responseObj.message);
    //     }
    // };
}