# CLAUDE.md

Richtlijnen voor AI-clients die in deze repo werken. De details staan in de technische documentatie onder
`docs/technisch/`; lees die eerst wanneer je aan een onderdeel begint.

## Taal

Alle communicatie is in het Nederlands. Dat geldt voor:

- je antwoorden en vragen aan de gebruiker;
- commit messages en PR-beschrijvingen;
- documentatie: de README en de technische documentatie;
- commentaar in de code, en foutmeldingen en uitvoer van scripts;
- de teksten in het portaal.

Namen in de code (functies, variabelen, JSON-sleutels) blijven Engels.

## Wat deze repo is

`flux` is het portaal van Team Flux (Frontend Library en User eXperience) van het Departement Omgeving, op GitHub
Pages: <https://milieuinfo.github.io/flux/>. Van hieruit vind je alles wat het team maakt, zoals de web componenten
(`https://github.com/milieuinfo/flux-web-components`) met hun documentatie in Storybook, het ontwerp in Figma en
Flux-AI (`https://github.com/milieuinfo/flux-mcp`).

Het portaal volgt visueel de app van de gateway van flux-mcp (`gateway/frontend/` daar, en `docs/technisch/gateway.md`):
de layout van een dashboard uit de flux-starter-app, de startpagina met de banner, de inleiding en de tegels, en de kop
van de pagina's. Neem bij een nieuwe pagina die opzet over, zodat beide als één geheel ogen.

Wat er nu is: de basis met de startpagina en de pagina voor een onbekend pad. Waar het portaal verder naar linkt, volgt.

## Structuur

| Map                       | Inhoud                                                                                   |
|---------------------------|------------------------------------------------------------------------------------------|
| `src/app.ts`, `router.ts` | de app met het menu, en de routes onder de basis van de site                             |
| `src/pages/`              | de pagina's, met wat ze delen in `page.ts`; de componenttests ernaast (`*.cy.ts`)        |
| `src/pages.json`          | de paden die een eigen `index.html` krijgen, voor GitHub Pages                           |
| `src/layout/`             | de layout van het dashboard, uit de flux-starter-app, zoals in de gateway                |
| `src/links.ts`            | de links naar wat Team Flux maakt, en de logo's                                          |
| `src/assets/`             | de banner en het icoon; de banner maakt een script                                       |
| `resources/banner/`       | het script voor de banner, en de nevel uit de banner van Flux-MCP                        |
| `resources/publish.mjs`   | testen, bouwen en publiceren op GitHub Pages, via de branch `gh-pages`                   |
| `cypress/`                | de configuratie van de componenttests                                                    |
| `docs/technisch/`         | de technische documentatie                                                               |

## Commando's

Alles loopt via `pnpm run` (pnpm 11, Node 22, met Volta uit `package.json`; `devEngines` weigert npm). Installeer met
`pnpm install`; de packages van Flux komen van de registry van het departement (`.npmrc`).

```bash
pnpm start                          # http://localhost:8080, en opnieuw bij elke wijziging
pnpm run lint && pnpm run typecheck && pnpm test && pnpm run ct-ci   # zoals publish:pages
pnpm run build                      # in dist/
pnpm run build --env base=/flux/    # zoals op GitHub Pages
pnpm run banner                     # maakt src/assets/flux-banner.svg opnieuw
pnpm run publish:pages              # netwerk: vanaf main, gepusht; testen, bouwen en op gh-pages zetten
```

Cypress installeer je één keer met `pnpm exec cypress install`.

## Conventies

- **Flux zelf.** Het portaal gebruikt de componenten van Flux, in de versie uit `package.json`. Controleer nieuwe of
  gewijzigde markup met Flux-MCP (`flux_check_markup`), en zoek een component op met `flux_get_component`. Een
  aanpassing aan de binnenkant van een component gaat via `custom-css`, zoals Flux het aanraadt.
- **Een nieuwe pagina** volgt de stappen in `docs/technisch/portaal.md`: ook het pad in `src/pages.json`, anders geeft
  GitHub Pages een 404.
- **Gegenereerd niet met de hand wijzigen.** De banner maakt `resources/banner/banner.mjs`; wijzig het script.
- **Code-stijl:** Prettier (`.prettierrc`): 4 spaties, enkele quotes en regels van maximaal 120 tekens. Gebruik
  `pnpm exec prettier`, de versie uit `package.json`. Commentaar in het Nederlands, dat uitlegt waarom, bovenaan elk
  bestand met wat het doet.
- **Tests:** unit tests met Jest (`*.spec.ts`), componenten met Cypress (`*.cy.ts`), met axe voor de
  toegankelijkheid. Wijzig je gedrag, pas dan de tests mee aan.
- **Toegankelijk.** Een link buiten het portaal opent in een nieuw tabblad en zegt dat; een beeld dat enkel versiering
  is, heeft een lege alt; tekst haalt het contrast van WCAG.
- **Documentatie mee bijwerken.** Wijzigt de opzet, werk dan `docs/technisch/` bij; de README blijft beknopt.

## Git

- Commit en push enkel wanneer de gebruiker erom vraagt.
- Commit message: `<type>: FLUX-<nr> - <onderwerp> - <wat>`, bv. `feat: FLUX-900 - portaal - de startpagina`. Types
  zijn `feat`, `fix` en `chore`. Daaronder een body in het Nederlands, beperkt en functioneel: wat er verandert en
  waarom, niet hoe, afgebroken op 120 tekens.
- Werk op een featurebranch (`feature/FLUX-<nr>-…`); `main` is de hoofdbranch. Publiceren gebeurt apart, vanaf
  `main` met `pnpm run publish:pages`; de branch `gh-pages` bevat enkel de build, wijzig hem niet met de hand.
- GitHub Actions staat uit in de organisatie milieuinfo: een workflow in `.github/workflows/` draait niet.
