import { useState } from 'react';
import FilterPanel from './FilterPanel';
import BudgetBar from './BudgetBar';
import './HomePage.css';

const MAX_BUDGET = 3000000;

export default function HomePage({ devices, categories, onOptimize, loading }) {
  const [budget, setBudget] = useState(1500000);
  const [filters, setFilters] = useState({
    categories: [],
    minSustainability: 1,
    ecoMode: false,
  });

  const handleOptimize = () => {
    const params = {
      budget,
      ...(filters.ecoMode && { ecoMode: true }),
      ...(filters.minSustainability > 1 && {
        minSustainability: filters.minSustainability,
      }),
      ...(filters.categories.length > 0 && {
        categories: filters.categories,
      }),
    };
    onOptimize(params);
  };

  // Count filtered devices
  let filteredCount = devices.length;
  if (filters.ecoMode) {
    filteredCount = devices.filter((d) => d.sustainabilityScore >= 4).length;
  }
  if (filters.minSustainability > 1) {
    filteredCount = devices.filter(
      (d) => d.sustainabilityScore >= filters.minSustainability
    ).length;
  }
  if (filters.categories.length > 0) {
    filteredCount = devices.filter(
      (d) =>
        filters.categories.includes(d.category) &&
        d.sustainabilityScore >= (filters.minSustainability || 1)
    ).length;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section animate-fade-in-up">
        <div className="hero-badge">
          <span className="hero-badge-icon">🌍</span>
          0-1 Knapsack Optimizasyonu
        </div>
        <h2 className="hero-title">
          <span className="hero-title-line">Şehriniz için</span>
          <span className="hero-title-accent">En Sürdürülebilir</span>
          <span className="hero-title-line">Cihaz Seçimini Yapın</span>
        </h2>
        <p className="hero-desc">
          Bütçenizi ve tercihlerinizi belirleyin, algoritma sizin için en yüksek çevresel
          etkiyi sağlayan cihaz kombinasyonunu bulsun.
        </p>
      </section>

      {/* Controls Grid */}
      <div className="controls-grid">
        <div className="controls-left">
          <FilterPanel
            categories={categories}
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        <div className="controls-right">
          <BudgetBar
            budget={budget}
            maxBudget={MAX_BUDGET}
            onBudgetChange={setBudget}
          />

          {/* Info card */}
          <div className="info-card glass animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="info-row">
              <span className="info-label">Veri Setindeki Cihazlar</span>
              <span className="info-value">{devices.length}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Filtrelenen Cihazlar</span>
              <span className="info-value highlight">{filteredCount}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Amaç Fonksiyonu</span>
              <span className="info-formula">Z = Σ(Eᵢ × Sᵢ × xᵢ)</span>
            </div>
            <div className="info-row">
              <span className="info-label">Kısıt</span>
              <span className="info-formula">Σ(Cᵢ × xᵢ) ≤ B</span>
            </div>
          </div>

          {/* Optimize Button */}
          <button
            className={`optimize-btn ${loading ? 'loading' : ''}`}
            onClick={handleOptimize}
            disabled={loading || devices.length === 0}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Hesaplanıyor...
              </>
            ) : (
              <>
                <span className="optimize-icon">🚀</span>
                Optimize Et
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
