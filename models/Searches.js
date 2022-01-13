const axios = require('axios');

class Searches {
    record = ['Villa Gesell'];

    constructor() {}

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'languague': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPEN_WEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async searchCity (city = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.paramsMapbox
            })

            const response = await instance.get();

            return response.data.features.map(feature => ({
                id: feature.id,
                name: feature.place_name,
                lng: feature.center[0],
                lat: feature.center[1]
            }))
            
        } catch (error) {
            console.log('ERROR', error);
            return [];
        }
    }

    async searchWeather(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat,
                    lon,
                    ...this.paramsOpenWeather
                }
            })

            const { data } = await instance.get();
            const { weather, main } = data;

            return ({
                desc: weather[0].description,
                temp: main.temp,
                temp_min: main.temp_min,
                temp_max: main.temp_max
            });
            
        } catch (error) {
            console.log('ERROR', error);
            return {};
        }
    }
}

module.exports = Searches;