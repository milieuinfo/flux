# Flux

Het portaal van Team Flux (Frontend Library en User eXperience) van het Departement Omgeving: van hieruit vind je
alles wat het team maakt, zoals de web componenten met hun documentatie in Storybook, het ontwerp in Figma en Flux-AI.
De startpagina toont de nieuwste release van Flux; de wegwijzer zet de repo's, de documentatie en de plaatsen waar het
team werkt op een rij.

Het portaal staat op GitHub Pages: <https://milieuinfo.github.io/flux/>.

## Opzet

Een app in Flux, zoals de app van de gateway van [flux-mcp](https://github.com/milieuinfo/flux-mcp): web components
met Lit en TypeScript, gebundeld met Webpack, met de layout van een dashboard uit de flux-starter-app.
`pnpm run publish:pages` test en bouwt het portaal, en zet het op de branch `gh-pages`, die GitHub Pages publiceert.

Hoe het in elkaar zit, hoe je een pagina toevoegt en hoe de banner ontstaat:
[docs/technisch/portaal.md](docs/technisch/portaal.md).

Een nieuwe opzet, met alles van Team Flux op het containerplatform en de code op GitLab, staat in de architectuur:
[docs/architectuur/](docs/architectuur/README.md).

## Aan de slag

Node 22 en pnpm 11; met Volta krijg je de versies uit `package.json`.

```bash
pnpm install
pnpm start                 # http://localhost:8080, en opnieuw bij elke wijziging
pnpm run lint && pnpm run typecheck && pnpm test && pnpm run ct-ci
pnpm run build             # in dist/
pnpm run publish:pages     # vanaf main, gepusht: testen, bouwen en publiceren op GitHub Pages
```

De packages van Flux komen van de registry van het departement (`.npmrc`). Cypress installeer je één keer met
`pnpm exec cypress install`.
