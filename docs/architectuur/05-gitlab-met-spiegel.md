# GitLab, met een spiegel op GitHub

**Beslist op 9 november 2026:** alle code komt op GitLab, en flux-web-components krijgt een spiegel op GitHub die enkel
gelezen wordt. Een publiek project op GitLab kan niet.

Nu staan flux-web-components, flux (dit portaal), flux-builds, flux-assets, flux-prototypes, flux-proto-vizier en
flux-agents op GitHub; flux-mcp staat op beide, en flux-starter-app op GitLab. Publiek zijn flux-web-components (12
sterren, 6 forks, 3 open issues), flux-builds, flux, flux-assets en flux-prototypes.

## Wat het oplevert

- **Eén plaats,** waar Jenkins al bouwt, met de accounts van het departement.
- **Een release hangt niet meer aan een persoon.** Nu pusht de pijplijn van flux-web-components naar GitHub met een
  persoonlijk token (de credential `github` in Jenkins), en staat de naam van die persoon in de scripts voor de
  release.
- **Storybook komt zonder handwerk online** ([03](03-storybook-en-prototypes.md)).

## Wat de spiegel bewaart

- **De broncode blijft publiek te lezen,** en de forks blijven bestaan. De npm-pakketten blijven sowieso publiek: ze
  staan op Artifactory, zonder aanmelden.
- **De links van flux-mcp naar GitHub blijven werken:** naar een commit (`server/src/commits.mjs`), naar een bestand bij
  een tag (`server/src/storybook.mjs`), en de repo die de scripts van de catalogus klonen (`FLUX_REPO_URL` in
  `resources/common.sh`). Commits en tags komen mee naar GitHub; flux-mcp hoeft niet te veranderen.

## Hoe

- **GitLab pusht zelf naar GitHub** (een push mirror), na elke push. Een tweede push-URL op ieders machine valt af: dan
  hangt de spiegel af van de discipline van elke ontwikkelaar.
- **Een deploy key in plaats van een token.** GitLab maakt een SSH-sleutel voor de spiegel; die komt als deploy key met
  schrijfrecht op de repo op GitHub. Zo hangt ook de spiegel niet aan een persoon.
- **Enkel beschermde branches:** featurebranches blijven intern. Kijk bij de eerste release na dat de tag op GitHub
  aankomt.
- **Mag GitLab niet naar github.com verbinden,** dan pusht Jenkins `develop`, `main` en de tags na elke build, met
  dezelfde deploy key.

## GitHub enkel lezen

- **Enkel de deploy key schrijft.** De spiegel overschrijft wat afwijkt: een commit die iemand rechtstreeks op GitHub
  zet, verdwijnt.
- **De issues gaan uit,** en de beschrijving zegt dat de repo een spiegel is, met `domg_flux@groepen.vlaanderen.be` voor
  vragen.
- **Pull requests kun je op GitHub niet uitzetten;** het team neemt er een met de hand over naar GitLab.

## Wat er verandert

| Waar                                | Wat                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **flux-web-components**             | semantic-release met `@semantic-release/gitlab`. De scripts voor de release pushen naar GitLab met een project access token; de credential `github` en de naam in de scripts verdwijnen. De releases met hun notes staan op GitLab; wie niet kan aanmelden, leest de changelog in Storybook.                                                          |
| **het portaal**                     | op GitLab als `flux-portal` ([06](06-namen.md)). De nieuwste release komt niet meer van de releases op GitHub. Zolang het portaal op GitHub Pages staat: de hoogste tag, via de API van GitHub. Op het platform: Artifactory, via nginx ([01](01-opzet-op-het-platform.md#flux-portal)). De link "Release notes" gaat naar de changelog in Storybook. |
| **flux-mcp**                        | de remote op GitHub valt weg. De links blijven werken; `FLUX_REPO_URL` mag naar GitLab, voor een kloon binnen het departement.                                                                                                                                                                                                                        |
| **flux-agents**                     | de scripts voor pull requests maken merge requests.                                                                                                                                                                                                                                                                                                   |
| **CODEOWNERS**                      | van `.github/CODEOWNERS` naar `.gitlab/CODEOWNERS`. Of GitLab er goedkeuringen mee afdwingt, hangt af van de licentie.                                                                                                                                                                                                                                |
| **issues en PR's**                  | de importer van GitLab neemt ze mee, als die aan staat; anders enkel de historiek van git, en de 3 open issues met de hand.                                                                                                                                                                                                                           |
| **de GitHub Pages van het portaal** | een pagina die naar het nieuwe adres verwijst ([02](02-hostnamen.md#de-redirects)).                                                                                                                                                                                                                                                                   |

**Niet `@semantic-release/github` ernaast.** De release zou ontstaan voor de spiegel de tag gepusht heeft, en dan maakt
GitHub de tag zelf, op de verkeerde commit.

## De volgorde

1. **Het project op GitLab,** met de volledige historiek, dus met alle branches en tags: `git clone --mirror` van
   GitHub, dan `git push --mirror` naar GitLab.
2. **Vanaf een afgesproken moment** pusht niemand nog naar GitHub, en iedereen zet `origin` op GitLab.
3. **De spiegel aan,** en nakijken dat de branches en de tags op GitHub aankomen.
4. **Jenkins bouwt van GitLab;** de scripts voor de release en semantic-release aangepast; een eerste release op
   `develop` als test.
5. **Het portaal** toont de hoogste tag.
6. **De andere repo's** naar GitLab, in de groep `flux`: flux als flux-portal, flux-mcp (enkel de remote op GitHub
   weg), flux-agents, flux-proto-vizier en flux-assets. Daarna archiveren op GitHub, behalve de spiegel.

## Conclusie

GitLab wordt de enige plaats waar het team werkt; GitHub houdt enkel een spiegel van flux-web-components, die GitLab
zelf bijwerkt met een deploy key. De release hangt niet meer aan een persoon, de links naar GitHub blijven werken, en
het portaal haalt de nieuwste release van de tags, later van Artifactory.

Hoe alles heet, in de repo's, de images, de pods en de paden, is de laatste afweging: [De namen](06-namen.md).

## Bronnen

- [GitLab: een push mirror](https://docs.gitlab.com/user/project/repository/mirror/push/)
- [GitHub: deploy keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys)
- [GitLab: project access tokens](https://docs.gitlab.com/user/project/settings/project_access_tokens/)
- [semantic-release voor GitLab](https://github.com/semantic-release/gitlab)
- [GitLab: CODEOWNERS](https://docs.gitlab.com/user/project/codeowners/)
