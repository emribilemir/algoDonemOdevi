import { useEffect, useRef } from 'react';
import './BudgetBar.css';

export default function BudgetBar({ budget, maxBudget, onBudgetChange }) {
  const barRef = useRef(null);

  // Format number with Turkish locale
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('tr-TR').format(num);
  };

  // Percentage for the fill bar
  const percentage = ((budget - 50000) / (maxBudget - 50000)) * 100;

  return (
    <div className="budget-bar-container glass animate-slide-right">
      <div className="budget-header">
        <h3 className="budget-title">
          <span className="budget-icon">💰</span>
          Bütçe Ayarı
        </h3>
        <div className="budget-amount">
          <span className="budget-value">{formatCurrency(budget)}</span>
          <span className="budget-currency"> ₺</span>
        </div>
      </div>

      <div className="budget-slider-container">
        <input
          type="range"
          min="50000"
          max={maxBudget}
          step="5000"
          value={budget}
          onChange={(e) => onBudgetChange(parseInt(e.target.value, 10))}
          className="budget-slider"
          id="budget-slider"
        />
        <div className="budget-bar-track" ref={barRef}>
          <div
            className="budget-bar-fill"
            style={{ width: `${percentage}%` }}
          />
          <div
            className="budget-bar-glow"
            style={{ left: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="budget-range-labels">
        <span>₺{formatCurrency(50000)}</span>
        <span className="budget-mid">₺{formatCurrency(Math.round(maxBudget / 2))}</span>
        <span>₺{formatCurrency(maxBudget)}</span>
      </div>

      {/* Quick preset buttons */}
      <div className="budget-presets">
        {[500000, 1000000, 1500000, 2000000, 3000000].map((val) => (
          <button
            key={val}
            className={`preset-btn ${budget === val ? 'active' : ''}`}
            onClick={() => onBudgetChange(val)}
          >
            ₺{val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}K`}
          </button>
        ))}
      </div>
    </div>
  );
}
