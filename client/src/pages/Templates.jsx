import { useEffect, useState, useCallback } from 'react';
import api from '../api';
import TemplateCard from '../components/TemplateCard';
import Navbar from '../components/Navbar';
import { useAuth } from '../AuthContext';

const CATEGORIES = ['All', 'Landing Page', 'E-Commerce', 'Portfolio', 'Dashboard', 'Blog'];

export default function Templates() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [tmplRes, favRes] = await Promise.all([
        api.get('/templates'),
        user ? api.get('/favorites') : Promise.resolve({ data: [] }),
      ]);
      setTemplates(tmplRes.data);
      setFavorites(new Set(favRes.data.map((t) => t.id)));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const toggleFavorite = async (id) => {
    if (!user) return;
    if (favorites.has(id)) {
      await api.delete(`/favorites/${id}`);
      setFavorites((prev) => { const s = new Set(prev); s.delete(id); return s; });
      showToast('Removed from favorites');
    } else {
      await api.post(`/favorites/${id}`);
      setFavorites((prev) => new Set(prev).add(id));
      showToast('Added to favorites ♥');
    }
  };

  const filtered = templates.filter((t) => {
    const matchCat = category === 'All' || t.category === category;
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Find Your Perfect Template</h1>
          <p className="text-indigo-200 mb-6">Browse {templates.length} professionally designed templates</p>
          <input
            type="text"
            placeholder="Search by name or description..."
            className="w-full max-w-lg bg-white/20 backdrop-blur border border-white/30 text-white placeholder-indigo-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                category === c
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {!user && (
          <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm rounded-xl px-4 py-3 mb-6">
            💡 <a href="/login" className="underline font-medium">Login</a> to save templates to your favorites.
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-44 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-500 text-lg">No templates match your search.</p>
            <button onClick={() => { setSearch(''); setCategory('All'); }} className="mt-3 text-indigo-600 text-sm hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-4">{filtered.length} template{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  isFavorited={favorites.has(t.id)}
                  onToggleFavorite={toggleFavorite}
                  isLoggedIn={!!user}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full shadow-lg transition-all">
          {toast}
        </div>
      )}
    </div>
  );
}
