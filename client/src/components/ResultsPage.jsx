import StatCard from './StatCard';
import DeviceCard from './DeviceCard';
import CO2Widget from './CO2Widget';
import './ResultsPage.css';

export default function ResultsPage({ results, onBack }) {
  const formatCurrency = (num) =>
    new Intl.NumberFormat('tr-TR').format(num);

  const {
    selectedDevices,
    totalCost,
    totalEnergySaving,
    totalSustainabilityScore,
    objectiveValue,
    co2Reduction,
    treeEquivalent,
    budget,
    budgetRemaining,
    filtersApplied,
    totalDevicesConsidered,
  } = results;

  const budgetUsagePercent = ((totalCost / budget) * 100).toFixed(1);

  return (
    <div className="results-page">
      {/* Results Header */}
      <div className="results-header animate-fade-in-up">
        <button className="back-btn" onClick={onBack}>
          <span>←</span> Yeni Optimizasyon
        </button>
        <div className="results-title-section">
          <h2 className="results-title">
            <span className="results-icon">✨</span>
            Optimizasyon Sonuçları
          </h2>
          <p className="results-subtitle">
            {totalDevicesConsidered} cihaz arasından {selectedDevices.length} cihaz seçildi
            {filtersApplied.ecoMode && ' (Eko Mod aktif)'}
          </p>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="stats-grid">
        <StatCard
          icon="💰"
          label="Toplam Maliyet"
          value={totalCost}
          unit="₺"
          color="#f59e0b"
          delay={0}
        />
        <StatCard
          icon="⚡"
          label="Enerji Tasarrufu"
          value={totalEnergySaving}
          unit="kWh/yıl"
          color="var(--green-400)"
          delay={100}
        />
        <StatCard
          icon="🌿"
          label="Sürdürülebilirlik"
          value={totalSustainabilityScore}
          unit="/ 5"
          color="#34d399"
          delay={200}
        />
        <StatCard
          icon="🎯"
          label="Amaç Fonksiyonu (Z)"
          value={objectiveValue}
          unit="puan"
          color="#8b5cf6"
          delay={300}
        />
      </div>

      {/* Budget Usage Bar */}
      <div className="budget-usage glass animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="budget-usage-header">
          <span className="budget-usage-title">📊 Bütçe Kullanımı</span>
          <span className="budget-usage-percent">{budgetUsagePercent}%</span>
        </div>
        <div className="budget-usage-bar">
          <div
            className="budget-usage-fill"
            style={{ width: `${budgetUsagePercent}%` }}
          />
        </div>
        <div className="budget-usage-details">
          <span>Kullanılan: ₺{formatCurrency(totalCost)}</span>
          <span>Kalan: ₺{formatCurrency(budgetRemaining)}</span>
          <span>Toplam: ₺{formatCurrency(budget)}</span>
        </div>
      </div>

      {/* CO2 Widget */}
      <CO2Widget
        co2Reduction={co2Reduction}
        treeEquivalent={treeEquivalent}
        totalEnergySaving={totalEnergySaving}
      />

      {/* Selected Devices */}
      <section className="devices-section">
        <h3 className="section-title animate-fade-in-up">
          <span>🛠️</span>
          Seçilen Cihazlar ({selectedDevices.length})
        </h3>

        <div className="devices-grid">
          {selectedDevices.map((device, index) => (
            <DeviceCard
              key={device.id}
              device={device}
              index={index}
            />
          ))}
        </div>

        {selectedDevices.length === 0 && (
          <div className="empty-state glass animate-fade-in">
            <span className="empty-icon">📦</span>
            <p>Bu bütçe ve filtrelerle hiçbir cihaz seçilemedi.</p>
            <p className="empty-hint">Bütçeyi artırmayı veya filtreleri gevşetmeyi deneyin.</p>
          </div>
        )}
      </section>

      {/* Summary Table */}
      {selectedDevices.length > 0 && (
        <section className="summary-section animate-fade-in-up">
          <h3 className="section-title">
            <span>📋</span>
            Özet Tablo
          </h3>
          <div className="summary-table-wrap glass">
            <table className="summary-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cihaz Adı</th>
                  <th>Kategori</th>
                  <th>Maliyet (₺)</th>
                  <th>Enerji Tasarrufu (kWh)</th>
                  <th>Sürd. Puanı</th>
                  <th>Etki (E×S)</th>
                </tr>
              </thead>
              <tbody>
                {selectedDevices.map((d, i) => (
                  <tr key={d.id}>
                    <td className="td-index">{i + 1}</td>
                    <td className="td-name">{d.name}</td>
                    <td className="td-category">{d.category}</td>
                    <td className="td-number">{formatCurrency(d.cost)}</td>
                    <td className="td-number">{formatCurrency(d.energySaving)}</td>
                    <td className="td-center">
                      <span className="score-badge">{'⭐'.repeat(d.sustainabilityScore)}</span>
                    </td>
                    <td className="td-number td-impact">
                      {formatCurrency(d.energySaving * d.sustainabilityScore)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="tf-label">TOPLAM</td>
                  <td className="td-number tf-value">₺{formatCurrency(totalCost)}</td>
                  <td className="td-number tf-value">{formatCurrency(totalEnergySaving)} kWh</td>
                  <td className="td-center tf-value">{totalSustainabilityScore}</td>
                  <td className="td-number tf-value tf-impact">{formatCurrency(objectiveValue)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
