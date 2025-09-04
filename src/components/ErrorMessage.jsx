export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-lg relative my-4 text-center">
      <strong className="font-bold">Erro: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
