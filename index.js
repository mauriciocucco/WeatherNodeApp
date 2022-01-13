require('dotenv').config();
const { readInput, inquirerMenu, inquirerPause, citiesList } = require('./lib/inquirer');
const Searches = require('./models/Searches');

const main = async () => {
    let opt = '';
    const searches = new Searches();

    do {
        opt = await inquirerMenu();

        switch (Number(opt)) {
            case 1:
                const search = await readInput('Ingrese una ciudad: ');

                const citiesArr = await searches.searchCity(search);

                const cityId = await citiesList(citiesArr);

                if(cityId === '0') continue;

                const selectedCity = citiesArr.find(city => city.id === cityId);

                searches.saveRecord(selectedCity.name); //guardo la ciudad elegida

                const weather = await searches.searchWeather(selectedCity.lat, selectedCity.lng);

                console.clear();
                console.log(`\nInformación de la ciudad:\n`.magenta);
                console.log(`Nombre: ${(selectedCity.name).yellow}`);
                console.log(`Latitud: ${(String(selectedCity.lat).yellow)}`);
                console.log(`Longitud: ${(String(selectedCity.lng).yellow)}`);
                console.log(`Temperatura actual: ${((String(weather.temp) + '°C').yellow)}`);
                console.log(`Clima: ${(weather.desc).yellow}`);
                console.log(`T. Mínima: ${((String(weather.temp_min) + '°C').yellow)}`);
                console.log(`T. Máxima: ${((String(weather.temp_max) + '°C').yellow)}`);
                break;
            case 2:
                searches.capitalizedRecord.forEach((city, index) => {
                    console.log(`${(index + 1 + '.').green} ${city}`);
                })
                break;
            case 0:
                break;
        }

        if(opt !== 0) await inquirerPause();   

    } while (opt !== 0);
};

main();