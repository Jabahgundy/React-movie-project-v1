import React from 'react';

const MovieList = (props) => {
    return (
        <>
            {props.movies.map((movie, index) =>
                <div className='col image-container d-flex justify-content-start'>
                    <img src={movie.Poster} alt='movie'></img>
                    <div className='overlay d-flex align-items-center justify-content-center'></div>
                </div>
            )}
        </>

    )

}





export default MovieList;