const fs = require('fs');

// Card 1: Woman with glasses, wavy hair, and long coat arriving at a craft shop buying a solid wooden/paper template box
const svgCard1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 450" width="100%" height="100%">
  <defs>
    <!-- Halftone dots / Stipple texture pattern matching reference -->
    <pattern id="stipple" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="#26221f" />
    </pattern>

    <!-- Cut-piece paper drop shadow filter -->
    <filter id="paperCutShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="4" stdDeviation="2.5" flood-color="#1f1b18" flood-opacity="0.32" />
    </filter>
  </defs>

  <!-- Ground sketch line -->
  <path d="M 40 400 Q 250 395 460 400" stroke="#26221f" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <path d="M 60 410 Q 180 408 240 410" stroke="#26221f" stroke-width="1.8" stroke-linecap="round" opacity="0.6" fill="none" />

  <!-- Shop Window / Counter Shelf in Background (cut paper layer) -->
  <g filter="url(#paperCutShadow)">
    <path d="M 280 210 L 440 210 L 440 395 L 280 395 Z" fill="#eee5d3" stroke="#26221f" stroke-width="3" stroke-linejoin="round" />
    <!-- Shop counter front stipple fill -->
    <path d="M 280 300 L 440 300 L 440 395 L 280 395 Z" fill="url(#stipple)" stroke="#26221f" stroke-width="3" />
    <!-- Shop counter top plank -->
    <path d="M 265 295 L 455 295 L 450 310 L 260 310 Z" fill="#e4dac4" stroke="#26221f" stroke-width="3" stroke-linejoin="round" />
    <!-- Shop Awning banner -->
    <path d="M 270 195 Q 360 185 450 195 L 450 215 Q 360 205 270 215 Z" fill="#26221f" stroke="#26221f" stroke-width="2" />
  </g>

  <!-- Shopkeeper hand offering the Box -->
  <g filter="url(#paperCutShadow)">
    <path d="M 440 270 Q 380 275 350 280" stroke="#26221f" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  </g>

  <!-- The Template Box on the counter (Hero Object) -->
  <g filter="url(#paperCutShadow)">
    <!-- Isometric Box -->
    <!-- Top Face -->
    <polygon points="310,250 360,230 400,250 350,270" fill="#f8f4ea" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>
    <!-- Left Face (Stippled) -->
    <polygon points="310,250 350,270 350,310 310,290" fill="url(#stipple)" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>
    <!-- Right Face -->
    <polygon points="350,270 400,250 400,290 350,310" fill="#ded4be" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>
    <!-- Box Ribbon / Stamp "CODE" -->
    <path d="M 328,260 L 378,240" stroke="#26221f" stroke-width="3"/>
    <path d="M 330,280 L 330,300" stroke="#26221f" stroke-width="2.5"/>
  </g>

  <!-- Main Character: Woman Customer (Walking in from left, excited posture) -->
  <g filter="url(#paperCutShadow)">
    <!-- Back Leg with Stipple Pants -->
    <path d="M 175 305 L 150 385 L 125 390 L 140 375 L 160 300 Z" fill="url(#stipple)" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>
    <!-- Back Shoe -->
    <path d="M 125 390 C 120 395 105 398 95 396 C 90 390 100 380 120 380 Z" fill="#26221f" stroke="#26221f" stroke-width="2"/>

    <!-- Front Leg with Stipple Pants -->
    <path d="M 205 300 L 235 375 L 255 385 L 265 375 L 225 295 Z" fill="url(#stipple)" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>
    <!-- Front Shoe -->
    <path d="M 255 385 C 265 392 285 394 290 388 C 290 382 275 375 260 375 Z" fill="#26221f" stroke="#26221f" stroke-width="2"/>

    <!-- Coat / Torso (Cream paper cut-out) -->
    <path d="M 155 170 C 135 220 145 285 160 310 C 195 315 235 310 240 295 C 240 240 225 185 200 170 Z" fill="#f8f4ea" stroke="#26221f" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 195 175 L 180 305" stroke="#26221f" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Crossbody Shoulder Bag (Solid Black cut-out like reference dog walker) -->
    <path d="M 160 175 Q 195 220 220 260" stroke="#26221f" stroke-width="3" fill="none"/>
    <path d="M 210 250 C 205 270 215 290 235 290 C 250 288 255 265 245 250 Z" fill="#26221f" stroke="#26221f" stroke-width="3"/>

    <!-- Reaching Out Arms / Hands towards the Box -->
    <path d="M 195 185 Q 240 195 285 220 C 295 225 305 220 300 212 C 285 200 245 180 205 175 Z" fill="#f8f4ea" stroke="#26221f" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- Left Hand Palm -->
    <path d="M 285 220 C 295 230 310 230 315 220 C 310 215 300 210 290 215" fill="#f8f4ea" stroke="#26221f" stroke-width="2.5"/>

    <!-- Head & Neck -->
    <path d="M 175 165 L 175 145 L 195 145 L 195 165 Z" fill="#f8f4ea" stroke="#26221f" stroke-width="3"/>
    <path d="M 170 140 C 165 110 190 95 210 100 C 225 105 230 125 225 140 C 215 155 180 155 170 140 Z" fill="#f8f4ea" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>
    
    <!-- Profile Face Details (Big round glasses + smile) -->
    <circle cx="205" cy="120" r="10" stroke="#26221f" stroke-width="2.5" fill="none"/>
    <path d="M 215 120 L 222 120" stroke="#26221f" stroke-width="2"/>
    <path d="M 210 133 Q 218 138 222 131" stroke="#26221f" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Voluminous Flowing Hair (Solid Black cut-out with loose curls like reference) -->
    <path d="M 172 135 C 150 130 145 95 170 85 C 195 75 220 80 235 95 C 240 110 220 120 220 120 C 225 140 210 155 195 160 C 175 165 165 150 172 135 Z" fill="#26221f" stroke="#26221f" stroke-width="2"/>
    <!-- Cute Beanie on top -->
    <path d="M 185 85 C 190 70 215 70 225 82 Z" fill="#f8f4ea" stroke="#26221f" stroke-width="2.5"/>
  </g>

  <!-- Sparkles / Excitement marks around the Box -->
  <path d="M 295 230 L 285 225" stroke="#26221f" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 350 205 L 350 195" stroke="#26221f" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 410 230 L 420 225" stroke="#26221f" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

// Card 2: Character happily wrapping and decorating the template box with craft tools, custom wrapper & tape
const svgCard2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 450" width="100%" height="100%">
  <defs>
    <pattern id="stipple2" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="#26221f" />
    </pattern>
    <pattern id="diagonalStripe" width="10" height="10" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="10" y2="10" stroke="#26221f" stroke-width="2"/>
    </pattern>
    <filter id="paperCutShadow2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="4" stdDeviation="2.5" flood-color="#1f1b18" flood-opacity="0.32" />
    </filter>
  </defs>

  <!-- Worktable / Desk (Paper Cut Piece) -->
  <g filter="url(#paperCutShadow2)">
    <path d="M 50 310 L 450 310 L 460 330 L 40 330 Z" fill="#e8dfcb" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 70 330 L 70 410" stroke="#26221f" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 430 330 L 430 410" stroke="#26221f" stroke-width="3.5" stroke-linecap="round"/>
  </g>

  <!-- Wrapping Paper Roll Unfurled on Table -->
  <g filter="url(#paperCutShadow2)">
    <path d="M 100 295 Q 180 305 280 290 Q 380 300 420 290 L 415 310 L 95 310 Z" fill="url(#stipple2)" stroke="#26221f" stroke-width="2.5"/>
    <!-- Rolled end -->
    <ellipse cx="95" cy="300" rx="8" ry="12" fill="#ded4be" stroke="#26221f" stroke-width="2.5"/>
  </g>

  <!-- The Template Box in center being decorated with ribbon -->
  <g filter="url(#paperCutShadow2)">
    <!-- Base Box -->
    <rect x="200" y="210" width="120" height="95" rx="6" fill="#f8f4ea" stroke="#26221f" stroke-width="3.5"/>
    
    <!-- Decorative Wrapper Band (Striped) -->
    <rect x="235" y="210" width="45" height="95" fill="url(#diagonalStripe)" stroke="#26221f" stroke-width="2.5"/>
    
    <!-- Big Bow on top of the Box -->
    <!-- Left Loop -->
    <path d="M 255 210 C 230 190 220 165 245 175 C 255 180 258 200 258 210 Z" fill="url(#stipple2)" stroke="#26221f" stroke-width="3"/>
    <!-- Right Loop -->
    <path d="M 260 210 C 285 190 295 165 270 175 C 260 180 258 200 258 210 Z" fill="url(#stipple2)" stroke="#26221f" stroke-width="3"/>
    <!-- Knot Center -->
    <circle cx="258" cy="208" r="7" fill="#26221f"/>
    <!-- Ribbon tails -->
    <path d="M 255 212 Q 240 235 230 245" stroke="#26221f" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 262 212 Q 275 235 285 245" stroke="#26221f" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Craft Tools on Table (Scissors, Tape Dispenser) -->
  <g filter="url(#paperCutShadow2)">
    <!-- Scissors -->
    <circle cx="370" cy="285" r="7" stroke="#26221f" stroke-width="2.5" fill="none"/>
    <circle cx="370" cy="300" r="7" stroke="#26221f" stroke-width="2.5" fill="none"/>
    <path d="M 376 288 L 400 295" stroke="#26221f" stroke-width="2.5"/>
    <path d="M 376 297 L 400 290" stroke="#26221f" stroke-width="2.5"/>
  </g>

  <!-- Character: The Maker leaning over table, carefully applying decor (inspired by the artisan poses) -->
  <g filter="url(#paperCutShadow2)">
    <!-- Stippled Pants & Seated/Leaning Body -->
    <path d="M 120 280 C 110 330 120 370 135 400 C 150 405 170 395 165 370 C 160 340 160 300 160 280 Z" fill="url(#stipple2)" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 125 400 L 95 405" stroke="#26221f" stroke-width="3" stroke-linecap="round"/>

    <!-- Torso Leaning Forward -->
    <path d="M 130 210 C 120 240 135 275 165 285 C 195 280 200 240 190 205 C 175 190 145 190 130 210 Z" fill="#f8f4ea" stroke="#26221f" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- Both Arms Outstretched Decorating the Box -->
    <!-- Left Arm -->
    <path d="M 160 210 Q 190 205 235 210" stroke="#26221f" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <!-- Left Hand placing sticker/tape -->
    <path d="M 235 208 C 242 205 250 208 245 216 C 240 220 232 215 235 208" fill="#f8f4ea" stroke="#26221f" stroke-width="2.5"/>

    <!-- Right Arm -->
    <path d="M 175 220 Q 210 225 240 240" stroke="#26221f" stroke-width="3.5" fill="none" stroke-linecap="round"/>

    <!-- Head in Profile, smiling down at creation -->
    <path d="M 145 165 C 140 140 160 120 180 125 C 195 130 200 150 195 165 C 185 180 155 180 145 165 Z" fill="#f8f4ea" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>
    <!-- Face details -->
    <circle cx="180" cy="145" r="9" stroke="#26221f" stroke-width="2.5" fill="none"/>
    <path d="M 183 158 Q 190 162 193 155" stroke="#26221f" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Hair & Cap -->
    <path d="M 145 155 C 130 150 130 115 155 105 C 175 95 200 105 205 125 Z" fill="#26221f" stroke="#26221f" stroke-width="2"/>
    <path d="M 160 108 C 175 95 205 100 215 118" stroke="#26221f" stroke-width="3" fill="none"/>
  </g>

  <!-- Floating Cut-Piece Confetti / Stars indicating craft creativity -->
  <path d="M 285 140 L 290 150 L 300 150 L 292 156 L 295 166 L 285 160 L 275 166 L 278 156 L 270 150 L 280 150 Z" fill="#26221f"/>
  <path d="M 335 175 L 340 185 L 350 185 L 342 191 L 345 201 L 335 195 L 325 201 L 328 191 L 320 185 L 330 185 Z" fill="none" stroke="#26221f" stroke-width="2"/>
  <circle cx="215" cy="170" r="3" fill="#26221f"/>
</svg>`;

// Card 3: The template box is loaded into the rocket ship cockpit, blasting off into space to celebrate launch!
const svgCard3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 450" width="100%" height="100%">
  <defs>
    <pattern id="stipple3" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="#26221f" />
    </pattern>
    <filter id="paperCutShadow3" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="4" stdDeviation="2.5" flood-color="#1f1b18" flood-opacity="0.32" />
    </filter>
  </defs>

  <!-- Puffy Paper Clouds at the base of launch pad -->
  <g filter="url(#paperCutShadow3)">
    <path d="M 60 380 Q 90 320 140 340 Q 190 300 240 330 Q 300 290 360 320 Q 420 300 450 360 L 450 410 L 60 410 Z" fill="#eee5d3" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 120 360 Q 160 330 200 350" stroke="#26221f" stroke-width="2" fill="none"/>
    <path d="M 280 340 Q 320 310 360 340" stroke="#26221f" stroke-width="2" fill="none"/>
  </g>

  <!-- Rocket Blast Flames (Cut piece paper with stipple accents) -->
  <g filter="url(#paperCutShadow3)">
    <!-- Outer Flame -->
    <path d="M 220 280 Q 180 340 210 380 Q 250 330 260 385 Q 280 330 305 380 Q 320 330 290 280 Z" fill="url(#stipple3)" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>
    <!-- Core Flame -->
    <path d="M 235 285 Q 220 325 240 350 Q 260 325 255 355 Q 275 320 270 285 Z" fill="#f8f4ea" stroke="#26221f" stroke-width="2.5"/>
  </g>

  <!-- The Rocket Ship (Ascending at high speed) -->
  <g filter="url(#paperCutShadow3)">
    <!-- Rocket Left Fin -->
    <path d="M 205 240 L 160 270 L 175 220 Z" fill="url(#stipple3)" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>
    <!-- Rocket Right Fin -->
    <path d="M 305 240 L 350 270 L 335 220 Z" fill="url(#stipple3)" stroke="#26221f" stroke-width="3" stroke-linejoin="round"/>

    <!-- Main Rocket Fuselage -->
    <path d="M 210 270 Q 200 180 255 80 Q 310 180 300 270 Z" fill="#f8f4ea" stroke="#26221f" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- Nose Cone Tip (Solid Black Cut-Out) -->
    <path d="M 240 110 Q 255 80 270 110 Z" fill="#26221f" stroke="#26221f" stroke-width="2"/>

    <!-- Rocket Window / Cockpit showing the Decorated Box safely placed inside! -->
    <circle cx="255" cy="175" r="32" fill="#ded4be" stroke="#26221f" stroke-width="3.5"/>
    <!-- Inner glass shine -->
    <path d="M 235 160 A 26 26 0 0 1 270 155" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- The Box inside the rocket! -->
    <rect x="238" y="165" width="34" height="26" rx="2" fill="#f8f4ea" stroke="#26221f" stroke-width="2.5"/>
    <line x1="255" y1="165" x2="255" y2="191" stroke="#26221f" stroke-width="2"/>
    <line x1="238" y1="178" x2="272" y2="178" stroke="#26221f" stroke-width="2"/>
  </g>

  <!-- Speed Thruster Trails & Motion Lines -->
  <path d="M 140 210 L 115 245" stroke="#26221f" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 125 180 L 105 205" stroke="#26221f" stroke-width="2" stroke-linecap="round"/>
  <path d="M 370 210 L 395 245" stroke="#26221f" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 385 180 L 405 205" stroke="#26221f" stroke-width="2" stroke-linecap="round"/>

  <!-- Character Standing by Launch celebrating with flag / Megaphone (like the mountain & boat figures) -->
  <g filter="url(#paperCutShadow3)">
    <!-- Cheering Figure on Left Ridge -->
    <path d="M 90 350 L 115 315 L 125 350 Z" fill="url(#stipple3)" stroke="#26221f" stroke-width="2.5"/>
    <!-- Body -->
    <path d="M 100 315 C 95 285 110 270 125 275 C 135 285 130 315 120 320 Z" fill="#f8f4ea" stroke="#26221f" stroke-width="2.5"/>
    <!-- Waving Arms Up in Triumph -->
    <path d="M 115 280 L 95 250" stroke="#26221f" stroke-width="3" stroke-linecap="round"/>
    <path d="M 125 280 L 145 250" stroke="#26221f" stroke-width="3" stroke-linecap="round"/>
    <!-- Head & Cap -->
    <circle cx="120" cy="265" r="10" fill="#f8f4ea" stroke="#26221f" stroke-width="2.5"/>
    <!-- Flag in Hand -->
    <path d="M 145 250 L 145 220" stroke="#26221f" stroke-width="2.5"/>
    <path d="M 145 220 L 170 228 L 145 236 Z" fill="#26221f"/>
  </g>

  <!-- Stars & Moon in Sky -->
  <path d="M 380 90 L 385 102 L 398 102 L 388 109 L 392 121 L 380 114 L 368 121 L 372 109 L 362 102 L 375 102 Z" fill="#26221f"/>
  <circle cx="120" cy="110" r="16" fill="none" stroke="#26221f" stroke-width="3"/>
  <circle cx="126" cy="106" r="14" fill="#f5eedc"/>
</svg>`;

// Write all three SVGs to public folder
fs.writeFileSync('public/story-step1-shop.svg', svgCard1);
fs.writeFileSync('public/story-step2-wrap.svg', svgCard2);
fs.writeFileSync('public/story-step3-launch.svg', svgCard3);

console.log('All 3 paper cut-piece story SVGs generated successfully in public/');
