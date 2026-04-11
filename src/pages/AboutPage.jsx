import { SectionHeader, Divider } from '../components/Shared';
import { useLang } from '../i18n/LanguageContext';

const SAGES = [
  {
    sa: 'वराहमिहिर', en: 'Varahamihira', period: '505–587 CE · Ujjain',
    color: 'var(--ochre)', emoji: '🕉',
    text: 'Brihat Samhita', chapters: '106 Chapters · ~2000 Shlokas',
    powers: 'Graha Gochar, Medini Phala, Eclipse Analysis, Samvatsara, Financial, Topical',
    bio: 'The greatest polymath of classical India — astronomer, astrologer, mathematician. His Brihat Samhita is a 106-chapter encyclopedia of planetary effects on earthly events: wars, rainfall, earthquakes, commodity prices, and the fate of kings.',
    quote: '"Whatever Varahamihira says should be accepted as correct, because he has the support of his unfailing astronomical calculations."',
  },
  {
    sa: 'महर्षि पराशर', en: 'Maharishi Parashara', period: '~1500 BCE · Father of Vedic Horoscopy',
    color: 'var(--sage)', emoji: '🙏',
    text: 'Brihat Parashara Hora Shastra', chapters: '97 Chapters · ~4000 Shlokas',
    powers: 'Daily Rashifal, Janma Kundli, Nation Horoscopes, Vimshottari Dasha',
    bio: 'Revered as the father of Vedic horoscopic astrology. Grandson of Rishi Vasishtha, father of Ved Vyasa. His Brihat Parashara Hora Shastra is the foundational text covering signs, planets, houses, dashas, yogas, and transit predictions.',
    quote: '"Parashara is the root of the tree of Jyotish. All other sages are its branches."',
  },
];

const FEATURES = [
  { sa: 'ग्रह गोचर', en: 'Graha Gochar', text: 'Brihat Samhita', sage: 'वराहमिहिर', ref: 'Ch. 1–17' },
  { sa: 'पञ्चाङ्ग', en: 'Daily Panchang', text: 'Surya Siddhanta', sage: 'मयासुर', ref: 'Classical' },
  { sa: 'मेदिनी फल', en: 'Medini Predictions', text: 'Brihat Samhita', sage: 'वराहमिहिर', ref: 'Ch. 1–106' },
  { sa: 'ग्रहण फल', en: 'Eclipse Analysis', text: 'Brihat Samhita', sage: 'वराहमिहिर', ref: 'Ch. 5–6' },
  { sa: 'संवत्सर फल', en: 'Annual Forecast', text: 'Brihat Samhita + Surya Siddhanta', sage: 'वराहमिहिर', ref: 'Ch. 8' },
  { sa: 'राशिफल', en: 'Daily Rashifal', text: 'BPHS', sage: 'पराशर', ref: 'Gochar Phala' },
  { sa: 'जन्म कुण्डली', en: 'Janma Kundli', text: 'BPHS', sage: 'पराशर', ref: 'Ch. 1–97' },
  { sa: 'राष्ट्र कुण्डली', en: 'Nation Horoscopes', text: 'BPHS', sage: 'पराशर', ref: 'Mundane' },
  { sa: 'आर्थिक ज्योतिष', en: 'Financial Astrology', text: 'Brihat Samhita + BPHS', sage: 'वराहमिहिर + पराशर', ref: 'Ch. 29–32' },
  { sa: 'सामयिक विश्लेषण', en: 'Topical Analysis', text: 'Brihat Samhita', sage: 'वराहमिहिर', ref: 'Multi-chapter' },
];

const SHLOKAS = [
  {
    sa: 'भूकम्पे त्वथ मेषादिषु रवौ शुक्रेऽस्तगे वारुणे\nचन्द्रे वा सकलप्रजाभयकरी भूमेः प्रकम्पो भवेत् ॥',
    en: '"When the Sun is in Aries and Venus is combust, or when the Moon is in a watery sign, earthquakes occur that bring fear to all people."',
    src: 'Brihat Samhita, Ch. 32', color: 'var(--ochre)',
  },
  {
    sa: 'शुक्रेण गुरुणा वापि दृष्टे शशिनि वर्षति ।\nतत्काले प्रावृषो धारा नूनं भवति शस्यदा ॥',
    en: '"When the Moon is aspected by Venus or Jupiter, rainfall occurs. At such times, monsoon showers are abundant and favorable for crops."',
    src: 'Brihat Samhita, Ch. 21', color: 'var(--ochre)',
  },
  {
    sa: 'चन्द्रात् तृतीये गुरुसन्निवेशे\nधनागमः सर्वसुखं नराणाम् ।\nषष्ठे शनेर्भानुजबन्धनं च\nव्ययादिदुःखानि विनाशयन्ति ॥',
    en: '"Jupiter transiting the 3rd from Moon brings wealth and happiness. Saturn in the 6th from Moon destroys debts and sorrows."',
    src: 'BPHS, Gochar Phala Adhyaya', color: 'var(--sage)',
  },
];

const STATS = [
  { value: '1500+', label: 'Years of Wisdom' },
  { value: '6000+', label: 'Sanskrit Shlokas' },
  { value: '203', label: 'Chapters Referenced' },
  { value: '1400+', label: 'Interpretations' },
  { value: '0.001″', label: 'Arc-second Accuracy' },
];

const DIFFS = [
  { bad: 'Other sites use AI/ChatGPT', good: 'We use zero AI. Every prediction is deterministic — classical rules × precise positions. Same input = same output. No hallucination.' },
  { bad: 'Others show vague predictions', good: 'We show the exact shloka, chapter, and verse from Brihat Samhita for every mundane prediction. Full transparency.' },
  { bad: 'Others use Western tropical zodiac', good: 'We use Sidereal zodiac with Lahiri Ayanamsha — the Government of India standard for Panchang computation.' },
  { bad: 'Others mix traditions', good: 'We are purely classical Vedic. No Western aspects, no Sun-sign horoscopes. Only Parashara and Varahamihira.' },
];

const s = {
  card: { background: 'rgba(245,230,200,0.3)', border: '1px solid rgba(92,64,51,0.08)', padding: '24px', marginBottom: 16 },
  h2: { fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--ink)', textAlign: 'center', marginBottom: 16 },
  body: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.9 },
  label: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 },
};

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div className="page-content" style={{ maxWidth: 820, margin: '0 auto' }}>

      {/* ═══ HERO ═══ */}
      <div style={{ textAlign: 'center', padding: '40px 20px 30px', background: 'linear-gradient(180deg, rgba(184,134,11,0.08) 0%, transparent 100%)' }}>
        <div style={{ ...s.label, color: 'var(--ochre)', fontSize: 12, letterSpacing: 3, marginBottom: 16 }}>
          EST. ~500 CE · 1500+ YEARS OF WISDOM
        </div>
        <SectionHeader sa="मेदिनी ज्योतिष" en={t('about.tagline') || 'Ancient Scriptures. Modern Precision. Zero AI.'} />
        <div style={{ fontFamily: 'var(--font-sanskrit)', fontSize: 22, color: 'var(--ochre)', margin: '24px 0 8px', lineHeight: 1.6 }}>
          यथा शिखा मयूराणां नागानां मणयो यथा ।<br />
          तद्वद्वेदाङ्गशास्त्राणां ज्योतिषं मूर्ध्नि वर्तते ॥
        </div>
        <div style={{ ...s.body, fontSize: 13, color: 'var(--burnt-sienna)', fontStyle: 'italic', maxWidth: 560, margin: '0 auto' }}>
          "As the crest of the peacock and the gem of the serpent,<br />
          so is Jyotish — the crown jewel of all Vedangas."
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--ochre)', marginTop: 6 }}>
          — Vedanga Jyotisha, Lagadha (~1400 BCE)
        </div>
      </div>

      {/* ═══ THE SAGES ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, margin: '30px 0' }}>
        {SAGES.map((sage, i) => (
          <div key={i} style={{ ...s.card, borderLeft: `4px solid ${sage.color}` }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 48 }}>{sage.emoji}</span>
              <h2 style={{ fontFamily: 'var(--font-sanskrit)', fontSize: 24, color: 'var(--ink)', margin: '8px 0 4px' }}>{sage.sa}</h2>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, color: 'var(--burnt-sienna)' }}>{sage.en}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: sage.color }}>{sage.period}</div>
            </div>
            <div style={s.body}>
              <p>{sage.bio}</p>
              <p style={{ fontStyle: 'italic', textAlign: 'center', color: sage.color, margin: '12px 0' }}>{sage.quote}</p>
            </div>
            <div style={{ background: `${sage.color}11`, padding: '12px 16px', marginTop: 12 }}>
              <div style={{ ...s.label, color: sage.color }}>PRIMARY TEXT</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 14, color: 'var(--ink)' }}>{sage.text} · {sage.chapters}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)', marginTop: 4 }}>Powers: {sage.powers}</div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ═══ WHAT MAKES US DIFFERENT ═══ */}
      <div style={{ ...s.card, borderLeft: '4px solid var(--blood)', margin: '24px 0' }}>
        <h2 style={s.h2}>🔥 {t('about.diff') || 'What Makes Medini Jyotish Different'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {DIFFS.map((d, i) => (
            <div key={i} style={{ padding: 16, background: 'rgba(139,37,0,0.04)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 15, color: 'var(--blood)', marginBottom: 6 }}>❌ {d.bad}</div>
              <div style={{ ...s.body, lineHeight: 1.7 }}>{d.good}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ═══ FEATURE-TO-SCRIPTURE MAP ═══ */}
      <div style={{ ...s.card, margin: '24px 0' }}>
        <h2 style={s.h2}>📜 {t('about.map') || 'Feature-to-Scripture Traceability'}</h2>
        <div style={{ ...s.body, fontSize: 12, color: 'var(--burnt-sienna)', textAlign: 'center', marginBottom: 16 }}>
          Every feature maps to a specific classical text, sage, and chapter reference.
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--ochre)' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px', ...s.label, color: 'var(--ochre)' }}>Feature</th>
                <th style={{ textAlign: 'left', padding: '8px', ...s.label, color: 'var(--ochre)' }}>Source · Sage · Ref</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(92,64,51,0.08)' }}>
                  <td style={{ fontFamily: 'var(--font-sanskrit)', fontSize: 15, color: 'var(--ink)', padding: '10px 12px' }}>
                    {f.sa}<br /><small style={{ fontFamily: 'var(--font-body)', color: 'var(--burnt-sienna)', fontSize: 11 }}>{f.en}</small>
                  </td>
                  <td style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)', padding: '10px 8px' }}>
                    <strong style={{ color: 'var(--ochre)' }}>{f.text}</strong><br />
                    <span style={{ fontFamily: 'var(--font-sanskrit)', fontSize: 13 }}>{f.sage}</span> · {f.ref}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Divider />

      {/* ═══ SAMPLE SHLOKAS ═══ */}
      <div style={{ ...s.card, borderLeft: '4px solid var(--ochre)', margin: '24px 0' }}>
        <h2 style={s.h2}>📖 {t('about.shlokas') || 'Sample Shlokas That Power Our Predictions'}</h2>
        {SHLOKAS.map((sh, i) => (
          <div key={i} style={{ padding: 16, background: `${sh.color}0A`, marginBottom: i < SHLOKAS.length - 1 ? 16 : 0 }}>
            <div style={{ fontFamily: 'var(--font-sanskrit)', fontSize: 18, color: 'var(--ink)', textAlign: 'center', lineHeight: 1.8, marginBottom: 8, whiteSpace: 'pre-line' }}>
              {sh.sa}
            </div>
            <div style={{ ...s.body, fontSize: 13, color: 'var(--burnt-sienna)', fontStyle: 'italic', textAlign: 'center' }}>{sh.en}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: sh.color, textAlign: 'center', marginTop: 6 }}>— {sh.src}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ═══ TECHNOLOGY ═══ */}
      <div style={{ ...s.card, margin: '24px 0' }}>
        <h2 style={s.h2}>⚙️ {t('about.tech') || 'The Technology Behind the Tradition'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {[
            { icon: '🔭', title: 'Swiss Ephemeris', desc: 'NASA JPL DE431 planetary data. Accuracy < 0.001 arc-seconds. Used by professional observatories worldwide.' },
            { icon: '🌏', title: 'Lahiri Ayanamsha', desc: 'Chitrapaksha — the official standard adopted by the Government of India Calendar Reform Committee (1956).' },
            { icon: '📐', title: 'Classical Rules Engine', desc: '96 Brihat Samhita rules + 108 Gochar Phala transit rules — all hand-encoded from Sanskrit originals.' },
          ].map((t, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 16 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{t.title}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)', lineHeight: 1.7 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ BY THE NUMBERS ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, margin: '24px 0', textAlign: 'center' }}>
        {STATS.map((st, i) => (
          <div key={i} style={s.card}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: 'var(--ochre)' }}>{st.value}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--burnt-sienna)' }}>{st.label}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ═══ PHILOSOPHY ═══ */}
      <div style={{ ...s.card, textAlign: 'center', margin: '24px 0' }}>
        <div style={{ fontFamily: 'var(--font-sanskrit)', fontSize: 20, color: 'var(--ochre)', marginBottom: 12 }}>
          ॐ असतो मा सद्गमय ।
        </div>
        <div style={{ ...s.body, fontSize: 13, color: 'var(--burnt-sienna)', fontStyle: 'italic' }}>
          "From untruth, lead me to truth." — Brihadaranyaka Upanishad
        </div>
        <div style={{ ...s.body, marginTop: 20, lineHeight: 1.8 }}>
          We believe the wisdom of the ancient Rishis deserves to be preserved with dignity, accuracy, and reverence.<br />
          No flashy UI, no clickbait, no sensationalism — just authentic शास्त्रीय ज्ञान.
        </div>
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(92,64,51,0.1)' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--burnt-sienna)' }}>Questions or collaboration:</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 14, color: 'var(--ochre)', marginTop: 4 }}>medinijyotish2027@gmail.com</div>
        </div>
      </div>

      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--burnt-sienna)', textAlign: 'center', fontStyle: 'italic', marginTop: 8 }}>
        All content is based on classical texts for educational purposes only. Not professional advice.
      </div>
    </div>
  );
}
