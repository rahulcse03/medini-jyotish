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

function buildShareText(rashi, lang, date) {
  const sym = RASHI_SYMBOLS[rashi.rashi] || '★';
  const stars = '★'.repeat(rashi.rating || 3) + '☆'.repeat(5 - (rashi.rating || 3));
  const preds = (lang.startsWith('hi') ? rashi.predictions_hi : rashi.predictions_en) || [];
  const lines = preds.slice(0, 3).map(p => `• ${p}`).join('\n');
  return `${sym} ${rashi.rashi_sa} (${rashi.rashi_en}) ${stars}\n${lines}\n\n🔮 medinijyotish.com/rashifal`;
}

function ShareBar({ rashi, lang, date }) {
  const text = buildShareText(rashi, lang, date);
  const url = 'https://medinijyotish.com/rashifal';
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const btnStyle = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 30, height: 30, borderRadius: '50%', border: 'none',
    cursor: 'pointer', transition: 'transform 0.15s',
  };

  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'flex-end' }}
         onClick={e => e.stopPropagation()}>
      <a href={`https://wa.me/?text=${encodeURIComponent(text)}`}
         target="_blank" rel="noopener noreferrer" title="WhatsApp"
         style={{ ...btnStyle, background: '#25D366' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
         target="_blank" rel="noopener noreferrer" title="X (Twitter)"
         style={{ ...btnStyle, background: '#000' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`}
         target="_blank" rel="noopener noreferrer" title="Facebook"
         style={{ ...btnStyle, background: '#1877F2' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
      <button onClick={handleCopy} title={copied ? 'Copied!' : 'Copy'}
              style={{ ...btnStyle, background: copied ? '#2D6B3F' : 'var(--burnt-sienna)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
          {copied
            ? <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            : <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>}
        </svg>
      </button>
    </div>
  );
}

function RashiCard({ rashi, lang, date }) {
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

      <ShareBar rashi={rashi} lang={lang} date={date} />
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

      {rashifal.map((r, i) => <RashiCard key={i} rashi={r} lang={lang} date={data.date_utc} />)}

      <Divider />
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--burnt-sienna)', textAlign: 'center', fontStyle: 'italic', marginTop: 8 }}>
        {t('rashifal.note') || 'Based on classical Gochar Phala from Brihat Parashara Hora Shastra. Predictions use Chandra Rashi (Moon sign) transit analysis.'}
      </div>
    </div>
  );
}
