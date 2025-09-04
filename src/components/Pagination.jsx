export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-4 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-700 hover:bg-amber-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Anterior
      </button>
      <span className="text-gray-300 font-semibold">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-700 hover:bg-amber-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Próxima
      </button>
    </div>
  );
}
