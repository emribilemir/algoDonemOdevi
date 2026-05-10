import './CO2Widget.css';

export default function CO2Widget({ co2Reduction, treeEquivalent, totalEnergySaving }) {
  const formatNumber = (num) =>
    new Intl.NumberFormat('tr-TR').format(Math.round(num));

  // Calculate sustainability rating (based on weighted score)
  const getSustainabilityRating = () => {
    if (co2Reduction > 10000) return { label: 'Mükemmel', class: 'excellent' };
    if (co2Reduction > 5000) return { label: 'Çok İyi', class: 'very-good' };
    if (co2Reduction > 2000) return { label: 'İyi', class: 'good' };
    if (co2Reduction > 500) return { label: 'Orta', class: 'moderate' };
    return { label: 'Düşük', class: 'low' };
  };

  const rating = getSustainabilityRating();

  return (
    <div className="co2-widget glass animate-scale-in">
      {/* Background decoration */}
      <div className="co2-bg-leaf"></div>
      <div className="co2-bg-leaf co2-bg-leaf-2"></div>

      <div className="co2-header">
        <h3 className="co2-title">
          <span className="co2-title-icon">🌍</span>
          Çevresel Etki
        </h3>
        <span className={`co2-rating-badge ${rating.class}`}>
          {rating.label}
        </span>
      </div>

      <div className="co2-main-stat">
        <div className="co2-value-container">
          <span className="co2-big-value">{formatNumber(co2Reduction)}</span>
          <span className="co2-big-unit">kg CO₂/yıl</span>
        </div>
        <p className="co2-description">
          Yıllık karbon emisyonu azaltması
        </p>
      </div>

      <div className="co2-details">
        <div className="co2-detail-item">
          <div className="co2-detail-icon-wrap">
            <span className="co2-detail-icon">🌳</span>
          </div>
          <div>
            <span className="co2-detail-value">{formatNumber(treeEquivalent)}</span>
            <span className="co2-detail-label">Ağaç Eşdeğeri</span>
          </div>
        </div>

        <div className="co2-detail-divider" />

        <div className="co2-detail-item">
          <div className="co2-detail-icon-wrap">
            <span className="co2-detail-icon">⚡</span>
          </div>
          <div>
            <span className="co2-detail-value">{formatNumber(totalEnergySaving)}</span>
            <span className="co2-detail-label">kWh/yıl Tasarruf</span>
          </div>
        </div>

        <div className="co2-detail-divider" />

        <div className="co2-detail-item">
          <div className="co2-detail-icon-wrap">
            <span className="co2-detail-icon">📊</span>
          </div>
          <div>
            <span className="co2-detail-value">0.42</span>
            <span className="co2-detail-label">kg CO₂/kWh Faktör</span>
          </div>
        </div>
      </div>

      <div className="co2-formula">
        <span className="formula-text">
          CO₂ = {formatNumber(totalEnergySaving)} kWh × 0.42 kg/kWh = <strong>{formatNumber(co2Reduction)} kg</strong>
        </span>
      </div>
    </div>
  );
}
