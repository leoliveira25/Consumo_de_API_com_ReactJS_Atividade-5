import MovieCard from './MovieCard';

export default function MovieList({ movies, onShowDetails, onToggleFavorite, favorites }) {
  const favoriteIds = new Set(favorites.map(f => f.id));
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onShowDetails={onShowDetails}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favoriteIds.has(movie.id)}
        />
      ))}
    </div>
  );
}
