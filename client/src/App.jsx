import { useState, useEffect, useCallback } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';

function App() {
  const [devices, setDevices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('home'); // 'home' | 'results'
  const [error, setError] = useState(null);

  // Fetch all devices on mount
  useEffect(() => {
    fetch('/api/devices')
      .then((res) => res.json())
      .then((data) => {
        setDevices(data.devices);
        setCategories(data.categories);
      })
      .catch((err) => {
        console.error('Failed to fetch devices:', err);
        setError('Cihaz verileri yüklenemedi. Sunucu çalışıyor mu?');
      });
  }, []);

  // Run optimization
  const handleOptimize = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Optimizasyon başarısız.');
      }

      const data = await res.json();
      setResults(data);
      setPage('results');
    } catch (err) {
      console.error('Optimization error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBack = useCallback(() => {
    setPage('home');
    setResults(null);
  }, []);

  return (
    <div className="app">
      {/* Background effects */}
      <div className="bg-gradient" />
      <div className="bg-grid" />

      {/* Header */}
      <header className="app-header glass-strong">
        <div className="header-content">
          <div className="logo-section" onClick={handleBack} style={{ cursor: 'pointer' }}>
            <span className="logo-icon">🌿</span>
            <div>
              <h1 className="logo-title">Yeşil Şehir</h1>
              <p className="logo-subtitle">Karar Destek Sistemi</p>
            </div>
          </div>
          <nav className="nav-pills">
            <button
              className={`nav-pill ${page === 'home' ? 'active' : ''}`}
              onClick={handleBack}
            >
              <span className="nav-icon">🏠️</span>
              Optimizasyon
            </button>
            <button
              className={`nav-pill ${page === 'results' ? 'active' : ''}`}
              onClick={() => results && setPage('results')}
              disabled={!results}
            >
              <span className="nav-icon">📊</span>
              Sonuçlar
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {error && (
          <div className="error-banner animate-fade-in-up">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button onClick={() => setError(null)} className="error-close">✕</button>
          </div>
        )}

        {page === 'home' && (
          <HomePage
            devices={devices}
            categories={categories}
            onOptimize={handleOptimize}
            loading={loading}
          />
        )}

        {page === 'results' && results && (
          <ResultsPage
            results={results}
            onBack={handleBack}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          🌱 Yeşil Şehir Projesi — Algoritma Analizi ve Tasarımı | 0-1 Knapsack Optimizasyonu
        </p>
      </footer>
    </div>
  );
}

export default App;
