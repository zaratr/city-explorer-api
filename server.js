'use strict'

//Requires

require('dotenv').config();
const express = require('express');
const {default: axios} = require('axios');
const cors = require('cors');
//GLOBAL VARS
let data = require(`./weather.json`);
const { request } = require('express');
const getWeather = require('./weather.js')
const getMovies = require('./movies.js')

//USE
const app = express();
app.use(cors());
//define PORT and validate that my env is working 
//if 3002, then something is wrong with the PORT
const PORT = process.env.PORT || 3002


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


app.get('/weather', weather);
async function weather(request, response){
    try{
        let isResponse = await getWeather(request.query.city_name);//.then().catch;//get axios is in here
        response.send(isResponse);
    }catch(e)  {response.status(500).send(e.message);}
}

app.get('/movies', movies);
async function movies(request, response) {
    try {
        let isResponse = await getMovies(request.query.city_name);
        response.send(isResponse);
    }catch(e)  {response.status(500).send(e.message);}
}

//CATCH ALL: error and must be at bottom of all app.gets
app.get('*', (request, response) => response.send('Error, try another request for PORT'));

//ERRORS
app.use((error, request, response, next) => response.status(500).send(error.message));



//Listen
//listen is an Express method that takes in a PORT value and a call function
app.listen(PORT, () => console.log(`listening on ${PORT}`));