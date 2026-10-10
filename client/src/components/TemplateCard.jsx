import { useState } from 'react';

export default function TemplateCard({ template, isFavorited, onToggleFavorite, isLoggedIn }) {
  const [preview, setPreview] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
        <div className="relative group">
          <img
            src={template.thumbnail_url}
            alt={template.name}
            className="w-full h-44 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <button
              onClick={() => setPreview(true)}
              className="bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Quick View
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-800">{template.name}</h3>
              <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                {template.category}
              </span>
            </div>
            {isLoggedIn && (
              <button
                onClick={() => onToggleFavorite(template.id)}
                title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                className={`text-2xl leading-none transition-transform hover:scale-125 ${
                  isFavorited ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
                }`}
              >
                {isFavorited ? '♥' : '♡'}
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-1">{template.description}</p>
        </div>
      </div>

      {/* Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setPreview(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={template.thumbnail_url} alt={template.name} className="w-full h-56 object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-800">{template.name}</h2>
                <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">{template.category}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">{template.description}</p>
              <div className="flex gap-3">
                {isLoggedIn && (
                  <button
                    onClick={() => { onToggleFavorite(template.id); setPreview(false); }}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                      isFavorited
                        ? 'bg-red-50 text-red-500 hover:bg-red-100'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {isFavorited ? '♥ Remove Favorite' : '♡ Add to Favorites'}
                  </button>
                )}
                <button
                  onClick={() => setPreview(false)}
                  className="flex-1 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
