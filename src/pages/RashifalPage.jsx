import { useState, useEffect } from 'react';
import { getRashifal } from '../api';
import { SectionHeader, Divider } from '../components/Shared';
import { useLang } from '../i18n/LanguageContext';
import { RASHI_SYMBOLS } from '../data/constants';

const RATING_STYLES = {
  5: { color: '#2D6B3F', bg: 'rgba(45,107,63,0.10)', label: 'Excellent', labelHi: 'उत्कृष्ट' },
  4: { color: '#2D6B3F', bg: 'rgba(45,107,63,0.06)', label: 'Good', labelHi: 'अच्छा' },
  3: { color: '#9A7209', bg: 'rgba(154,114,9,0.08)', label: 'Average', labelHi: 'सामान्य' },
  2: { color: '#8B2500', bg: 'rgba(139,37,0,0.06)', label: 'Challenging', labelHi: 'चुनौतीपूर्ण' },
  1: { color: '#8B2500', bg: 'rgba(139,37,0,0.10)', label: 'Difficult', labelHi: 'कठिन' },
};

function RashiCard({ rashi, lang }) {
  const [expanded, setExpanded] = useState(false);
  const sym = RASHI_SYMBOLS[rashi.rashi] || '★';
  const rating = rashi.rating || 3;
  const style = RATING_STYLES[rating] || RATING_STYLES[3];
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const predictions = lang.startsWith('hi') ? rashi.predictions_hi : rashi.predictions_en;
  const keyTransits = rashi.key_transits || [];

  return (
    <div style={{
      background: style.bg, border: `1px solid rgba(92,64,51,0.12)`,
      borderLeft: `3px solid ${style.color}`,
      padding: '16px 20px', marginBottom: 14,
      cursor: 'pointer', transition: 'all 0.2s',
    }} onClick={() => setExpanded(!expanded)}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>{sym}</span>
          <div>
            <span style={{ fontFamily: 'var(--font-sanskrit)', fontSize: 18, color: 'var(--ink)', fontWeight: 600 }}>
              {rashi.rashi_sa}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--burnt-sienna)', marginLeft: 8, letterSpacing: 1, textTransform: 'uppercase' }}>
              {rashi.rashi_en}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{
            fontSize: 12, color: style.color, border: `1px solid ${style.color}`,
            padding: '2px 12px', fontFamily: 'var(--font-body)',
          }}>
            {lang.startsWith('hi') ? style.labelHi : style.label}
          </span>
          <div style={{ fontSize: 18, color: 'var(--ochre)', letterSpacing: 2, marginTop: 4 }}>
            {stars}
          </div>
        </div>
      </div>

      {/* Top predictions (always visible) */}
      <div style={{ marginTop: 12 }}>
        {predictions.slice(0, 2).map((p, i) => (
          <div key={i} style={{
            fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink)',
            lineHeight: 1.8, padding: '3px 0',
          }}>
            • {p}
          </div>
        ))}
      </div>

      {/* Key transits pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
        {keyTransits.map((kt, i) => {
          const c = kt.is_favorable ? '#2D6B3F' : '#8B2500';
          return (
            <span key={i} style={{
              display: 'inline-block', padding: '2px 10px',
              fontSize: 11, border: `1px solid ${c}`, color: c,
              background: 'rgba(0,0,0,0.02)', fontFamily: 'var(--font-body)',
            }}>
              {kt.graha_sa}{kt.is_retrograde ? ' ↺' : ''} → H{kt.house}
            </span>
          );
        })}
      </div>

      {/* Expanded: all predictions + all transits */}
      {expanded && (
        <div style={{ marginTop: 14, borderTop: '1px solid rgba(92,64,51,0.1)', paddingTop: 12 }}>
          {predictions.slice(2).map((p, i) => (
            <div key={i} style={{
              fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink)',
              lineHeight: 1.8, padding: '3px 0',
            }}>
              • {p}
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--ochre)',
              letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8,
            }}>
              {lang.startsWith('hi') ? 'सभी गोचर' : 'ALL TRANSITS'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 6 }}>
              {(rashi.all_transits || []).map((t, i) => {
                const c = t.is_favorable ? '#2D6B3F' : '#8B2500';
                return (
                  <div key={i} style={{
                    fontFamily: 'var(--font-body)', fontSize: 11, color: c,
                    padding: '4px 8px', background: 'rgba(245,230,200,0.4)',
                    border: '1px solid rgba(92,64,51,0.06)',
                  }}>
                    <strong>{t.graha_sa}</strong> {t.rashi_sa} → H{t.house}
                    {t.is_retrograde ? ' ↺' : ''}
                    {t.dignity !== 'neutral' ? ` (${t.dignity})` : ''}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--burnt-sienna)',
        marginTop: 8, textAlign: 'right',
      }}>
        {expanded ? '▲ collapse' : '▼ tap to expand'}
      </div>
    </div>
  );
}

export default function RashifalPage() {
  const { t, lang } = useLang();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRashifal()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-msg">{t('loading.analysing') || 'Loading...'}</div>;
  if (error) return <div className="error-msg">Error: {error}</div>;
  if (!data) return null;

  const rashifal = data.rashifal || [];

  return (
    <div className="page-content" style={{ maxWidth: 780, margin: '0 auto' }}>
      <SectionHeader sa="राशिफल" en={t('rashifal.title') || 'Daily Rashifal — Vedic Horoscope'} />
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ochre)', textAlign: 'center', marginBottom: 16 }}>
        गोचर आधारित राशिफल · {t('rashifal.subtitle') || 'Transit-based daily predictions'} · {data.date_utc}
      </div>

      {rashifal.map((r, i) => <RashiCard key={i} rashi={r} lang={lang} />)}

      <Divider />
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--burnt-sienna)', textAlign: 'center', fontStyle: 'italic', marginTop: 8 }}>
        {t('rashifal.note') || 'Based on classical Gochar Phala from Brihat Parashara Hora Shastra. Predictions use Chandra Rashi (Moon sign) transit analysis.'}
      </div>
    </div>
  );
}
