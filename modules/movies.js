'use strict'

const axios = require('axios');
const { response } = require('express');
module.exports = movies;
let cache = require('./cache.js');
//const MOVIE = process.env.MOVIE_API_KEY;

'use strict';

let  MOVIES= process.env.MOVIE_API_KEY;

module.exports = movies;

async function movies(city) {
  const key = 'movies-' + city;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&include_adult=false`;
  if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24 * 30)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    let serverData = await axios.get(url);
    checker(serverData.data);
    cache[key].data = parseMovie(serverData.data.results)

  }
  return cache[key].data;
}

function checker(someVar)
{
    return someVar;
}

function parseMovie(movieData) {
  try {
    const movieSummaries = movieData.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie{
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
