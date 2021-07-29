/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListTitle from './components/MovieListTitle';
import Search from './components/Search';

const App = () => {
  const [movies, setMovies] = useState([]);

  // when user SEARCH the input stays current //
  // ONCE we PASS in the VALUES, users we see results //
  const [searchVal, setSearchVal] = useState('');


  // this is the fetch method for the api
  const getMovieRequest = async (searchVal) => {
    // use back tics and add the searchval so that the api can update your search //
    const url = `http://www.omdbapi.com/?s=${searchVal}&apikey=ea182752`;

    const response = await fetch(url);
    const responseJson = await response.json();
    // Get back the array of movies //
    console.log(responseJson);
    // This get back the info in the url of the API //
    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  };

  // This will call when I creat the search bar for the movies 
  // and render new search when user uses the search bar //
  useEffect(() => {
    getMovieRequest(searchVal);
    // updates when user searches for a movie //
  }, [searchVal]);

  // return is when you render the info you want users to see //
  return (
    <div className='container-fluid movie-app'>
      <div className='col d-flex align-items-center mt-4 mb-4'>
        <MovieListTitle title='Movies' />
        {/* SEARCH VALUES */}
        <Search searchVal={searchVal} setSearchVal={setSearchVal} />
      </div>

      <div className='row'>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
