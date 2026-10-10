import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import TemplateCard from '../components/TemplateCard';
import Navbar from '../components/Navbar';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  useEffect(() => {
    api.get('/favorites')
      .then(({ data }) => setFavorites(data))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (id) => {
    await api.delete(`/favorites/${id}`);
    setFavorites((prev) => prev.filter((t) => t.id !== id));
    showToast('Removed from favorites');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-1">My Favorites</h1>
          <p className="text-pink-100">{favorites.length} saved template{favorites.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-44 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">💔</p>
            <p className="text-gray-500 text-lg mb-4">No favorites yet.</p>
            <Link
              to="/templates"
              className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
            >
              Browse Templates
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                isFavorited={true}
                onToggleFavorite={handleRemove}
                isLoggedIn={true}
              />
            ))}
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
