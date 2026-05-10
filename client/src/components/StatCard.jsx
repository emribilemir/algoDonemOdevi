import { useEffect, useState, useRef } from 'react';
import './StatCard.css';

export default function StatCard({ icon, label, value, unit, color, delay = 0 }) {
  const [displayed, setDisplayed] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Animate count up
  useEffect(() => {
    if (!isVisible) return;

    const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;
    if (numericValue === 0) {
      setDisplayed(0);
      return;
    }

    const duration = 1200;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;
    const increment = numericValue / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayed(numericValue);
        clearInterval(timer);
      } else {
        setDisplayed(current);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  // Intersection observer for animation trigger
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) return new Intl.NumberFormat('tr-TR').format(Math.round(val));
      if (val >= 1000) return new Intl.NumberFormat('tr-TR').format(Math.round(val));
      if (Number.isInteger(val)) return val.toString();
      return val.toFixed(2);
    }
    return val;
  };

  return (
    <div
      className="stat-card glass"
      ref={ref}
      style={{
        '--card-color': color || 'var(--green-400)',
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="stat-icon-wrap" style={{ background: `color-mix(in srgb, ${color || 'var(--green-400)'} 12%, transparent)` }}>
        <span className="stat-icon">{icon}</span>
      </div>
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <div className="stat-value-row">
          <span className="stat-value">{formatValue(displayed)}</span>
          {unit && <span className="stat-unit">{unit}</span>}
        </div>
      </div>
      <div className="stat-glow" />
    </div>
  );
}
