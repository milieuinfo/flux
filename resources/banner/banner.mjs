// Maakt de banner van het portaal, src/assets/flux-banner.svg: het universum van Flux als een sterrenstelsel, in de
// stijl van de banner van Flux-MCP, op dezelfde nevel (nevel.webp, uit die banner).
//
//   pnpm run banner
//
// Deterministisch: de sterren komen uit een vaste reeks toevalsgetallen, zodat opnieuw maken hetzelfde bestand geeft.
// Wijzig je een getal hieronder, maak de banner dan opnieuw en bekijk ze in het portaal.
//
// Het stelsel draait traag rond zijn kern, de heldere sterren twinkelen en af en toe valt er een ster, tenzij de
// gebruiker minder beweging vraagt (prefers-reduced-motion). Het staat rechts van het midden: links staan de context en
// de titel van vl-content-header. De banner is breder dan hoog en wordt bijgesneden (slice): wat telt, staat tussen
// y = 250 en y = 750.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const target = join(here, '../../src/assets/flux-banner.svg');

const WIDTH = 2400;
const HEIGHT = 1000;

// Het stelsel: de kern, de kanteling en hoe plat het staat, en de spiraal r = START * e^(WIND * θ).
const CENTER = { x: 1540, y: 480 };
const TILT = -16;
const FLAT = 0.4;
const START = 26;
const WIND = 0.3;
const TURNS = 3.2 * Math.PI;

// Een vaste reeks toevalsgetallen (mulberry32).
let seed = 20261109;
function random() {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// Een getal rond 0, ongeveer normaal verdeeld.
function gauss() {
    return (random() + random() + random() + random() - 2) / 2;
}

const pick = (list) => list[Math.floor(random() * list.length)];
const n = (value) => (Math.round(value * 10) / 10).toString();

// Een punt op een arm: de hoek langs de spiraal, en hoe ver het ervan af ligt, loodrecht op de arm.
function armPoint(arm, theta, spread) {
    const r = START * Math.exp(WIND * theta);
    const angle = theta + arm;
    const offset = gauss() * spread * (10 + r * 0.22);
    return {
        x: (r + offset) * Math.cos(angle) + gauss() * 6,
        y: (r + offset) * Math.sin(angle) + gauss() * 6,
        r,
    };
}

// De kleur van een ster naar de afstand tot de kern: warm in het midden, roze in de armen, blauw aan de rand.
function starColor(r) {
    if (r < 120) return pick(['#ffffff', '#fff3c4', '#fff7c2', '#ffe9c7']);
    if (r < 360) return pick(['#ffffff', '#ffd6f4', '#ff8fe0', '#e9e2ff', '#fff3c4']);
    return pick(['#ffffff', '#bfe9ff', '#7fd8ff', '#c9b8ff', '#ffd6f4']);
}

const ARMS = [0, Math.PI];

// De gloed van de armen: zachte wolken langs de spiraal, roze en paars, zonder filter, zodat het draaien licht blijft.
function armGlow() {
    const puffs = [];
    for (const arm of ARMS) {
        for (let i = 0; i < 110; i++) {
            const theta = 0.6 + random() * (TURNS - 0.6);
            const { x, y, r } = armPoint(arm, theta, 0.4);
            const size = 30 + r * 0.14 + random() * 30;
            const gradient = r < 300 ? 'puffWarm' : pick(['puffPink', 'puffViolet', 'puffBlue']);
            puffs.push(`<circle cx="${n(x)}" cy="${n(y)}" r="${n(size)}" fill="url(#${gradient})"/>`);
        }
    }
    return puffs.join('');
}

// De sterren van de armen, en wat losse sterren in de schijf ertussen.
function armStars() {
    const stars = [];
    for (const arm of ARMS) {
        for (let i = 0; i < 900; i++) {
            const theta = Math.pow(random(), 0.8) * TURNS;
            const { x, y, r } = armPoint(arm, theta, 0.75);
            const size = Math.max(0.6, (2.6 - r / 360) * (0.5 + random() * 0.7));
            const opacity = 0.35 + random() * 0.6;
            stars.push(
                `<circle cx="${n(x)}" cy="${n(y)}" r="${n(size)}" fill="${starColor(r)}" opacity="${n(opacity)}"/>`,
            );
        }
    }
    // De bult rond de kern.
    for (let i = 0; i < 320; i++) {
        const x = gauss() * 90;
        const y = gauss() * 90;
        const r = Math.hypot(x, y);
        stars.push(
            `<circle cx="${n(x)}" cy="${n(y)}" r="${n(0.6 + random() * 1.2)}" fill="${starColor(r)}" ` +
                `opacity="${n(0.4 + random() * 0.5)}"/>`,
        );
    }
    for (let i = 0; i < 600; i++) {
        const angle = random() * 2 * Math.PI;
        const r = Math.pow(random(), 0.8) * 700;
        const size = 0.5 + random() * 1.1;
        stars.push(
            `<circle cx="${n(r * Math.cos(angle))}" cy="${n(r * Math.sin(angle))}" r="${n(size)}" ` +
                `fill="${starColor(r)}" opacity="${n(0.25 + random() * 0.5)}"/>`,
        );
    }
    return stars.join('');
}

// Stervormingsgebieden: kleine roze knopen in de armen.
function knots() {
    const result = [];
    for (const arm of ARMS) {
        for (let i = 0; i < 9; i++) {
            const theta = 1.6 + random() * (TURNS - 2.2);
            const { x, y } = armPoint(arm, theta, 0.2);
            const size = 10 + random() * 16;
            result.push(`<circle cx="${n(x)}" cy="${n(y)}" r="${n(size)}" fill="url(#knot)"/>`);
        }
    }
    return result.join('');
}

// Het sterrenveld over de hele banner, zoals in de banner van Flux-MCP.
function starfield() {
    const stars = [];
    for (let i = 0; i < 520; i++) {
        const x = random() * WIDTH;
        const y = random() * HEIGHT;
        const size = 0.5 + Math.pow(random(), 3) * 1.1;
        const color = pick(['#ffffff', '#ffffff', '#ffe9c7', '#cfe3ff']);
        stars.push(
            `<circle cx="${n(x)}" cy="${n(y)}" r="${n(size)}" fill="${color}" opacity="${n(0.3 + random() * 0.6)}"/>`,
        );
    }
    return stars.join('');
}

// De heldere sterren met een kruis, die twinkelen. Niet in het stelsel, en niet op de titel links onderaan.
function brightStars() {
    const places = [
        [140, 330],
        [395, 610],
        [610, 210],
        [820, 760],
        [980, 330],
        [1120, 860],
        [2290, 230],
        [2210, 790],
        [1980, 160],
        [470, 860],
        [1820, 900],
        [760, 450],
    ];
    return places
        .map(([x, y]) => {
            const size = 8 + random() * 6;
            const color = pick(['#d9f7ff', '#fff3c4', '#ffd6f4']);
            const duration = n(3.5 + random() * 3);
            const delay = n(-random() * 5);
            const arm = size * 1.1;
            return (
                `<g class="tw" style="animation-duration:${duration}s;animation-delay:${delay}s">` +
                `<circle cx="${x}" cy="${y}" r="${n(size)}" fill="url(#starGlow)"/>` +
                `<path d="M${n(x - arm)} ${y}H${n(x + arm)}M${x} ${n(y - arm)}V${n(y + arm)}" stroke="${color}" ` +
                `stroke-width="1" stroke-linecap="round" opacity="0.75"/>` +
                `<circle cx="${x}" cy="${y}" r="1.6" fill="${color}"/></g>`
            );
        })
        .join('');
}

const nebula = readFileSync(join(here, 'nevel.webp')).toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" preserveAspectRatio="xMidYMid slice">
<title>Het universum van Flux: een sterrenstelsel in de nevel</title>
<!-- Gemaakt door resources/banner/banner.mjs; wijzig het script, niet dit bestand. -->
<style>
  .tw { animation: twinkle 5s ease-in-out infinite; }
  @keyframes twinkle { 0%,100% { opacity: 1 } 50% { opacity: .25 } }
  .spin { transform-origin: 0 0; animation: spin 420s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg) } }
  .core { animation: glow 4.2s ease-in-out infinite; }
  @keyframes glow { 0%,100% { opacity: 1 } 50% { opacity: .78 } }
  .comet { animation: comet 13s ease-in infinite; opacity: 0; }
  .comet.c2 { animation-duration: 19s; animation-delay: -7s; }
  @keyframes comet {
    0% { transform: translate(0,0); opacity: 0 }
    2% { opacity: 1 }
    9% { transform: translate(-520px, 150px); opacity: 0 }
    100% { transform: translate(-520px, 150px); opacity: 0 }
  }
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
    .comet { opacity: 0 !important; }
  }
</style>
<defs>
  <radialGradient id="starGlow"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".25" stop-color="#bfe9ff" stop-opacity=".35"/><stop offset="1" stop-color="#7fb4ff" stop-opacity="0"/></radialGradient>
  <radialGradient id="disk"><stop offset="0" stop-color="#ffd6f4" stop-opacity=".35"/><stop offset=".2" stop-color="#c06bff" stop-opacity=".16"/><stop offset=".55" stop-color="#6a3dff" stop-opacity=".07"/><stop offset="1" stop-color="#3a16b0" stop-opacity="0"/></radialGradient>
  <radialGradient id="halo"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset=".12" stop-color="#fff7c2" stop-opacity=".95"/><stop offset=".35" stop-color="#ffc2ef" stop-opacity=".45"/><stop offset="1" stop-color="#ff6fd8" stop-opacity="0"/></radialGradient>
  <radialGradient id="puffWarm"><stop offset="0" stop-color="#ffd6f4" stop-opacity=".14"/><stop offset="1" stop-color="#ffd6f4" stop-opacity="0"/></radialGradient>
  <radialGradient id="puffPink"><stop offset="0" stop-color="#ff6fd8" stop-opacity=".22"/><stop offset="1" stop-color="#ff6fd8" stop-opacity="0"/></radialGradient>
  <radialGradient id="puffViolet"><stop offset="0" stop-color="#9a6bff" stop-opacity=".22"/><stop offset="1" stop-color="#9a6bff" stop-opacity="0"/></radialGradient>
  <radialGradient id="puffBlue"><stop offset="0" stop-color="#5ff2ff" stop-opacity=".14"/><stop offset="1" stop-color="#5ff2ff" stop-opacity="0"/></radialGradient>
  <radialGradient id="knot"><stop offset="0" stop-color="#ffffff" stop-opacity=".9"/><stop offset=".3" stop-color="#ff8fe0" stop-opacity=".5"/><stop offset="1" stop-color="#ff6fd8" stop-opacity="0"/></radialGradient>
  <linearGradient id="cometGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".15" stop-color="#bff6ff" stop-opacity=".7"/><stop offset="1" stop-color="#7fb4ff" stop-opacity="0"/></linearGradient>
</defs>

<image width="${WIDTH}" height="${HEIGHT}" preserveAspectRatio="none" xlink:href="data:image/webp;base64,${nebula}"/>

<!-- sterrenveld -->
<g>${starfield()}</g>

<!-- het sterrenstelsel: gekanteld en plat, en draaiend rond zijn kern -->
<g transform="translate(${CENTER.x} ${CENTER.y}) rotate(${TILT}) scale(1 ${FLAT})">
  <circle r="760" fill="url(#disk)"/>
  <g class="spin">
    <g>${armGlow()}</g>
    <g>${knots()}</g>
    <g>${armStars()}</g>
  </g>
  <circle class="core" r="170" fill="url(#halo)"/>
  <circle r="20" fill="#ffffff"/>
</g>

<!-- heldere sterren -->
<g>${brightStars()}</g>

<!-- vallende sterren -->
<g class="comet"><line x1="900" y1="290" x2="1110" y2="230" stroke="url(#cometGrad)" stroke-width="2.4" stroke-linecap="round"/></g>
<g class="comet c2"><line x1="2160" y1="360" x2="2320" y2="315" stroke="url(#cometGrad)" stroke-width="1.8" stroke-linecap="round"/></g>
</svg>
`;

writeFileSync(target, svg);
console.log(`De banner staat in ${target} (${Math.round(svg.length / 1024)} kB).`);
