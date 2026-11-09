# De namen

**Beslist op 10 november 2026.**

Wat Team Flux maakt, heet nu op elke plaats anders. De repo `flux` bevat enkel het portaal. De gateway heet
`flux-mcp-gateway`, maar regelt in de opzet de rechten voor alles op de hostnaam. "Flux" is tegelijk het designsysteem,
het team, een hostnaam, een pad en een repo. En de namen mengen Nederlands en Engels. Deze afweging geeft elk onderdeel
één naam, in één taal.

## De regel

- **Elk onderdeel heet `flux-<onderdeel>`,** overal hetzelfde: de repo, de image, de Deployment en de Service, de
  Keycloak-client en de databank.
- **Een repo met meer onderdelen** draagt de naam van wat ze delen: `flux-mcp` bouwt `flux-mcp-server` en
  `flux-mcp-dashboard`.
- **Het pad is de naam zonder `flux-`,** want de hostnaam zegt al `flux`. Zonder uitzondering.
- **Een hostnaam is `flux` of `flux-<wat>`,** met `-ontwikkel` of `-oefen` erachter voor `on` en `oe`
  ([02](02-hostnamen.md)).
- **Wat we zelf benoemen, is Engels:** de repo, de image, de pod, het pad, en de bestanden die de code leest, zoals
  `/portal/content/public.json`. Wat het platform of IDM oplegt, blijft zoals het is: `-ontwikkel` en `-oefen`, `on`,
  `oe` en `pr`, en de rol `flux-mcp-gebruiker`. De tekst blijft Nederlands: in de docs en in het portaal heet het "het
  portaal".

## De namen

| Onderdeel         | Repo                                 | Image, Deployment en Service           | Pad of hostnaam                     |
| ----------------- | ------------------------------------ | -------------------------------------- | ----------------------------------- |
| het portaal       | `flux-portal` (nu `flux`)            | `flux-portal`                          | `/portal/`                          |
| de gateway        | `flux-gateway`                       | `flux-gateway` (nu `flux-mcp-gateway`) | `/gateway/`                         |
| de MCP-server     | `flux-mcp`                           | `flux-mcp-server`                      | `/mcp-server`                       |
| het mcp-dashboard | `flux-mcp`                           | `flux-mcp-dashboard`                   | `/mcp-dashboard/`                   |
| Storybook         | `flux-web-components`                | in `flux-static`                       | `flux-storybook`                    |
| de prototypes     | `flux-proto-<naam>`                  | in `flux-static`                       | `flux-prototypes`, onder `/<naam>/` |
| de configuratie   | `flux-config` (nu `flux-mcp-config`) | de namespace `flux` (nu `flux-mcp`)    | geen                                |

Daarbij:

- **De Keycloak-client** heet `flux-gateway` (nu `flux-mcp-gateway`), met zijn profielen in IDM onder
  `cumuli-idm-profiles/profiles/flux-gateway/<zuil>/`.
- **De databanken** volgen hun pod: een voor `flux-gateway`, met de rechten, en een voor `flux-mcp-dashboard`, met het
  gebruik. Nu is er één, `flux-mcp-postgres` (INFRA-7302).
- **De rollen** heten `flux-<onderdeel>-<rol>`: `flux-mcp-gebruiker` bestaat al; voor het portaal bijvoorbeeld
  `flux-portal-team`.
- **In Artifactory** begint het pad met de hostnaam: `local-generic/flux-storybook/release-v2/<versie>.tgz` en
  `local-generic/flux-prototypes/<naam>/<versie>.tgz` ([03](03-storybook-en-prototypes.md)).
- **Op GitLab** staan de repo's van het team in de groep `flux`, waar flux-mcp en flux-csp-poc al staan. `flux-config`
  staat in `cumulus/k8s/config`, zoals nu flux-mcp-config.

## Waarom

- **`flux-portal`, niet `flux`.** "Flux" is het designsysteem, het team en de hostnaam; een repo met enkel het portaal
  verdient een eigen naam. De repo op GitLab is toch nieuw, en `milieuinfo/flux` op GitHub wordt gearchiveerd
  ([05](05-gitlab-met-spiegel.md)).
- **`portal` en `static`, niet `portaal` en `statisch`.** `gateway`, `mcp-server` en `mcp-dashboard` zijn al Engels;
  met `portal` vormen ook de paden één geheel: `/portal`, `/gateway`, `/mcp-server` en `/mcp-dashboard`. Het volgt de
  regel van de repo's van het team, dat namen in de code Engels zijn. En het kost nu niets: geen van die namen bestaat
  al.
- **`flux-gateway`, niet `flux-mcp-gateway`.** De gateway regelt de rechten voor alles op de hostnaam, niet enkel voor
  Flux-MCP, en kent MCP niet.
- **`/portal`, niet `/flux`.** `flux.omgeving.vlaanderen.be/flux/` zegt twee keer hetzelfde. Er is ook geen link te
  bewaren: `/flux/` op die hostnaam geeft een 404, nagekeken op 10 november 2026. Het portaal staat nu op
  `milieuinfo.github.io/flux/`, en dat adres krijgt toch een pagina die doorverwijst. Enkel de basis van de build
  wijzigt.
- **`/mcp-server`, niet `/mcp`.** `/mcp` is een gewoonte uit de voorbeelden van MCP, geen vereiste: een AI-client
  krijgt altijd de volledige URL, en moet toch opnieuw ingesteld worden, omdat de hostnaam wijzigt. Bovendien is zo geen
  enkel pad het begin van een ander. Met `/mcp` naast `/mcp-dashboard` geldt een regel die de tekst vergelijkt, zoals
  `startsWith("/mcp")`, ook voor het dashboard. Traefik vergelijkt per segment van het pad en vergist zich niet; de
  regels per pad in de gateway zijn eigen code.
- **Geen `flux-mcp.omgeving.vlaanderen.be`.** ADR-007 in flux-mcp plande die hostnaam voor `pr`; hij bestaat nog niet.
  Flux-MCP komt in productie meteen op `flux.omgeving.vlaanderen.be/mcp-server`, zodat niemand zijn AI-client twee keer
  moet omzetten. Het gevolg: `pr` van Flux-MCP wacht tot `flux.omgeving.vlaanderen.be` op het platform staat
  ([01](01-opzet-op-het-platform.md#de-overgang), stap 5).

## Wat bewust blijft

- **De paden van Storybook,** zoals `/release-v2/<versie>/`: de catalogus van flux-mcp linkt er 8.454 keer naar, en een
  oude link krijgt een 301 naar hetzelfde pad op `flux-storybook` ([02](02-hostnamen.md#de-redirects)).
- **De pakketten `@domg-wc` en `@domg/flux-mcp-catalog`:** ze zijn gepubliceerd, en projecten hangen ervan af.
- **`-ontwikkel` en `-oefen`** in een hostnaam, en `on`, `oe` en `pr` voor de zuilen: de conventie van het platform.
- **`flux-proto-<naam>`** voor de repo van een prototype, zoals flux-proto-vizier.
- **De rol `flux-mcp-gebruiker`:** ze staat in IDM, in `cumuli-idm-profiles`, en in de configuratie van de gateway.

## In de tekst

- **De naam voor mensen en de technische naam.** In de tekst "het portaal", "de gateway", "de MCP-server", "het
  mcp-dashboard"; de technische naam in code, zoals `flux-portal`. Bij de eerste vermelding staan beide.
- **Hostnaam,** niet host of domein.
- **Flux, Team Flux, Flux-AI, Flux-MCP en de gateway** betekenen wat in de [begrippen](README.md#begrippen) staat.

## Conclusie

Elk onderdeel heet `flux-<onderdeel>`, in het Engels, in de repo, de image, de pod, de Keycloak-client en de databank;
zijn pad is die naam zonder `flux-`. Dat geeft `/portal`, `/gateway`, `/mcp-server` en `/mcp-dashboard`, de repo
`flux-portal`, de gateway `flux-gateway`, de namespace `flux` en de config-repo `flux-config`.
`flux-mcp.omgeving.vlaanderen.be` komt er niet.

## Open vragen

- Voor het platformteam: de namespace `flux` en de config-repo `flux-config` in plaats van wat HLPD-83052 vastlegde
  (`flux-mcp` en `flux-mcp-config`), en de Keycloak-client `flux-gateway` met zijn profielen in IDM.
