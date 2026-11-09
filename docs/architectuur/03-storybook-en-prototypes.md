# Storybook en de prototypes op het platform

Storybook en de prototypes zijn statisch en publiek, en krijgen elk een eigen hostnaam ([02](02-hostnamen.md)). Deze
afweging gaat over hoe hun builds op het platform komen.

## Wat er nu is

- **Storybook** staat op GitHub Pages, vanuit flux-builds. Bij elke release maakt de pijplijn van flux-web-components
  `storybook-<versie>.tgz` en bewaart het in Jenkins. Daarna pakt iemand het met de hand uit in flux-builds, en commit
  het ("feat: storybook v2.22.0").
- **De prototypes** staan op GitHub Pages, vanuit flux-prototypes, met de build van elk prototype in een eigen map,
  zoals `vizier/`. Ze worden gebouwd in hun eigen repo, zoals flux-proto-vizier.

flux-builds is 3,7 GB groot:

| Map          | Builds | Grootte |
| ------------ | ------ | ------- |
| `release-v1` | 80     | 2,1 GB  |
| `release-v2` | 38     | 789 MB  |
| `develop`    | 36     | 794 MB  |
| `release`    | 2      | 8 KB    |

Een build van v2 is zo'n 20 MB, en elke release komt erbij. Een build die er staat, verandert nooit meer.

## Voorstel: Artifactory als bron, nginx als etalage

- **De pijplijn van flux-web-components** zet de build van Storybook op Artifactory, in `local-generic`, zoals ze nu
  al het bestand voor compliance doet. De commit met de hand in flux-builds valt weg.
- **Een prototype** gaat ook als tgz naar Artifactory, met een script of een job in Jenkins in zijn eigen repo,
  `flux-proto-<naam>`.
- **Het pad in Artifactory begint met de hostnaam,** en de rest is het pad op die hostnaam
  ([06](06-namen.md)): `flux-storybook/release-v2/2.22.0.tgz` komt op `flux-storybook…/release-v2/2.22.0/`, en
  `flux-prototypes/vizier/<versie>.tgz`, de hoogste versie, op `flux-prototypes…/vizier/`.
- **De pod `flux-static`** heeft twee containers:
    - **nginx** (`nginx-unprivileged`, de image van het platform), met een blok per hostnaam. De configuratie staat in
      een ConfigMap in flux-config;
    - **een sync,** die om de paar minuten in Artifactory kijkt welke builds er zijn, de ontbrekende ophaalt en uitpakt.
      Hij zet ook `latest` op de hoogste versie; nu is dat een eigen map in flux-builds.
- **Het volume** is een `emptyDir` per pod. Een nieuwe pod haalt bij de start alles op, en is pas klaar als dat gedaan
  is (de readinessProbe). Zo draaien er twee pods, zonder gedeelde schijf.

Er is geen eigen image en geen eigen repo: enkel configuratie. Het script van de sync staat in de ConfigMap, en draait
op een kleine standaardimage met `curl` en `tar`.

## Alternatieven

|                          | Artifactory en een sync (voorstel)  | Een image per release                           | Een gedeelde schijf (PVC)                                      |
| ------------------------ | ----------------------------------- | ----------------------------------------------- | -------------------------------------------------------------- |
| **Een release**          | een upload; de pod volgt vanzelf    | een nieuwe image van 3,7 GB, scannen, uitrollen | een upload; de sync volgt vanzelf                              |
| **De start van een pod** | haalt alles op, en duurt dus langer | trekt een image van 3,7 GB                      | meteen klaar                                                   |
| **Meer dan één pod**     | ja, elk met zijn eigen kopie        | ja                                              | enkel met een schijf die meerdere pods delen (`ReadWriteMany`) |
| **Wat het vraagt**       | zo'n 3 GB tijdelijke schijf per pod | een scan van 3,7 GB bij elke release            | een schijf van het platform, met een back-up                   |

Een image per release valt af: bij elke release 3,7 GB bouwen, scannen met Trivy en uitrollen, voor builds die nooit
veranderen. Een gedeelde schijf is sneller bij de start, maar vraagt een schijf die meerdere pods delen, en een
back-up; met Artifactory als bron is een pod wegwerpbaar.

## Opruimen

- **`develop`**: 36 builds, 794 MB. De catalogus van flux-mcp linkt er niet naar; enkel de laatste paar blijven.
- **`release-v1`** blijft: de catalogus linkt er 1.569 keer naar.

## Conclusie

Artifactory is de bron van de builds, en een pod met nginx en een sync zet ze online, voor beide hostnamen. Een release
is een upload, zonder image en zonder handwerk; flux-builds en flux-prototypes op GitHub Pages vallen weg.

Welke repo's er dan overblijven, is de volgende afweging: [De repo's](04-repos.md).

## Open vragen

- Hoeveel tijdelijke schijf mag een pod gebruiken op het platform: zo'n 3 GB, na het opruimen van `develop`?
- Welke builds van `develop` blijven er, en hoelang?
