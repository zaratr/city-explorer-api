'use strict'

//Requires

require('dotenv').config();
const express = require('express');
const {default: axios} = require('axios');
const cors = require('cors');
//GLOBAL VARS
let data = require(`./weather.json`);
const { request } = require('express');

//USE
const app = express();
app.use(cors());
//define PORT and validate that my env is working 
//if 3002, then something is wrong with the PORT
const PORT = process.env.PORT || 3002
const WEATHER = process.env.WEATHER_API_KEY;
const MOVIE = process.env.MOVIE_API_KEY;


//ROUTES

//app.get correlates to axios.get
//the first param is the URL in quotes
app.get('/', (request, response) => {
        let {city} = request.query;
        let dataToSend = data.find(cityData => cityData.city_name === city)
        //let selectedCity = new City(dataToSend);
        //response.send("Hello, from servered");
        response.send(dataToSend);
})


app.get('/weather', async (request, response) =>
{
    try
    {
        let qCity = request.query.city_name;
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${qCity}&key=${WEATHER}`;
        let dataToSend = await axios.get(url);
        let arrayOfCities = [];
        dataToSend.data.data.forEach(obj => {
            let citiesWeather = new City(obj)
            arrayOfCities.push(citiesWeather);
        });
        response.send(arrayOfCities);
        
    }
    catch(e)  {response.status(500).send(error.message);}
});

app.get('/movies', async (request, response) =>
{
    try 
    {
        let qCity = request.query.city_name;
        //https://api.themoviedb.org/3/movie/550?api_key=17f3a718b0f5d36680aae68a930ccfa4
        let dataToSend = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE}&language=en-US&query=${qCity}&include_adult=false`);
        //let selectedMovies = new Movies(dataToSend.data.results);

        

        let arrayOfMovies = [];
        dataToSend.data.results.forEach(obj => {
            let moviesObj = new Movies(obj)
            arrayOfMovies.push(moviesObj);
        });
        response.send(arrayOfMovies);



    } catch (error) {
        console.error(error.message);
        
    }
})

//CATCH ALL: error and must be at bottom of all app.gets
app.get('*', (request, response) => {
    response.send('Error, try another request for PORT');
});

//ERRORS

app.use((error, request, response, next) =>
{
    response.status(500).send(error.message);
});


//Classes
class City{
    constructor(cityObj)
    {
        this.datetime = cityObj.datetime;
        this.description = cityObj.weather.description;
    }
}

class Movies{
    constructor(movie)
    {
        //this.moviesArr = [];
        //moviesObj.forEach(movie => 
        //{
            //this.moviesArr.push
            //(
                this.title = movie.title,
                this.overview=movie.overview,
                this.average_votes = movie.vote_average,
                this.total_votes= movie.vote_count,
                this.image_url = "https://api.themoviedb.org/3/movie/550?api_key=" + movie.poster_path//.replace(/\//g,''),
                this.popularity = movie.popularity,
                this.release_on = movie.release_date
            //);
        //});
    }
}

//Listen



//listen is an Express method that takes in a PORT value and a call function
app.listen(PORT, () => 
    console.log(`listening on ${PORT}`));