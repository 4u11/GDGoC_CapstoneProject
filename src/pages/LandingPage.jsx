import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 text-center px-4">
      <h1 className="text-5xl font-bold text-blue-900">Selamat Datang di GDGoC!</h1>
      <p className="text-lg mt-4 text-blue-800">Jelajahi destinasi liburan dengan mudah dan cepat.</p>
      <button
        onClick={() => navigate('/login')}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        Masuk ke Dashboard
      </button>
    </div>
  );
}
