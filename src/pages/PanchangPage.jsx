import { SectionHeader, Divider } from '../components/Shared';

function PanchangItem({ label, labelSa, value, valueSa, extra }) {
  return (
    <div style={{ padding: '14px 0', borderBottom: '1px solid rgba(92,64,51,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: 14, color: 'var(--ink)' }}>{labelSa}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)', marginLeft: 8, letterSpacing: 1, textTransform: 'uppercase' }}>{label}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)', fontWeight: 600 }}>{value}</span>
          {valueSa && <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: 13, color: 'var(--ochre)', marginLeft: 8 }}>{valueSa}</span>}
        </div>
      </div>
      {extra && <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--burnt-sienna)', marginTop: 4, fontStyle: 'italic' }}>{extra}</div>}
    </div>
  );
}

export default function PanchangPage({ data }) {
  if (!data) return null;
  const d = data;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <SectionHeader sa="पञ्चाङ्ग" en="Daily Almanac" sub="The five limbs of the Hindu calendar" />

      {/* Five Angas */}
      <div style={{ background: 'rgba(245,230,200,0.3)', border: '1px solid rgba(92,64,51,0.15)', padding: '8px 24px' }}>
        <PanchangItem label="Tithi" labelSa="तिथि"
          value={`${d.tithi?.paksha} ${d.tithi?.tithi_name}`}
          valueSa={d.tithi?.paksha_sa}
          extra={`Tithi ${d.tithi?.tithi_number} · Remaining: ${d.tithi?.remaining_degrees?.toFixed(1)}°`} />

        <PanchangItem label="Nakshatra" labelSa="नक्षत्र"
          value={`${d.nakshatra?.nakshatra} (Pada ${d.nakshatra?.pada})`}
          valueSa={d.nakshatra?.nakshatra_sa}
          extra={`Lord: ${d.nakshatra?.nakshatra_lord} · Remaining: ${d.nakshatra?.remaining_degrees?.toFixed(1)}°`} />

        <PanchangItem label="Yoga" labelSa="योग"
          value={d.yoga?.yoga}
          extra={`Remaining: ${d.yoga?.remaining_degrees?.toFixed(1)}°`} />

        <PanchangItem label="Karana" labelSa="करण"
          value={d.karana?.karana}
          extra={`Remaining: ${d.karana?.remaining_degrees?.toFixed(1)}°`} />

        <PanchangItem label="Vara" labelSa="वार"
          value={d.vara?.vara}
          valueSa={d.vara?.vara_sa}
          extra={`Lord: ${d.vara?.vara_lord}`} />
      </div>

      <Divider />

      {/* Sunrise / Sunset + Abhijit */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ background: 'rgba(245,230,200,0.3)', border: '1px solid rgba(92,64,51,0.15)', padding: '16px 20px' }}>
          <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 13, color: 'var(--ink)', marginBottom: 10 }}>सूर्योदय / सूर्यास्त</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--burnt-sienna)', lineHeight: 2 }}>
            <div>Sunrise: {d.sunrise?.slice(11, 16)} UTC</div>
            <div>Sunset: {d.sunset?.slice(11, 16)} UTC</div>
          </div>
        </div>
        <div style={{ background: 'rgba(245,230,200,0.3)', border: '1px solid rgba(92,64,51,0.15)', padding: '16px 20px' }}>
          <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 13, color: 'var(--ink)', marginBottom: 10 }}>अभिजित मुहूर्त</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--sage)', fontWeight: 600 }}>
            {d.abhijit_muhurat?.start} – {d.abhijit_muhurat?.end} UTC
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--burnt-sienna)', marginTop: 4, fontStyle: 'italic' }}>
            Most auspicious time of the day
          </div>
        </div>
      </div>

      {/* Inauspicious periods */}
      <div style={{
        marginTop: 16, background: 'rgba(139,37,0,0.04)',
        border: '1px solid rgba(139,37,0,0.12)', padding: '16px 20px',
      }}>
        <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 13, color: 'var(--blood)', marginBottom: 12 }}>
          अशुभ काल — Inauspicious Periods
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--burnt-sienna)' }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4, color: 'var(--blood)' }}>Rahu Kalam</div>
            {d.rahu_kalam?.start} – {d.rahu_kalam?.end} UTC
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4, color: 'var(--blood)' }}>Gulika Kalam</div>
            {d.gulika_kalam?.start} – {d.gulika_kalam?.end} UTC
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4, color: 'var(--blood)' }}>Yamaghanda</div>
            {d.yamaghanda?.start} – {d.yamaghanda?.end} UTC
          </div>
        </div>
      </div>
    </div>
  );
}
