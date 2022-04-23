'use strict'

const axios = require('axios');
const { response } = require('express');
module.exports = getMovies;
//let cache = {};
//const MOVIE = process.env.MOVIE_API_KEY;

async function getMovies(city)
{
    let key = city.toLowerCase() + 'Data';

    //first check if the city is in the cachealready with data
    //and check how old
    //if there is data, then  use that data
    //1 month is too old
    //let test = 1000*30;
    /*
    let tooOld = 1000 * 60 * 60 * 24 * 30;//1000 milli in a second 60 hours, 60 days, 24 hours, 30 days in month
    if(cache[key] && (Date.now() - cache[key].timeStamp < tooOld))
    {
        console.log('it is in the cache');
        response.status(200).send(cache[key].data)


    }
    //if not, then make a request and  put the data in cache
    else{
        console.log('did not have in cache');


    }
    */
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&include_adult=false`;
    let dataToSend = await axios.get(url);
    let arrayOfMovies = [];
    dataToSend.data.results.forEach(obj => {
        let moviesObj = new Movies(obj)
        arrayOfMovies.push(moviesObj);
    });
/*
    //put data into the cache
    //add a timestamp when putting into cache
    cache[key] = {
        data://somearray
        timeStamp: Date.now()
    }
    */

    return arrayOfMovies;
}


class Movies{
    constructor(movie)
    {
        let x = movie.poster_path!==null?movie.poster_path:'';
       
        //"https://api.themoviedb.org/3/movie/550?"
        //console.log("HERE IS obj: ", movie, typeof(movie.poster_path))
                this.title = movie.title,
                this.overview=movie.overview,
                this.average_votes = movie.vote_average,
                this.total_votes= movie.vote_count,
                this.image_url =   "https://image.tmdb.org/t/p/w300" + x;
                this.popularity = movie.popularity,
                this.release_on = movie.release_date
    }
}

