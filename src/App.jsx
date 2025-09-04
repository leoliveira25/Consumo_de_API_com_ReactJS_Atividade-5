import { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Pagination from './components/Pagination';
import { API_KEY, API_BASE_URL } from './config';

export default function App() {
  const [view, setView] = useState('search');
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('movieFavorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastQuery, setLastQuery] = useState('');

  const apiKeyMissing = !API_KEY || API_KEY === 'YOUR_TMDB_API_KEY_HERE';

  const searchMovies = useCallback(async (searchQuery, page) => {
    if (apiKeyMissing) {
      setError('Por favor, adicione sua chave de API da TMDB no arquivo .env (VITE_TMDB_API_KEY).');
      return;
    }
    if (!searchQuery) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${page}&language=pt-BR`);
      if (!response.ok) {
        throw new Error('Falha ao buscar os filmes. Verifique sua chave de API e a conexão.');
      }
      const data = await response.json();
      if ((data.results || []).length === 0) {
        setError('Nenhum filme encontrado para esta busca.');
      }
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 0);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, [apiKeyMissing]);

  const handleSearch = (e) => {
    e?.preventDefault?.();
    if (query.trim() === '') return;
    setCurrentPage(1);
    setLastQuery(query);
    searchMovies(query, 1);
    setView('search');
    setSelectedMovie(null);
  };

  const handleShowDetails = async (movieId) => {
    setIsLoading(true);
    setError(null);
    setView('details');
    try {
      const response = await fetch(`${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`);
      if (!response.ok) {
        throw new Error('Não foi possível carregar os detalhes do filme.');
      }
      const data = await response.json();
      setSelectedMovie(data);
    } catch (err) {
      setError(err.message);
      setView('search');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
    setView(lastQuery ? 'search' : 'home');
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      searchMovies(lastQuery, newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const isFav = prev.some(f => f.id === movie.id);
      return isFav ? prev.filter(f => f.id !== movie.id) : [...prev, movie];
    });
  };

  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const favoriteIds = new Set(favorites.map(f => f.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          <span className="text-amber-500">Movie</span>Finder
        </h1>
        <p className="text-gray-400 mt-2">Explore o universo do cinema.</p>
      </header>

      <nav className="flex justify-center space-x-4 mb-8">
        <button onClick={() => { setView('search'); setSelectedMovie(null); }} className={`px-4 py-2 font-semibold rounded-lg ${view === 'search' || view === 'details' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Busca</button>
        <button onClick={() => { setView('favorites'); setSelectedMovie(null); }} className={`px-4 py-2 font-semibold rounded-lg ${view === 'favorites' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Favoritos ({favorites.length})</button>
      </nav>

      {view !== 'details' && (
        <form onSubmit={handleSearch} className="mb-8 max-w-2xl mx-auto">
          <div className="flex rounded-lg shadow-md bg-gray-800 p-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por um filme..."
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none px-4 py-2"
            />
            <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
              Buscar
            </button>
          </div>
        </form>
      )}

      {error && <ErrorMessage message={error} />}
      {isLoading && <LoadingSpinner />}

      {!isLoading && !error && (
        <>
          {view === 'search' && movies.length > 0 && (
            <>
              <MovieList movies={movies} onShowDetails={handleShowDetails} onToggleFavorite={toggleFavorite} favorites={favorites} />
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}

          {view === 'details' && selectedMovie && (
            <MovieDetails
              movie={selectedMovie}
              onClose={handleCloseDetails}
              onToggleFavorite={toggleFavorite}
              isFavorite={favoriteIds.has(selectedMovie.id)}
            />
          )}

          {view === 'favorites' && (
            favorites.length > 0 ? (
              <MovieList movies={favorites} onShowDetails={handleShowDetails} onToggleFavorite={toggleFavorite} favorites={favorites} />
            ) : (
              <p className="text-center text-gray-400 text-lg">Sua lista de favoritos está vazia.</p>
            )
          )}
        </>
      )}

      {apiKeyMissing && (
        <div className="bg-yellow-900 border border-yellow-600 text-yellow-200 px-4 py-3 rounded-lg relative my-8 text-center">
          <strong className="font-bold">Atenção: </strong>
          <span className="block sm:inline">Para a aplicação funcionar, crie um arquivo <code>.env</code> com <code>VITE_TMDB_API_KEY</code>.</span>
        </div>
      )}
    </div>
  );
}
