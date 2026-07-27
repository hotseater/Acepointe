// Generates public/og-default.png (1200x630) from a branded SVG.
// Run once: `node scripts/make-og.mjs`. Uses sharp (bundled with Astro).
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public', 'og-default.png');

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#2a171d"/>
      <stop offset="1" stop-color="#1a0f12"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.32" r="0.5">
      <stop offset="0" stop-color="#c8102e" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#c8102e" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <!-- logo mark -->
  <g transform="translate(90 84)">
    <path d="M26 0 L52 44 H0 Z" fill="#c8102e"/>
    <path d="M26 15 L40 39 H32 L26 28 L20 39 H12 Z" fill="#fff"/>
    <text x="70" y="34" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="34" fill="#ffffff">AcePointe</text>
  </g>
  <text x="88" y="300" font-family="Segoe UI, Arial, sans-serif" font-weight="800" font-size="112" letter-spacing="-3" fill="#ffffff">Embed. Build. <tspan fill="#f0475f">Ship.</tspan></text>
  <text x="90" y="372" font-family="Segoe UI, Arial, sans-serif" font-weight="400" font-size="30" fill="rgba(255,255,255,0.74)">Forward-deployed data &amp; AI engineering for the mid-market.</text>
  <text x="90" y="560" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="22" letter-spacing="3" fill="#f0475f">SENIOR ENGINEERS · WEEKS TO PRODUCTION · YOU OWN IT AFTER</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('Wrote', out);
