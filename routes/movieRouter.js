/* eslint-disable radix */
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const dotenv = require('dotenv');
  dotenv.config();
}
const axios = require('axios');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/nowplaying')
  .get((req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`)
      .then((response) => {
        const data = response.data.results;
        return res.status(200).json(data);
      })
      .catch((error) => res.status(500).json(error));
  });

movieRouter.route('/upcoming')
  .get((req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`)
      .then((response) => {
        const data = response.data.results;
        return res.status(200).json(data);
      })
      .catch((error) => res.status(500).json(error));
  });

movieRouter.route('/toprated')
  .get((req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`)
      .then((response) => {
        const data = response.data.results;
        return res.status(200).json(data);
      })
      .catch((error) => res.status(500).json(error));
  });

movieRouter.route('/popular')
  .get((req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&callback=test`)
      .then((response) => {
        const data = response.data.results;
        return res.status(200).json(data);
      })
      .catch((error) => res.status(500).json(error));
  });

movieRouter.route('/search')
  .get((req, res) => {
    const q = req.query.q.replace(' ', '%20');
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${q}&page=1&include_adult=false`)
      .then((response) => {
        const data = response.data.results;
        return res.status(200).json(data);
      })
      .catch((error) => res.status(500).json(error));
  });

movieRouter.route('/getmovie/:movieId')
  .get((req, res) => {
    // const movieId = parseInt(req.params.movieId);
    axios.get('https://api.themoviedb.org/3/movie/453405?api_key=f012aabf5cd1c2b382fa1b3e3bbce93c&language=en-US')
      .then((response) => {
        const data = response;
        return res.status(200).json(data);
      })
      .catch((error) => res.status(500).json(error));
  });


module.exports = movieRouter;
