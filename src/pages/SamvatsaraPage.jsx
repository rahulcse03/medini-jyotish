import { SectionHeader, Divider } from '../components/Shared';

const NATURE_STYLES = {
  shubh:    { bg: 'rgba(74,103,65,0.08)', border: '#4A6741', color: '#4A6741', dot: '#4A6741' },
  savdhan:  { bg: 'rgba(184,134,11,0.08)', border: '#B8860B', color: '#B8860B', dot: '#B8860B' },
  chetavani:{ bg: 'rgba(139,37,0,0.08)', border: '#8B2500', color: '#8B2500', dot: '#8B2500' },
};

export default function SamvatsaraPage({ data }) {
  if (!data) return null;
  const s = data.samvatsara;
  const m = data.mesha_sankranti;
  const style = NATURE_STYLES[s?.nature] || NATURE_STYLES.savdhan;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <SectionHeader sa="संवत्सर फल" en="Annual Predictions" sub={`Year ${data.year} — Based on the 60-year Jovian cycle`} />

      {/* Main Samvatsara Card */}
      <div style={{
        background: style.bg, border: `2px solid ${style.border}`,
        padding: '28px 24px', marginBottom: 24, textAlign: 'center',
      }}>
        {/* Year name */}
        <div style={{ fontFamily: 'var(--font-sanskrit)', fontSize: 32, color: 'var(--ink)', marginBottom: 4 }}>
          {s?.samvatsara_name_sa}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--burnt-sienna)', letterSpacing: 3, marginBottom: 8 }}>
          {s?.samvatsara_name} Samvatsara
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ochre)', marginBottom: 16 }}>
          Year {s?.samvatsara_index} of 60 · Ruling Planet: {s?.ruling_planet}
        </div>

        {/* Nature badge */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 16px',
          border: `1px solid ${style.border}`, fontFamily: 'var(--font-devanagari)',
          fontSize: 14, color: style.color,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: style.dot, display: 'inline-block' }} />
          {s?.nature_sa}
        </span>
      </div>

      {/* Annual Prediction */}
      <div style={{
        background: 'rgba(245,230,200,0.3)', border: '1px solid rgba(92,64,51,0.15)',
        padding: '20px 24px', marginBottom: 24,
      }}>
        <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 14, color: 'var(--ochre)', marginBottom: 10 }}>
          वार्षिक भविष्यवाणी — Annual Prediction
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)', lineHeight: 1.9 }}>
          {s?.prediction}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--ochre)', marginTop: 12, fontStyle: 'italic' }}>
          Source: {s?.source}
        </div>
      </div>

      {/* Mesha Sankranti Chart */}
      {m && (
        <>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: 16, color: 'var(--ink)' }}>मेष संक्रान्ति</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)', marginLeft: 8 }}>Vedic New Year Chart</span>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24,
          }}>
            <div style={{ background: 'rgba(245,230,200,0.3)', border: '1px solid rgba(92,64,51,0.15)', padding: '16px 20px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--ochre)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Sankranti Date</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)', fontWeight: 600 }}>{m.sankranti_date}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)' }}>{m.sankranti_time_utc}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)', marginTop: 4 }}>{m.weekday}</div>
            </div>
            <div style={{ background: 'rgba(245,230,200,0.3)', border: '1px solid rgba(92,64,51,0.15)', padding: '16px 20px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--ochre)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Year Lord</div>
              <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 18, color: 'var(--ink)', fontWeight: 600 }}>{m.year_lord_sa}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)' }}>{m.year_lord_title}</div>
              <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 11, color: 'var(--ochre)', marginTop: 2 }}>{m.year_lord_title_sa}</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(245,230,200,0.3)', border: '1px solid rgba(92,64,51,0.15)',
            padding: '14px 20px', marginBottom: 24, textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--ochre)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Moon at Sankranti</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)' }}>
              Moon in {m.moon_rashi} — influences public mood and agricultural patterns for the year
            </div>
          </div>
        </>
      )}

      <Divider />

      {/* Year Navigator */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24,
        padding: '12px 0',
      }}>
        <div style={{ textAlign: 'center', opacity: 0.5 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--burnt-sienna)', letterSpacing: 1, textTransform: 'uppercase' }}>Previous</div>
          <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 13, color: 'var(--ink)' }}>{data.previous_year?.name_sa}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--burnt-sienna)' }}>{data.previous_year?.year}</div>
        </div>
        <div style={{ width: 1, height: 40, background: 'rgba(92,64,51,0.15)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--ochre)', letterSpacing: 1, textTransform: 'uppercase' }}>Current</div>
          <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 16, color: 'var(--ink)', fontWeight: 700 }}>{s?.samvatsara_name_sa}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink)', fontWeight: 600 }}>{data.year}</div>
        </div>
        <div style={{ width: 1, height: 40, background: 'rgba(92,64,51,0.15)' }} />
        <div style={{ textAlign: 'center', opacity: 0.5 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--burnt-sienna)', letterSpacing: 1, textTransform: 'uppercase' }}>Next</div>
          <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 13, color: 'var(--ink)' }}>{data.next_year?.name_sa}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--burnt-sienna)' }}>{data.next_year?.year}</div>
        </div>
      </div>
    </div>
  );
}
