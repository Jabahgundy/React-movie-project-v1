/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListTitle from './components/MovieListTitle';
import Search from './components/Search';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {
  const [movies, setMovies] = useState([]);


  const [favorites, setFavorites] = useState([]);

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

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites')
    );
    setFavorites(movieFavorites);
  }, []);


  // this is how to save items to local storage //
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
  }

  // Here's the function to update the movie list array//
  const AddFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }
  // Function to remove from the array of movies //
  const RemoveFavoritesMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );

    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  // RETURN is when you render the info you want users to see //

  return (
    <div className='container-fluid movie-app'>
      <div className='col d-flex align-items-center mt-4 mb-4'>
        <MovieListTitle title='Movies' />
        {/* SEARCH VALUES */}
        <Search searchVal={searchVal} setSearchVal={setSearchVal} />
      </div>
      {/* Add favorites function */}
      <div className='col row'>
        <MovieList movies={movies}
          handleFavoritesClick={AddFavoriteMovie}
          FavoritesComponent={AddFavorites} />
      </div>

      <div className='col d-flex align-items-center mt-4 mb-4'>
        <MovieListTitle title='Favorites' />
      </div>
      {/* remove favorites function */}
      <div className='col row'>
        <MovieList movies={favorites}
          handleFavoritesClick={RemoveFavoritesMovie}
          FavoritesComponent={RemoveFavorites} />
      </div>
    </div>
  );
}

export default App;
