'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {request} = require('express');

const weather = require('./modules/weather.js');
const movies = require('./modules/movies');
const { response } = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.get('/weather', weatherHandler);
app.get('/movies', movieHandler);

function weatherHandler(request, response) {
  const city = request.query;
  weather(city)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  


function movieHandler(request, response)
{
    const {city_name} = request.query;
    movies(city_name)
    .then(summaries => response.send(summaries))
    .catch((error) =>{
        console.error(error)
        response.status(200).send('sorry. Something went wrong!');
    });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));