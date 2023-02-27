import React from 'react';

function Movie({ movies }) {
  return movies?.length > 0 ? (
    <ul className='movies'>
      {movies?.map((movie) => (
        <li className='movie' key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  ) : (
    <h3>No movies found</h3>
  );
}

export default Movie;
