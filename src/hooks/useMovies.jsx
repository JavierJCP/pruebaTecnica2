import { useCallback, useMemo, useRef, useState } from 'react';
// import whitResults from '../mocks/whitResults.json';
// import noResults from '../mocks/noResults.json';
import { searchMovies } from '../services/movies';

export function useMovies({ search, sort }) {
  // const [responseMovies, setResponseMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);
  const previousSearch = useRef(search);

  // const movies = whitResults.Search

  // const movies = responseMovies.Search;

  // const mappedMovies = movies?.map((movie) => ({
  //   id: movie.imdbID,
  //   title: movie.Title,
  //   year: movie.Year,
  //   poster: movie.Poster,
  // }));

  const getMovies = useCallback(async ({ search }) => {
    // if (search) {
    //   // setResponseMovies(whitResults);
    //   fetch(
    //     `https://www.omdbapi.com/?apikey=${
    //       import.meta.env.VITE_MOVIE_KEY
    //     }&s=${search}`
    //   )
    //     .then((res) => res.json())
    //     .then((json) => {
    //       setResponseMovies(json);
    //     });
    // } else {
    //   setResponseMovies(noResults);
    // }
    if (search === previousSearch.current) return;
    try {
      setLoading(true);
      setErrorSearch(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setErrorSearch(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // const sortMovies = sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  //
  //   : movies;

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  // return {movies: mappedMovies, getMovies}
  return { movies: sortedMovies, getMovies, loading, errorSearch };
}
