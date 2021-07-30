import React from 'react';

const MovieList = (props) => {
    const FavoritesComponent = props.FavoritesComponent;
    return (
        <>
            {props.movies.map((movie, index) =>
                <div className='col image-container d-flex justify-content-start'>
                    <img src={movie.Poster} alt='movie'></img>
                    <div
                        onClick={() => props.handleFavoritesClick(movie)}
                        className='overlay d-flex align-items-center col justify-content-center'>
                        <FavoritesComponent />
                    </div>
                </div>
            )}
        </>

    )

}





export default MovieList;