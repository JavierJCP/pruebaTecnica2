export async function searchMovies({ search }) {
  if (search === '') return null;
  try {
    const movieRequest = await fetch(
      `https://www.omdbapi.com/?apikey=${
        import.meta.env.VITE_MOVIE_KEY
      }&s=${search}`
    );
    const json = await movieRequest.json();
    const movies = json.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (error) {
    throw new Error('Cant find movies');
  }
}
