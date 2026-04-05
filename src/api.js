/* ═══════════════════════════════════════════════
   API Configuration
   Change API_BASE for production deployment.
   ═══════════════════════════════════════════════ */

// In development (Vite proxy handles /api → localhost:8000)
// In production, set this to your backend URL
const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function fetchAPI(endpoint) {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function getGrahaPositions(format = 'summary') {
  return fetchAPI(`/api/v1/graha/positions?format=${format}`);
}

export function getPanchang(lat = 28.6139, lon = 77.209) {
  return fetchAPI(`/api/v1/panchang/today?lat=${lat}&lon=${lon}`);
}

export function getMediniPredictions(category = null) {
  const q = category ? `?category=${category}` : '';
  return fetchAPI(`/api/v1/medini/predictions${q}`);
}
