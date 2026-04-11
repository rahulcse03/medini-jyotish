import { useState, useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon (Leaflet + bundlers issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Timezone-offset lookup for major countries/regions (Nominatim address → tz)
const COUNTRY_TZ = {
  'India': 5.5, 'Sri Lanka': 5.5, 'Nepal': 5.75, 'Bangladesh': 6, 'Pakistan': 5,
  'United Kingdom': 0, 'Ireland': 0, 'Iceland': 0, 'Portugal': 0,
  'France': 1, 'Germany': 1, 'Italy': 1, 'Spain': 1, 'Netherlands': 1, 'Belgium': 1,
  'Switzerland': 1, 'Austria': 1, 'Poland': 1, 'Czech Republic': 1, 'Sweden': 1,
  'Norway': 1, 'Denmark': 1, 'Hungary': 1,
  'Finland': 2, 'Greece': 2, 'Romania': 2, 'Turkey': 3, 'Israel': 2,
  'Saudi Arabia': 3, 'United Arab Emirates': 4, 'Oman': 4, 'Iran': 3.5,
  'Russia': 3, 'Thailand': 7, 'Vietnam': 7, 'Indonesia': 7,
  'Malaysia': 8, 'Singapore': 8, 'China': 8, 'Hong Kong': 8, 'Taiwan': 8,
  'Philippines': 8, 'Japan': 9, 'South Korea': 9,
  'Australia': 10, 'New Zealand': 12,
  'United States of America': -5, 'Canada': -5, 'Mexico': -6,
  'Brazil': -3, 'Argentina': -3, 'Chile': -4, 'Colombia': -5, 'Peru': -5,
  'South Africa': 2, 'Nigeria': 1, 'Egypt': 2, 'Kenya': 3, 'Ethiopia': 3,
};

function estimateTz(lat, lon, country) {
  // Try country lookup first
  if (country && COUNTRY_TZ[country] !== undefined) return COUNTRY_TZ[country];
  // Fallback: longitude-based (rounded to 0.5)
  return Math.round((lon / 15) * 2) / 2;
}

// Reverse geocode a latlng to get place name
async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10&accept-language=en`,
      { headers: { 'User-Agent': 'MediniJyotish/1.0' } }
    );
    const data = await res.json();
    const addr = data.address || {};
    const parts = [addr.city || addr.town || addr.village || addr.hamlet || addr.county, addr.state, addr.country].filter(Boolean);
    return { name: parts.join(', ') || data.display_name || '', country: addr.country || '' };
  } catch { return { name: '', country: '' }; }
}

// Search places by name
async function searchPlaces(query) {
  if (!query || query.length < 2) return [];
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=6&accept-language=en`,
      { headers: { 'User-Agent': 'MediniJyotish/1.0' } }
    );
    return await res.json();
  } catch { return []; }
}

// Component to handle map clicks
function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const geo = await reverseGeocode(lat, lng);
      const tz = estimateTz(lat, lng, geo.country);
      onLocationSelect({ lat, lon: lng, place: geo.name, tz });
    },
  });
  return null;
}

// Component to recenter map
function RecenterMap({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) map.setView([lat, lon], Math.max(map.getZoom(), 10));
  }, [lat, lon, map]);
  return null;
}

export default function LocationPicker({ lat, lon, onLocationSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const debounceRef = useRef(null);

  const handleSearch = useCallback((q) => {
    setQuery(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 2) { setResults([]); return; }
    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      const r = await searchPlaces(q);
      setResults(r);
      setSearching(false);
    }, 400);
  }, []);

  const handleSelect = (r) => {
    const rLat = parseFloat(r.lat);
    const rLon = parseFloat(r.lon);
    const parts = r.display_name.split(', ');
    const country = parts[parts.length - 1] || '';
    const tz = estimateTz(rLat, rLon, country);
    const shortName = parts.slice(0, 3).join(', ');
    onLocationSelect({ lat: rLat, lon: rLon, place: shortName, tz });
    setQuery(shortName);
    setResults([]);
    setShowMap(true);
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
    <div style={{ marginBottom: 16 }}>
      {/* Search input */}
      <label style={labelStyle}>📍 Search Place — स्थान खोजें</label>
      <div style={{ position: 'relative' }}>
        <input
          style={inputStyle}
          type="text"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Type city, town, or village name..."
        />
        {searching && (
          <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--ochre)' }}>
            searching...
          </span>
        )}

        {/* Search results dropdown */}
        {results.length > 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1000,
            background: 'var(--parchment-light)', border: '1px solid rgba(92,64,51,0.25)',
            boxShadow: '0 4px 16px rgba(92,64,51,0.15)', maxHeight: 240, overflowY: 'auto',
          }}>
            {results.map((r, i) => (
              <button key={i} onClick={() => handleSelect(r)} style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px',
                border: 'none', borderBottom: '1px solid rgba(92,64,51,0.08)',
                background: 'transparent', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink)', lineHeight: 1.5,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,230,200,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{r.display_name.split(', ').slice(0, 3).join(', ')}</div>
                <div style={{ fontSize: 10, color: 'var(--ochre)' }}>{r.display_name}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Toggle map button */}
      <button onClick={() => setShowMap(!showMap)} style={{
        marginTop: 8, fontFamily: 'var(--font-body)', fontSize: 11,
        color: 'var(--ochre)', background: 'none',
        border: '1px solid rgba(184,134,11,0.3)', padding: '5px 14px',
        cursor: 'pointer', letterSpacing: 0.5,
      }}>
        {showMap ? '🗺️ Hide Map' : '🗺️ Pick on Map — मानचित्र पर चुनें'}
      </button>

      {/* Map */}
      {showMap && (
        <div style={{ marginTop: 8, border: '1px solid rgba(92,64,51,0.2)', height: 300 }}>
          <MapContainer
            center={[parseFloat(lat) || 20.5937, parseFloat(lon) || 78.9629]}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onLocationSelect={(loc) => {
              onLocationSelect(loc);
              setQuery(loc.place);
            }} />
            <RecenterMap lat={parseFloat(lat)} lon={parseFloat(lon)} />
            {lat && lon && <Marker position={[parseFloat(lat), parseFloat(lon)]} />}
          </MapContainer>
        </div>
      )}
    </div>
  );
}
