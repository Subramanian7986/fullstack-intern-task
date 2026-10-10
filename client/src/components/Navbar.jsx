import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/templates" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          TemplateStore
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            to="/templates"
            className={`text-sm font-medium transition ${isActive('/templates') ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
          >
            Templates
          </Link>
          {user ? (
            <>
              <Link
                to="/favorites"
                className={`text-sm font-medium transition ${isActive('/favorites') ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                ♥ My Favorites
              </Link>
              <span className="text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded-full truncate max-w-[140px]">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 px-3 py-1.5 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-500 hover:text-indigo-600 transition">Login</Link>
              <Link to="/register" className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="sm:hidden text-gray-500" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 px-4 py-3 space-y-2 bg-white">
          <Link to="/templates" className="block text-sm text-gray-700 py-1" onClick={() => setMenuOpen(false)}>Templates</Link>
          {user ? (
            <>
              <Link to="/favorites" className="block text-sm text-gray-700 py-1" onClick={() => setMenuOpen(false)}>♥ My Favorites</Link>
              <button onClick={handleLogout} className="block text-sm text-red-500 py-1">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-sm text-gray-700 py-1" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block text-sm text-indigo-600 font-medium py-1" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
