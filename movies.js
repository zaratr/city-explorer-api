'use strict'

const axios = require('axios');
module.exports = getMovies;

//const MOVIE = process.env.MOVIE_API_KEY;

async function getMovies(city)
{
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&include_adult=false`;
    let dataToSend = await axios.get(url);
        console.log('-------------------------------->HERE: ', dataToSend, 'HERE<-----------------------------------------')
    //let selectedMovies = new Movies(dataToSend.data.results);

    let arrayOfMovies = [];
    dataToSend.data.results.forEach(obj => {
        let moviesObj = new Movies(obj)
        arrayOfMovies.push(moviesObj);
    });
    return arrayOfMovies;
}


class Movies{
    constructor(movie)
    {
        let x = movie.poster_path !== null? movie.poster_path.replace(/\//g,'') : [];
        //https://api.themoviedb.org/3/movie/550?api_key=17f3a718b0f5d36680aae68a930ccfa4
        //console.log("HERE IS obj: ", movie, typeof(movie.poster_path))
                this.title = movie.title,
                this.overview=movie.overview,
                this.average_votes = movie.vote_average,
                this.total_votes= movie.vote_count,
                this.image_url = "https://api.themoviedb.org/3/movie/550?api_key=" + x;
                this.popularity = movie.popularity,
                this.release_on = movie.release_date
    }
}

