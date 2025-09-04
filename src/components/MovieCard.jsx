import { IMAGE_BASE_URL } from '../config';

export default function MovieCard({ movie, onShowDetails, onToggleFavorite, isFavorite }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg movie-card flex flex-col">
      <img
        src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co/500x750/1f2937/f3f4f6?text=Sem+Imagem'}
        alt={`Pôster de ${movie.title}`}
        className="w-full h-auto object-cover cursor-pointer"
        onClick={() => onShowDetails(movie.id)}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
        <p className="text-gray-400">{movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</p>
        <div className="mt-auto pt-4 flex space-x-2">
          <button
            onClick={() => onShowDetails(movie.id)}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Detalhes
          </button>
          <button
            onClick={() => onToggleFavorite(movie)}
            className={`w-12 flex-shrink-0 text-white font-bold py-2 px-3 rounded-lg transition duration-300 ${isFavorite ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-700 hover:bg-gray-600'}`}
            title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
