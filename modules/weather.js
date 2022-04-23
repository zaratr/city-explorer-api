'use strict';

let cache = require('./cache');
//const {default: axios} = require('axios');
const axios = require('axios');
let WEATHER = process.env.WEATHER_API_KEY;

module.exports = weather;

function weather(city) {
  const key = 'weather-' + city; 
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${WEATHER}`;//process.env.WEATHER_API_KEY}`;
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseWeather(response.data));
  }
  
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}