const fs = require('fs');

// 1. Hero Mascot (Cyber Developer Mascot / Frog with headphones & glowing laptop)
const mascotSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="mascotGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4ade80" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6ee7b7"/>
      <stop offset="50%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#14532d"/>
      <stop offset="100%" stop-color="#052e16"/>
    </linearGradient>
    <linearGradient id="lipGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f87171"/>
      <stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#15803d" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Ambient Glow -->
  <circle cx="200" cy="200" r="180" fill="url(#mascotGlow)" />

  <!-- Shoulders & Body / Tech Hoodie -->
  <path d="M 90 350 C 90 260 140 240 200 240 C 260 240 310 260 310 350 Z" fill="url(#bodyGrad)" stroke="#22c55e" stroke-width="3" />
  
  <!-- Hoodie Zipper / Cyber Accent -->
  <line x1="200" y1="242" x2="200" y2="350" stroke="#4ade80" stroke-width="4" stroke-dasharray="8 4" />

  <!-- Head Base -->
  <ellipse cx="200" cy="180" rx="120" ry="90" fill="url(#skinGrad)" filter="url(#shadow)" stroke="#166534" stroke-width="4"/>

  <!-- Left Eye -->
  <ellipse cx="145" cy="130" rx="36" ry="32" fill="#f8fafc" stroke="#14532d" stroke-width="5"/>
  <ellipse cx="142" cy="132" rx="18" ry="18" fill="#0f172a"/>
  <circle cx="138" cy="126" r="6" fill="#4ade80"/>
  <circle cx="148" cy="136" r="3" fill="#ffffff"/>
  <path d="M 115 108 Q 145 92 175 112" stroke="#166534" stroke-width="6" fill="none" stroke-linecap="round"/>

  <!-- Right Eye -->
  <ellipse cx="255" cy="130" rx="36" ry="32" fill="#f8fafc" stroke="#14532d" stroke-width="5"/>
  <ellipse cx="258" cy="132" rx="18" ry="18" fill="#0f172a"/>
  <circle cx="254" cy="126" r="6" fill="#4ade80"/>
  <circle cx="264" cy="136" r="3" fill="#ffffff"/>
  <path d="M 225 112 Q 255 92 285 108" stroke="#166534" stroke-width="6" fill="none" stroke-linecap="round"/>

  <!-- Iconic Smirk / Big Lips -->
  <path d="M 115 185 Q 200 240 285 185" stroke="#991b1b" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M 120 185 Q 200 230 280 185" stroke="url(#lipGrad)" stroke-width="6" fill="none" stroke-linecap="round"/>
  
  <!-- Cool Hand Resting On Chin (Developer Thinking Pose) -->
  <g transform="translate(185, 215)">
    <path d="M 30 10 C 20 -10, -10 -5, -15 15 C -20 30, -5 45, 15 50 C 35 55, 50 35, 30 10 Z" fill="url(#skinGrad)" stroke="#166534" stroke-width="3"/>
    <circle cx="2" cy="18" r="4" fill="#15803d"/>
  </g>

  <!-- Cyber Neon Visor / Glasses Accent (Tilted) -->
  <path d="M 105 130 L 180 142 L 220 142 L 295 130" stroke="#22c55e" stroke-width="2" stroke-opacity="0.6" stroke-dasharray="4 2"/>
</svg>`;

// 2. Feature 1: Lightning Fast Speed
const fSpeedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="24" fill="#0b1710" />
  <circle cx="100" cy="100" r="70" fill="url(#speedGrad)" opacity="0.2"/>
  <path d="M 115 30 L 65 110 L 105 110 L 85 170 L 145 90 L 105 90 Z" fill="#4ade80" stroke="#f0fdf4" stroke-width="3" stroke-linejoin="round"/>
</svg>`;

// 3. Feature 2: High ROI & Cost Effective
const fRoiSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="50%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="24" fill="#0b1710" />
  <circle cx="100" cy="100" r="60" fill="url(#goldGrad)" opacity="0.25"/>
  <circle cx="100" cy="100" r="48" fill="#14532d" stroke="#4ade80" stroke-width="4"/>
  <text x="100" y="115" font-family="system-ui, sans-serif" font-weight="900" font-size="44" fill="#4ade80" text-anchor="middle">$</text>
  <path d="M 60 140 L 95 105 L 115 125 L 145 80" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <polygon points="145,80 135,82 143,92" fill="#38bdf8"/>
</svg>`;

// 4. Feature 3: Full Stack Auth & DB
const fStackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" rx="24" fill="#0b1710" />
  <g transform="translate(100, 100)">
    <!-- Layer 3 -->
    <ellipse cx="0" cy="35" rx="55" ry="18" fill="#052e16" stroke="#22c55e" stroke-width="3"/>
    <!-- Layer 2 -->
    <ellipse cx="0" cy="5" rx="55" ry="18" fill="#14532d" stroke="#4ade80" stroke-width="3"/>
    <!-- Layer 1 -->
    <ellipse cx="0" cy="-25" rx="55" ry="18" fill="#15803d" stroke="#86efac" stroke-width="3"/>
    <!-- Key icon -->
    <circle cx="0" cy="-25" r="8" fill="#f0fdf4"/>
  </g>
</svg>`;

// 5. Feature 4: High Converting Developer UX
const fUxSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" rx="24" fill="#0b1710" />
  <rect x="40" y="50" width="120" height="90" rx="10" fill="#061a10" stroke="#22c55e" stroke-width="3"/>
  <line x1="40" y1="75" x2="160" y2="75" stroke="#22c55e" stroke-width="2"/>
  <circle cx="55" cy="62" r="4" fill="#ef4444"/>
  <circle cx="68" cy="62" r="4" fill="#eab308"/>
  <circle cx="81" cy="62" r="4" fill="#22c55e"/>
  <rect x="52" y="90" width="40" height="8" rx="4" fill="#4ade80"/>
  <rect x="52" y="105" width="70" height="8" rx="4" fill="#15803d"/>
  <rect x="52" y="120" width="55" height="8" rx="4" fill="#15803d"/>
</svg>`;

// 6. About Banner 1
const aboutMascotSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220" width="300" height="220">
  <rect width="300" height="220" rx="18" fill="#0a1f13"/>
  <!-- Mini Pepe Developer Face -->
  <ellipse cx="150" cy="120" rx="85" ry="60" fill="#22c55e" stroke="#15803d" stroke-width="4"/>
  <ellipse cx="115" cy="85" rx="26" ry="24" fill="#fff" stroke="#14532d" stroke-width="4"/>
  <ellipse cx="185" cy="85" rx="26" ry="24" fill="#fff" stroke="#14532d" stroke-width="4"/>
  <circle cx="115" cy="85" r="10" fill="#000"/>
  <circle cx="185" cy="85" r="10" fill="#000"/>
  <circle cx="112" cy="81" r="3" fill="#4ade80"/>
  <circle cx="182" cy="81" r="3" fill="#4ade80"/>
  <path d="M 95 125 Q 150 160 205 125" stroke="#dc2626" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>`;

// Write all to public folder
fs.writeFileSync('public/mascot-hero.svg', mascotSvg);
fs.writeFileSync('public/feat-speed.svg', fSpeedSvg);
fs.writeFileSync('public/feat-roi.svg', fRoiSvg);
fs.writeFileSync('public/feat-stack.svg', fStackSvg);
fs.writeFileSync('public/feat-ux.svg', fUxSvg);
fs.writeFileSync('public/about-mascot.svg', aboutMascotSvg);
console.log('SVGs generated successfully in public/');
