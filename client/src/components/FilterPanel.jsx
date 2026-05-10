import { useState } from 'react';
import './FilterPanel.css';

const CATEGORY_ICONS = {
  'Aydınlatma': '💡',
  'Isıtma': '🔥',
  'Soğutma': '❄️',
  'Yalıtım': '🧱',
  'Enerji Üretimi': '☀️',
  'Su Yönetimi': '💧',
  'Akıllı Sistem': '🤖',
};

const CATEGORY_COLORS = {
  'Aydınlatma': 'var(--cat-aydinlatma)',
  'Isıtma': 'var(--cat-isitma)',
  'Soğutma': 'var(--cat-sogutma)',
  'Yalıtım': 'var(--cat-yalitim)',
  'Enerji Üretimi': 'var(--cat-enerji)',
  'Su Yönetimi': 'var(--cat-su)',
  'Akıllı Sistem': 'var(--cat-akilli)',
};

export default function FilterPanel({ categories, filters, onFilterChange }) {
  const [expanded, setExpanded] = useState(true);

  const toggleCategory = (cat) => {
    const current = filters.categories || [];
    const updated = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    onFilterChange({ ...filters, categories: updated });
  };

  const handleMinSustainability = (value) => {
    onFilterChange({ ...filters, minSustainability: parseInt(value, 10) });
  };

  const toggleEcoMode = () => {
    onFilterChange({ ...filters, ecoMode: !filters.ecoMode });
  };

  return (
    <div className="filter-panel glass animate-slide-left">
      <div className="filter-header" onClick={() => setExpanded(!expanded)}>
        <h3 className="filter-title">
          <span className="filter-title-icon">🔍</span>
          Filtreler
        </h3>
        <span className={`filter-chevron ${expanded ? 'open' : ''}`}>▾</span>
      </div>

      {expanded && (
        <div className="filter-body animate-fade-in">
          {/* Eco Mode Toggle */}
          <div className="filter-section">
            <div
              className={`eco-toggle ${filters.ecoMode ? 'active' : ''}`}
              onClick={toggleEcoMode}
            >
              <div className="eco-toggle-track">
                <div className="eco-toggle-thumb" />
              </div>
              <div className="eco-toggle-label">
                <span className="eco-icon">🌿</span>
                <div>
                  <span className="eco-text">Eko Mod</span>
                  <span className="eco-desc">Sadece sürdürülebilirlik puanı ≥ 4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Min Sustainability Score */}
          <div className="filter-section">
            <label className="filter-label">
              Min. Sürdürülebilirlik Puanı
              <span className="filter-value-badge">{filters.minSustainability || 1}</span>
            </label>
            <div className="sustainability-slider">
              <input
                type="range"
                min="1"
                max="5"
                value={filters.minSustainability || 1}
                onChange={(e) => handleMinSustainability(e.target.value)}
                className="slider"
                id="sustainability-slider"
              />
              <div className="slider-labels">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`slider-label ${(filters.minSustainability || 1) >= n ? 'active' : ''}`}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <label className="filter-label">Kategoriler</label>
            <div className="category-grid">
              {categories.map((cat) => {
                const isSelected = !filters.categories?.length || filters.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    className={`category-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleCategory(cat)}
                    style={{
                      '--chip-color': CATEGORY_COLORS[cat] || 'var(--green-400)',
                    }}
                  >
                    <span className="chip-icon">{CATEGORY_ICONS[cat] || '📦'}</span>
                    <span className="chip-text">{cat}</span>
                  </button>
                );
              })}
            </div>
            {filters.categories?.length > 0 && (
              <button
                className="clear-filters-btn"
                onClick={() => onFilterChange({ ...filters, categories: [] })}
              >
                Tümünü Seç
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
