# Het portaal

Het portaal van Team Flux is één app in de browser, gebouwd met Flux zelf, en gepubliceerd op GitHub Pages:
<https://milieuinfo.github.io/flux/>. Het volgt de opzet van de app van de gateway van
[flux-mcp](https://github.com/milieuinfo/flux-mcp) (`gateway/frontend/`, en `docs/technisch/gateway.md` daar): dezelfde
layout, dezelfde startpagina en dezelfde stijl van de pagina's, zodat beide als één geheel ogen.

## De app

Web components met Lit en TypeScript, gebundeld met Webpack en SWC, met de componenten van Flux 2.22.0, zoals de
flux-starter-app.

- **De layout** is die van een dashboard uit de starter (`src/layout/`: `vl-dashboard`, `vl-nav-link`, `vl-nav-sub`),
  overgenomen van de gateway, met zijn aanpassingen: `vl-nav-link` navigeert via de router van de app, `vl-dashboard`
  volgt `content-padding` en `content-max-width` ook na de eerste render, de inhoud staat in het midden, `scrollToTop`
  zet de inhoud bovenaan, en afgedrukt staat enkel de inhoud. Bovenaan de navigatie staat Team Flux met de φ van Flux,
  op de plaats waar een toepassing de gebruiker toont: het portaal kent geen aanmelden. Header en footer van Vlaanderen
  ontbreken, zoals in de gateway: die vragen een id van ACM/IDM.
- **De routes** (`src/router.ts`) zijn paden binnen het portaal, zoals `/`. Het portaal staat op GitHub Pages onder
  `/flux/`, en lokaal onder `/`: de build zet die basis in `<base href>` van elke pagina, en `href()` maakt van een pad
  een url onder de basis. Een interne link wisselt de pagina zonder herladen. Een pad dat het portaal niet kent, toont
  "Deze pagina bestaat niet" (`src/pages/not-found-page.ts`), met een link naar de start.
- **De startpagina** (`src/pages/home-page.ts`) volgt die van de gateway: de banner in `vl-content-header`, de
  inleiding met Flux als initiaal, uitgevuld tot twee derde van de middelste tegel, en drie tegels op een rij
  (`vl-info-tile-next`, met een icoon), met hun links onderaan op dezelfde hoogte. Een link buiten het portaal opent in
  een nieuw tabblad, met het icoon van `vl-link`. Tegen de onderkant staan klein en grijs de logo's naar
  flux-web-components op GitHub, Storybook van de nieuwste release en de componenten in Figma, en de versie van Flux
  waarmee het portaal gebouwd is. De pagina past zonder scrollen op het scherm van een laptop; op een gsm staan de
  tegels onder elkaar. De tegels staan in een eigen grid van drie kolommen, niet in die van Flux: die heeft er twaalf,
  en met de ruimere tussenruimte werd ze op een smal scherm breder dan het scherm. De inleiding leidt naar de
  wegwijzer.
- **De nieuwste release** van Flux staat prominent op de startpagina, rechts van de inleiding, boven de derde tegel
  (`src/pages/latest-release.ts`): de versie groot, met haar datum en de links naar de release notes en alle releases.
  Het is de hoogste versie onder de releases van flux-web-components op GitHub (`src/release.ts`), niet de laatst
  gepubliceerde: een release van v1 verschijnt soms na een van v2. Een concept of een pre-release telt niet. De
  browser vraagt de releases aan de API van GitHub, zonder aanmelden; die laat 60 vragen per uur per IP-adres toe.
  Daarom onthoudt de browser het antwoord een uur in `localStorage`, en valt hij terug op wat hij nog weet als GitHub
  niet antwoordt. Weet hij niets, dan zegt het blok dat, met de link naar alle releases. De versie onderaan de
  startpagina is een andere: die waarmee het portaal gebouwd is.
- **De wegwijzer** (`src/pages/wegwijzer-page.ts`, `/wegwijzer`) zet alles van Team Flux op een rij, met bij elke link
  een korte uitleg: de documentatie en de toepassingen (Storybook, Flux-MCP, het prototype), de code op GitHub (actief
  en prototypes) en op GitLab, waar het team werkt (Jira, Confluence), en Digitaal Vlaanderen. De punten hebben de
  opmaak van de documentatie van de gateway: een icoon in een badge, de naam als link en de uitleg, drie naast elkaar.
  Vraagt een link een account, of is een repo op GitHub privé, dan staat dat naast de naam. Een nieuwe link komt in
  `PARTS`, met zijn url in `src/links.ts`.
- **De links** naar wat Team Flux maakt, en de logo's (uit simple-icons), staan één keer, in `src/links.ts`, met
  `githubRepo()` en `gitlabRepo()` voor een repo op GitHub of op de GitLab van het departement.
- **De andere pagina's** krijgen de kop van de documentatie van de gateway: het icoon uit het menu in een blauwe
  badge, en de titel (`pageHeader` in `src/pages/page.ts`), met de stijlen voor tekst op leesbreedte
  (`readingStyles`).

## Een pagina toevoegen

1. Een element in `src/pages/`, met `pageStyles`, `readingStyles` en `pageHeader` uit `src/pages/page.ts`, en een
   componenttest ernaast (`*.cy.ts`).
2. In `src/router.ts`: een `Page`, de route in `ROUTES`, en het pad met zijn titel en icoon in `NAVIGATION`, voor het
   menu. Het type `VlIcon` laat TypeScript nakijken dat het icoon in Flux bestaat.
3. In `src/app.ts`: het element bij zijn `Page`.
4. Het pad in `src/pages.json`. GitHub Pages kent geen routes: zonder eigen `index.html` geeft een diepe link of een
   herlaadbeurt de pagina 404. De build maakt er een per pad, en `router.spec.ts` kijkt na dat `src/pages.json` en de
   routes dezelfde pagina's noemen.

## De banner

De banner (`src/assets/flux-banner.svg`) toont het universum van Flux als een sterrenstelsel, in de stijl van de
banner van Flux-MCP, op dezelfde nevel (`resources/banner/nevel.webp`, uit die banner). Ze is versiering: een lege
alt. Het stelsel staat rechts van het midden, want links staan de context en de titel van `vl-content-header`. Het
draait traag rond zijn kern, de heldere sterren twinkelen en af en toe valt er een ster, tenzij de gebruiker minder
beweging vraagt (`prefers-reduced-motion`).

Een script maakt ze, deterministisch, met een vaste reeks toevalsgetallen: `pnpm run banner`
(`resources/banner/banner.mjs`). Wijzig het script, niet de SVG, en bekijk de banner daarna in het portaal: ze wordt
bijgesneden (`slice`), en wat telt, staat tussen y = 250 en y = 750.

Het icoon in de tab (`src/assets/favicon.svg`) is de φ van Flux op de diepe ruimte van de banner, zoals het icoon van
Flux-MCP de gele ster is.

## Bouwen, testen en publiceren

```bash
pnpm start                          # http://localhost:8080, en opnieuw bij elke wijziging
pnpm run lint                       # ESLint
pnpm run typecheck                  # TypeScript, ook voor de tests
pnpm test                           # Jest: de unit tests (*.spec.ts)
pnpm run ct-ci                      # Cypress: de componenttests (*.cy.ts), met axe voor de toegankelijkheid
pnpm run build                      # in dist/, voor de root van een site
pnpm run build --env base=/flux/    # zoals op GitHub Pages
pnpm run publish:pages              # netwerk: testen, bouwen en publiceren op GitHub Pages
```

De packages van Flux (`@domg-wc`) en de huisstijl (`@domg`) komen van de registry van het departement; `.npmrc` zegt
waar. Lezen kan zonder aanmelden. Cypress installeer je één keer met `pnpm exec cypress install`; pnpm voert zijn
install-script niet uit (`pnpm-workspace.yaml`).

Geen componenttest vraagt de releases aan GitHub: `cypress/support/component.ts` geeft elke test dezelfde releases
(`RELEASES`, met 2.22.0 als nieuwste), zonder wat de browser van een vorige test onthield. Een test die iets anders
wil, zoals een fout van GitHub, zet zijn eigen `cy.intercept`.

### Publiceren

GitHub Actions staat uit in de organisatie milieuinfo, zoals bij flux-web-components, flux-mcp en flux-prototypes:
het departement bouwt met Jenkins. Het portaal staat daarom, zoals flux-prototypes, als gebouwde site op een branch:
GitHub Pages publiceert de branch `gh-pages` (in de instellingen van de repo: Pages, "Deploy from a branch",
`gh-pages`, `/`).

`pnpm run publish:pages` (`resources/publish.mjs`) zet de site daar:

1. Het weigert met wijzigingen die niet gecommit zijn, buiten `main`, of als `main` niet gelijk is met `origin/main`:
   de site hoort bij een commit die op GitHub staat.
2. Het draait lint, typecheck, de unit tests en de componenttests, en bouwt met de basis `/flux/`.
3. Het zet de build als een nieuwe commit op `gh-pages`, met `.nojekyll`, zodat GitHub Pages de bestanden toont zoals
   ze zijn, en met de commit van `main` in de boodschap. De geschiedenis van `gh-pages` blijft. Het werk gebeurt in een
   tijdelijke worktree, buiten de repo.

GitHub Pages zet de site daarna binnen een minuut of twee online. Gaat Actions ooit aan, of draait Jenkins het script,
dan blijft het script hetzelfde.
