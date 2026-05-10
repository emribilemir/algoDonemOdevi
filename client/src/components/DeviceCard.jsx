import { useState } from 'react';
import './DeviceCard.css';

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

export default function DeviceCard({ device, index = 0 }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const formatCurrency = (num) =>
    new Intl.NumberFormat('tr-TR').format(num);

  const objValue = device.energySaving * device.sustainabilityScore;
  const co2 = (device.energySaving * 0.42).toFixed(1);
  const catColor = CATEGORY_COLORS[device.category] || 'var(--green-400)';

  return (
    <div
      className="device-card glass animate-fade-in-up"
      style={{
        '--device-color': catColor,
        animationDelay: `${index * 60}ms`,
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Category badge */}
      <div className="device-category-badge" style={{ color: catColor }}>
        <span>{CATEGORY_ICONS[device.category] || '📦'}</span>
        <span>{device.category}</span>
      </div>

      {/* Device name */}
      <h4 className="device-name">{device.name}</h4>

      {/* Sustainability stars */}
      <div className="device-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= device.sustainabilityScore ? 'filled' : ''}`}
          >
            ⭐
          </span>
        ))}
        <span className="star-label">Sürdürülebilirlik</span>
      </div>

      {/* Stats grid */}
      <div className="device-stats">
        <div className="device-stat">
          <span className="device-stat-label">Maliyet</span>
          <span className="device-stat-value cost">₺{formatCurrency(device.cost)}</span>
        </div>
        <div className="device-stat">
          <span className="device-stat-label">Enerji Tasarrufu</span>
          <span className="device-stat-value energy">{formatCurrency(device.energySaving)} kWh</span>
        </div>
      </div>

      {/* Objective value bar */}
      <div className="device-obj-section">
        <div className="device-obj-header">
          <span className="device-obj-label">Etki Puanı (E×S)</span>
          <span className="device-obj-value">{formatCurrency(objValue)}</span>
        </div>
        <div className="device-obj-bar">
          <div
            className="device-obj-fill"
            style={{ width: `${Math.min((objValue / 70000) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="device-tooltip glass-strong animate-scale-in">
          <div className="tooltip-row">
            <span>🌍 CO₂ Azaltma</span>
            <strong>{co2} kg/yıl</strong>
          </div>
          <div className="tooltip-row">
            <span>🌳 Ağaç Eşdeğeri</span>
            <strong>{Math.round(co2 / 22)} ağaç</strong>
          </div>
          <div className="tooltip-row">
            <span>💰 Maliyet/kWh</span>
            <strong>₺{(device.cost / device.energySaving).toFixed(1)}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
