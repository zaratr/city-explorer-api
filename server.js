'use strict'

//Requires

const express = require('express');
require('dotenv').config();
//GLOBAL VARS
let data = require(`./weather.json`);

//USE
const cors = require('cors');
const app = express();
app.use(cors());
//define PORT and validate that my env is working 
const PORT = process.env.PORT || 3002
//if 3002, then something is wrong with the PORT


//ROUTES

//app.get correlates to axios.get
//the first param is the URL in quotes
app.get('/', (request, response) => {
response.send("Hello, from server");
})

app.get('/sayHello', (request, response) =>
{
    response.send(`errorHandler: ${request.query.city_name}`);
});

app.get('/weather', (request, response) =>{

        let area = request.query.city_name;
        let dataToSend = data.find(city => city.city_name === area)
        let selectedCity = new City(dataToSend);
    response.send(dataToSend);
    
});
//CATCH ALL: error and must be at bottom of all app.gets
app.get('*', (request, response) => {
    response.send('Error, try another request for PORT');
});

//ERRORS

class City{
    constructor(cityObj)
    {
        try
        {
        this.name = cityObj.city_name;
        this.lon = cityObj.lon
        this.lat = cityObj.lat
        }
        catch(e)
        {
            console.error(e.message, "you suck")
        }
    }
}


//Listen



//listen is an Express method that takes in a PORT value and a call function
app.listen(PORT, () => 
    console.log(`listening on ${PORT}`));