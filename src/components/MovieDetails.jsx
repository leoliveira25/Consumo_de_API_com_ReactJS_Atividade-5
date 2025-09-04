import { IMAGE_BASE_URL } from '../config';

export default function MovieDetails({ movie, onClose, onToggleFavorite, isFavorite }) {
  const director = movie.credits?.crew?.find(person => person.job === 'Director');
  const cast = movie.credits?.cast?.slice(0, 5) || [];

  return (
    <div className="bg-gray-900 p-4 sm:p-8 rounded-lg relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-300" aria-label="Fechar">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co/500x750/1f2937/f3f4f6?text=Sem+Imagem'}
            alt={`Pôster de ${movie.title}`}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-4xl font-extrabold text-white mb-2">{movie.title}</h2>
          <p className="text-gray-400 text-lg mb-4">{movie.tagline}</p>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white font-bold">{(movie.vote_average ?? 0).toFixed(1)}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-400">{movie.release_date}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-400">{movie.runtime} min</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Sinopse</h3>
          <p className="text-gray-300 mb-6">{movie.overview || "Sinopse não disponível."}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Diretor</h3>
              <p className="text-gray-300">{director ? director.name : 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Gêneros</h3>
              <p className="text-gray-300">{(movie.genres || []).map(g => g.name).join(', ')}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">Elenco Principal</h3>
          <div className="flex flex-wrap gap-4 mb-6">
            {cast.map(actor => (
              <span key={`${actor.cast_id}-${actor.id}`} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">{actor.name}</span>
            ))}
          </div>

          <button
            onClick={() => onToggleFavorite(movie)}
            className={`w-full text-lg font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center space-x-2 ${isFavorite ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span>{isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
