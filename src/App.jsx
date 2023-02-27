import React, { useCallback, useState } from 'react';
import './App.css';
import Movie from './components/Movie';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import debounce from 'just-debounce-it';

function App() {
  const [sort, setSort] = useState(false);

  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const handleSort = () => {
    setSort(!sort);
  };

  const debounceGetMovies = useCallback(
    debounce((search) => {
      // console.log('search', search);
      getMovies({ search });
    }, 300),
    []
  );

  const handleChange = (e) => {
    const newSearch = e.target.value;
    updateSearch(newSearch);

    debounceGetMovies(newSearch);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };

  return (
    <div className='App'>
      <header>
        <h1 className='title'>Search Your Movie</h1>
        <form onSubmit={handleSubmit} className='movie__form'>
          <input onChange={handleChange} value={search} type='text' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
      </header>
      <main>{loading ? <p>Loading</p> : <Movie movies={movies} />}</main>
    </div>
  );
}

export default App;
