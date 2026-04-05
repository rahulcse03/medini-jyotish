# मेदिनी ज्योतिष — Frontend

> Ancient palm-leaf manuscript UI for the Medini Jyotish engine.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Connect to Backend

For local development, the Vite dev server proxies `/api` requests to `localhost:8000`. Make sure your backend is running.

For production, set the environment variable in Vercel:
```
VITE_API_BASE=https://api.medinijyotish.com
```

## Deploy to Vercel

```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel

# Option 2: Connect GitHub repo
# Push to GitHub → Import in Vercel dashboard → Auto-deploys on push
```

### Vercel Settings
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variable:** `VITE_API_BASE` = your backend URL

## Project Structure

```
src/
├── main.jsx              # React entry point
├── App.jsx               # Main app (data fetching, layout)
├── api.js                # API configuration & helpers
├── index.css             # Global manuscript styles
├── data/
│   └── constants.js      # Rashis, Nakshatras, Graha info
├── components/
│   ├── Shared.jsx        # Divider, Nav, SectionHeader, etc.
│   └── RashiChakra.jsx   # SVG zodiac wheel
└── pages/
    ├── GrahaPage.jsx     # Planetary positions + Chakra
    ├── PanchangPage.jsx  # Daily almanac
    └── MediniPage.jsx    # Brihat Samhita predictions
```

## Design System

- **Fonts:** Tiro Devanagari Sanskrit, Noto Serif Devanagari, EB Garamond
- **Colors:** Parchment, Burnt Sienna, Ink, Ochre, Copper, Sage, Blood
- **Aesthetic:** Ancient manuscript — no rounded corners, no shadows, no emojis

---

*ॐ गुरवे नमः*
