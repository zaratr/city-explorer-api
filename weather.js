'use strict'

const axios = require('axios');
module.exports = getWeather;
//const WEATHER = process.env.WEATHER_API_KEY;

async function getWeather(city)
{
        
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`;
        let dataToSend = await axios.get(url);
        let arrayOfCities = [];
        dataToSend.data.data.forEach(obj => {
            let citiesWeather = new City(obj)
            arrayOfCities.push(citiesWeather);
        });
        return arrayOfCities;
}



class City{
    constructor(cityObj)
    {
        this.datetime = cityObj.datetime;
        this.description = cityObj.weather.description;
    }
}