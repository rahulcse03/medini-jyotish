import { useState } from 'react';
import { SectionHeader, Divider } from '../components/Shared';
import { GRAHA_INFO, findGrahaKey, DIGNITY_COLORS } from '../data/constants';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function KundliForm({ onGenerate, loading }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [lat, setLat] = useState('28.6139');
  const [lon, setLon] = useState('77.2090');
  const [tz, setTz] = useState('5.5');
  const [name, setName] = useState('');

  const commonPlaces = [
    { label: 'Delhi', lat: 28.6139, lon: 77.2090, tz: 5.5 },
    { label: 'Mumbai', lat: 19.0760, lon: 72.8777, tz: 5.5 },
    { label: 'Bangalore', lat: 12.9716, lon: 77.5946, tz: 5.5 },
    { label: 'Chennai', lat: 13.0827, lon: 80.2707, tz: 5.5 },
    { label: 'Kolkata', lat: 22.5726, lon: 88.3639, tz: 5.5 },
    { label: 'Hyderabad', lat: 17.3850, lon: 78.4867, tz: 5.5 },
    { label: 'Pune', lat: 18.5204, lon: 73.8567, tz: 5.5 },
    { label: 'Jaipur', lat: 26.9124, lon: 75.7873, tz: 5.5 },
    { label: 'London', lat: 51.5074, lon: -0.1278, tz: 0 },
    { label: 'New York', lat: 40.7128, lon: -74.0060, tz: -5 },
  ];

  const selectPlace = (p) => {
    setPlace(p.label);
    setLat(String(p.lat));
    setLon(String(p.lon));
    setTz(String(p.tz));
  };

  const handleSubmit = () => {
    if (!date || !time) return;
    onGenerate({ date, time, lat: parseFloat(lat), lon: parseFloat(lon), tz: parseFloat(tz), name, place });
  };

  const inputStyle = {
    fontFamily: 'var(--font-body)', fontSize: 14, padding: '10px 14px',
    border: '1px solid rgba(92,64,51,0.25)', background: 'rgba(245,230,200,0.5)',
    color: 'var(--ink)', width: '100%', outline: 'none',
  };

  const labelStyle = {
    fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--burnt-sienna)',
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4, display: 'block',
  };

  return (
    <div style={{ background: 'rgba(245,230,200,0.3)', border: '1px solid rgba(92,64,51,0.15)', padding: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Name (optional)</label>
          <input style={inputStyle} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div>
          <label style={labelStyle}>Birth Place</label>
          <input style={inputStyle} type="text" value={place} onChange={e => setPlace(e.target.value)} placeholder="City" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Birth Date</label>
          <input style={inputStyle} type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Birth Time (local)</label>
          <input style={inputStyle} type="time" value={time} onChange={e => setTime(e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Latitude</label>
          <input style={inputStyle} type="number" step="0.0001" value={lat} onChange={e => setLat(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Longitude</label>
          <input style={inputStyle} type="number" step="0.0001" value={lon} onChange={e => setLon(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Timezone (UTC±)</label>
          <input style={inputStyle} type="number" step="0.5" value={tz} onChange={e => setTz(e.target.value)} />
        </div>
      </div>

      {/* Quick place selector */}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Quick Select</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {commonPlaces.map(p => (
            <button key={p.label} onClick={() => selectPlace(p)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 11, padding: '4px 10px',
                background: place === p.label ? 'var(--burnt-sienna)' : 'rgba(184,134,11,0.08)',
                color: place === p.label ? 'var(--parchment-light)' : 'var(--burnt-sienna)',
                border: '1px solid rgba(92,64,51,0.15)', cursor: 'pointer',
              }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} disabled={!date || !time || loading}
        style={{
          width: '100%', padding: '14px', fontFamily: 'var(--font-devanagari)',
          fontSize: 16, background: 'var(--burnt-sienna)', color: 'var(--parchment-light)',
          border: 'none', cursor: date && time ? 'pointer' : 'not-allowed',
          letterSpacing: 2, opacity: date && time ? 1 : 0.5,
        }}>
        {loading ? 'गणना हो रही है...' : 'कुण्डली बनाएं — Generate Kundli'}
      </button>
    </div>
  );
}

/* North Indian style chart — diamond layout */
function RashiChart({ houses, lagna, title, titleSa }) {
  if (!houses) return null;

  // North Indian chart positions (house number → grid position)
  const positions = {
    1:  { row: 0, col: 1, points: "150,0 300,150 150,150 0,150" },
    2:  { row: 0, col: 0, points: "0,0 150,0 0,150" },
    3:  { row: 1, col: 0, points: "0,0 150,0 150,150 0,150", flip: true },
    4:  { row: 2, col: 0, points: "0,0 150,0 150,150" },
    5:  { row: 2, col: 1, points: "0,0 300,0 150,150 150,150" },
    6:  { row: 2, col: 2, points: "150,0 300,0 300,150" },
    7:  { row: 2, col: 1, points: "150,150 300,0 300,300 0,300" },
    8:  { row: 2, col: 2, points: "300,0 300,150 150,150" },
    9:  { row: 1, col: 2, points: "0,0 150,0 150,150 0,150" },
    10: { row: 0, col: 2, points: "0,150 150,0 300,150" },
    11: { row: 0, col: 1, points: "0,150 150,300 300,150" },
    12: { row: 0, col: 0, points: "0,0 300,0 0,300" },
  };

  // Simplified: just show as a grid with grahas listed
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: 14, color: 'var(--ink)' }}>{titleSa}</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)', marginLeft: 8 }}>{title}</span>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
        background: 'rgba(92,64,51,0.2)', border: '2px solid var(--burnt-sienna)',
        maxWidth: 400, margin: '0 auto',
      }}>
        {/* Row 1 */}
        <Cell house={houses[11]} /> {/* 12 */}
        <Cell house={houses[0]} isLagna /> {/* 1 - Lagna */}
        <Cell house={houses[1]} /> {/* 2 */}
        <Cell house={houses[2]} /> {/* 3 */}

        {/* Row 2 */}
        <Cell house={houses[10]} /> {/* 11 */}
        <div style={{ gridColumn: 'span 2', gridRow: 'span 2', background: 'var(--parchment-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          padding: 8, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 12, color: 'var(--ochre)' }}>{titleSa}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--burnt-sienna)', marginTop: 4 }}>
            Lagna: {lagna?.rashi_sa} {lagna?.degree?.toFixed(1)}°
          </div>
        </div>
        <Cell house={houses[3]} /> {/* 4 */}

        {/* Row 3 */}
        <Cell house={houses[9]} /> {/* 10 */}
        <Cell house={houses[4]} /> {/* 5 */}

        {/* Row 4 */}
        <Cell house={houses[8]} /> {/* 9 */}
        <Cell house={houses[7]} /> {/* 8 */}
        <Cell house={houses[6]} /> {/* 7 */}
        <Cell house={houses[5]} /> {/* 6 */}
      </div>
    </div>
  );
}

function Cell({ house, isLagna }) {
  if (!house) return <div style={{ background: 'var(--parchment-light)', padding: 6 }} />;
  return (
    <div style={{
      background: isLagna ? 'rgba(184,134,11,0.08)' : 'var(--parchment-light)',
      padding: '6px 4px', minHeight: 60, position: 'relative',
    }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, color: 'var(--ochre)',
        position: 'absolute', top: 2, left: 4 }}>{house.house_number}</div>
      <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 9, color: 'var(--burnt-sienna)',
        position: 'absolute', top: 2, right: 4 }}>{house.rashi_sa}</div>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        {house.grahas?.map(gk => {
          const info = GRAHA_INFO[gk];
          return info ? (
            <span key={gk} style={{
              fontFamily: 'var(--font-devanagari)', fontSize: 12,
              color: info.color, fontWeight: 700, margin: '0 2px',
            }}>{info.sym}</span>
          ) : null;
        })}
      </div>
    </div>
  );
}

function DashaTimeline({ dasha }) {
  if (!dasha?.periods) return null;

  const now = new Date();

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: 14, color: 'var(--ink)' }}>विंशोत्तरी दशा</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)', marginLeft: 8 }}>Vimshottari Dasha</span>
      </div>

      {dasha.current_dasha && (
        <div style={{
          background: 'rgba(74,103,65,0.08)', border: '1px solid rgba(74,103,65,0.2)',
          padding: '10px 16px', marginBottom: 12, textAlign: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--sage)', letterSpacing: 1, textTransform: 'uppercase' }}>Current Mahadasha</span>
          <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 18, color: 'var(--ink)', marginTop: 4 }}>
            {dasha.current_dasha.lord_sa}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)' }}>
            {dasha.current_dasha.start} to {dasha.current_dasha.end}
          </div>
        </div>
      )}

      <div style={{ background: 'rgba(245,230,200,0.3)', border: '1px solid rgba(92,64,51,0.15)' }}>
        {dasha.periods.slice(0, 12).map((d, i) => {
          const isActive = dasha.current_dasha?.lord === d.lord &&
            dasha.current_dasha?.start === d.start;
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '50px 1fr 80px',
              padding: '8px 16px', borderBottom: '1px solid rgba(92,64,51,0.08)',
              background: isActive ? 'rgba(74,103,65,0.06)' : 'transparent',
              alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-devanagari)', fontSize: 14,
                color: isActive ? 'var(--sage)' : 'var(--ink)', fontWeight: isActive ? 700 : 400,
              }}>{d.lord_sa}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)' }}>
                {d.start} → {d.end}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--ochre)', textAlign: 'right' }}>
                {d.years} yrs
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function KundliPage() {
  const [kundli, setKundli] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const q = new URLSearchParams({
        date: params.date,
        time: params.time,
        lat: String(params.lat),
        lon: String(params.lon),
        tz: String(params.tz),
        name: params.name || '',
        place: params.place || '',
      });
      const res = await fetch(`${API_BASE}/api/v1/kundli/generate?${q}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setKundli(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <SectionHeader sa="जन्म कुण्डली" en="Birth Chart" sub="Enter birth details to generate your Vedic horoscope" />

      <KundliForm onGenerate={handleGenerate} loading={loading} />

      {error && (
        <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(139,37,0,0.06)',
          border: '1px solid rgba(139,37,0,0.2)', fontFamily: 'var(--font-body)',
          fontSize: 13, color: 'var(--blood)', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {kundli && (
        <div style={{ marginTop: 24, animation: 'fadeSlideIn 0.5s ease' }}>
          {/* Header */}
          {kundli.name && (
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--ink)' }}>{kundli.name}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)' }}>
                {kundli.birth_details?.date} · {kundli.birth_details?.time} · {kundli.birth_details?.place}
              </div>
            </div>
          )}

          {/* Lagna info */}
          <div style={{
            textAlign: 'center', padding: '12px 20px', marginBottom: 20,
            background: 'rgba(184,134,11,0.06)', border: '1px solid rgba(184,134,11,0.15)',
          }}>
            <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: 13, color: 'var(--ochre)' }}>लग्न</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--burnt-sienna)', marginLeft: 8 }}>Ascendant:</span>
            <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: 16, color: 'var(--ink)', marginLeft: 8, fontWeight: 600 }}>
              {kundli.lagna?.rashi_sa}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', marginLeft: 6 }}>
              {kundli.lagna?.rashi} {kundli.lagna?.degree?.toFixed(2)}°
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)', marginLeft: 8 }}>
              {kundli.lagna?.nakshatra} P{kundli.lagna?.pada}
            </span>
          </div>

          {/* Rashi Chart */}
          <RashiChart houses={kundli.houses} lagna={kundli.lagna} title="Rashi Chart (D1)" titleSa="राशि चक्र" />

          <Divider />

          {/* Graha Table */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: 14, color: 'var(--ink)' }}>ग्रह स्थिति</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)', marginLeft: 8 }}>Planetary Positions</span>
            </div>
            <div style={{ background: 'rgba(245,230,200,0.3)', border: '1px solid rgba(92,64,51,0.15)', overflow: 'auto' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '55px 80px 50px 90px 40px 65px 60px',
                padding: '8px 12px', borderBottom: '2px solid rgba(92,64,51,0.2)',
                fontFamily: 'var(--font-body)', fontSize: 9, color: 'var(--burnt-sienna)',
                letterSpacing: 1, textTransform: 'uppercase', minWidth: 500,
              }}>
                <div>Graha</div><div>Rashi</div><div>Deg</div><div>Nakshatra</div>
                <div>House</div><div>Dignity</div><div>D9</div>
              </div>
              {Object.entries(kundli.grahas || {}).map(([key, g]) => {
                const info = GRAHA_INFO[key];
                return (
                  <div key={key} style={{
                    display: 'grid', gridTemplateColumns: '55px 80px 50px 90px 40px 65px 60px',
                    padding: '8px 12px', borderBottom: '1px solid rgba(92,64,51,0.08)',
                    alignItems: 'center', minWidth: 500,
                  }}>
                    <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: 13, color: info?.color || 'var(--ink)', fontWeight: 700 }}>
                      {g.name_sa}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink)' }}>
                      {g.rashi_sa} {g.rashi}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--ochre)' }}>
                      {g.degree?.toFixed(1)}°
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--burnt-sienna)' }}>
                      {g.nakshatra} P{g.pada}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink)', fontWeight: 600 }}>
                      {g.house}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: DIGNITY_COLORS[g.dignity] || 'var(--burnt-sienna)', fontStyle: 'italic' }}>
                      {g.dignity !== 'neutral' ? g.dignity : ''}
                      {g.is_retrograde ? ' ℞' : ''}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--burnt-sienna)' }}>
                      {g.navamsha_rashi_sa}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <Divider />

          {/* Dasha */}
          <DashaTimeline dasha={kundli.vimshottari_dasha} />
        </div>
      )}
    </div>
  );
}
