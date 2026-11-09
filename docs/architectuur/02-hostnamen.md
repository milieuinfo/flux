# De hostnamen

**Beslist op 9 november 2026.**

De opzet ([01](01-opzet-op-het-platform.md)) heeft drie soorten verkeer: het portaal, Flux-MCP en de gateway, met
aanmelden; Storybook, publiek; en de prototypes, publiek. Ze krijgen drie hostnamen, elk op één niveau onder
`omgeving.vlaanderen.be`:

| Wat                                 | `on`                                    | `oe`                                           | `pr`                                     |
| ----------------------------------- | --------------------------------------- | ---------------------------------------------- | ---------------------------------------- |
| het portaal, Flux-MCP en de gateway | `flux-ontwikkel.omgeving.vlaanderen.be` | `flux-oefen.omgeving.vlaanderen.be`            | `flux.omgeving.vlaanderen.be`            |
| Storybook                           | niet nodig                              | `flux-storybook-oefen.omgeving.vlaanderen.be`  | `flux-storybook.omgeving.vlaanderen.be`  |
| de prototypes                       | niet nodig                              | `flux-prototypes-oefen.omgeving.vlaanderen.be` | `flux-prototypes.omgeving.vlaanderen.be` |

Een build van Storybook of een prototype verandert niet per zuil. Op `oe` test je de pod; `on` is niet nodig.

## Waarom op één niveau

- **Het certificaat van het platform dekt één niveau.** Het platform gebruikt een wildcard-certificaat voor
  `*.omgeving.vlaanderen.be`, nagekeken op `flux-mcp-oefen`. Dat geldt niet voor
  `storybook.flux.omgeving.vlaanderen.be`. Een naam op één niveau krijgt zijn DNS en certificaat van het platform zelf,
  zonder ticket. Een naam op twee niveaus
  vraagt een eigen certificaat voor `*.flux.omgeving.vlaanderen.be`: een aanvraag, en een afwijking van hoe het platform
  het nu doet.
- **`flux-prototypes.omgeving.vlaanderen.be` bestaat al,** en staat in de wegwijzer en in bookmarks. De naam blijft;
  enkel GitHub Pages erachter wordt een pod.
- **Het volgt het patroon van Flux-MCP:** `flux-mcp-ontwikkel` en `flux-mcp-oefen`. De hostnaam `flux-mcp` voor `pr`,
  gepland in ADR-007 van flux-mcp, komt er niet: Flux-MCP gaat in productie meteen naar
  `flux.omgeving.vlaanderen.be/mcp-server` ([06](06-namen.md)).

## Waarom niet `public.flux.omgeving.vlaanderen.be`

Eén hostnaam voor Storybook en de prototypes lag voor de hand: beide zijn publiek en statisch. Toch niet:

- **"public" zegt wie iets mag zien, niet wat het is.** Dat kan veranderen: flux-proto-vizier is nu al een privé-repo,
  en een prototype met echte gegevens kan later aanmelden vragen. Dan staat het op "public". Een naam die zegt wat er
  draait, blijft kloppen.
- **Ze delen dan een origin.** Storybook registreert een service worker op `/` (`mockServiceWorker.js`), en zijn addons
  schrijven in localStorage; de prototypes zouden dat delen. Op geen van beide meld je je aan, dus het risico is klein.
  Maar aparte namen kosten niets extra.
- **Eén plaats voor wat statisch is, heb je toch:** één pod met nginx bedient beide hostnamen
  ([03](03-storybook-en-prototypes.md)).

## Waarom Storybook niet onder `flux.omgeving.vlaanderen.be/storybook`

Op die hostnaam zit de gateway. Alles op dezelfde hostnaam deelt een origin, en een script van Storybook kan dan, namens
een aangemelde bezoeker, de API van de gateway aanroepen en het antwoord lezen, en zo bijvoorbeeld een persoonlijk token
maken. Storybook is daar het zwakke punt: zo'n 150 builds, waarvan 80 van v1, met bibliotheken die niemand nog bijwerkt,
en oudere versies van Storybook hadden lekken via parameters in de URL. Eén slechte link naar een oude versie volstaat.

Op een eigen hostnaam heeft Storybook een eigen origin, en de sessiecookie, zonder `Domain`, gaat er niet naartoe. Nu
zit de gateway ook op een andere hostnaam dan Storybook; de opzet houdt dat zo.

## De redirects

Op `flux.omgeving.vlaanderen.be`, in Traefik, met het pad erbij:

| Van                                                          | Naar                                                     |
| ------------------------------------------------------------ | -------------------------------------------------------- |
| `/`                                                          | `/portal/`                                               |
| `/storybook/…`                                               | `https://flux-storybook.omgeving.vlaanderen.be/…`        |
| `/release-v1/…`, `/release-v2/…`, `/release/…`, `/develop/…` | hetzelfde pad op `flux-storybook.omgeving.vlaanderen.be` |

Een 301, dus voorgoed. De 8.454 links in de catalogus van flux-mcp blijven werken; de catalogus krijgt toch de nieuwe
links, zodat een AI-client de omweg niet maakt. De GitHub Pages van het portaal, `milieuinfo.github.io/flux`, kan geen
301 geven: daar komt een pagina die naar het nieuwe adres verwijst.

Op `flux-mcp-ontwikkel` en `flux-mcp-oefen` gaat `/mcp` nog een tijd naar de MCP-server, zonder redirect: een AI-client
volgt een redirect bij een POST niet altijd. De rest gaat met een 301 naar `/mcp-dashboard/` op `flux-ontwikkel` en
`flux-oefen`.

## Conclusie

Drie hostnamen op één niveau: `flux` voor alles met aanmelden, `flux-storybook` en `flux-prototypes` publiek, elk met
een eigen origin. Ze passen op het certificaat en in de DNS van het platform, de naam van de prototypes blijft, en
Storybook komt niet in de origin van de gateway. Wat Storybook nu onder `flux` heeft, krijgt een 301.

Hoe Storybook en de prototypes op het platform komen, is de volgende afweging: [Storybook en de
prototypes](03-storybook-en-prototypes.md).
