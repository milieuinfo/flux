// De startpagina van het portaal, zoals die van de gateway van flux-mcp: de banner bovenaan, de inleiding en drie
// tegels op een rij die naar wat Team Flux maakt leiden. De inleiding is smaller dan de drie tegels samen: zo vormt ze
// geen blok erboven.
//
// De banner staat in vl-content-header; de component vraagt naast het beeld een contextlink en een titellink. Het beeld
// is versiering: een lege alt. Het toont het universum van Flux als een sterrenstelsel, in de stijl van de banner van
// Flux-MCP (resources/banner/banner.mjs).
//
// De pagina past op één scherm, zonder scrollen. Ze heeft geen titel in het dashboard en geen padding (app.ts): de
// banner neemt de volle breedte, en de hoogte die de inleiding en de tegels overlaten, tussen 14rem en 34rem. Is het
// scherm te laag, dan scrolt de pagina zoals elke andere. De titel staat er enkel voor een schermlezer.
//
// De links staan in de footer van een tegel, onderaan: zo staan ze in een rij op dezelfde hoogte, ook als de tekst
// ernaast langer is. Een link buiten het portaal opent in een nieuw tabblad, met het icoon en de melding van vl-link.
//
// Onderaan, klein en grijs, in het midden: de bronnen van Flux, met hun logo, elk in een nieuw tabblad; een
// schermlezer hoort dat, met de naam van de link, die ook de tooltip is. Daaronder de versie van Flux waarmee het
// portaal gebouwd is.
//
// De aanpassingen aan de binnenkant van een component gaan via custom-css, zoals Flux het voor een kleine aanpassing
// aanraadt (Styles/Concept).
import { registerWebComponents } from '@domg-wc/common';
import { VlParagraphComponent } from '@domg-wc/components/atom';
import type { VlIcon } from '@domg-wc/components/atom/icon/vl-icon-list';
import { VlContentHeaderComponent } from '@domg-wc/components/block';
import { VlInfoTileComponent } from '@domg-wc/components/block/next';
import { vlMediaScreenMedium } from '@domg-wc/styles';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import pkg from '../../package.json';
import banner from '../assets/flux-banner.svg';
import { FIGMA, FIGMA_URL, FLUX_AI_URL, GITHUB, GITHUB_URL, STORYBOOK, STORYBOOK_URL } from '../links';
import { href } from '../router';
import { pageStyles } from './page';

registerWebComponents([VlContentHeaderComponent, VlInfoTileComponent, VlParagraphComponent]);

// De versie van Flux waarmee het portaal gebouwd is, uit package.json.
const FLUX_VERSION = pkg.dependencies['@domg-wc/components'];

// De bronnen onderaan: de naam, de link en het logo.
const SOURCES: [label: string, href: string, logo: string][] = [
    ['flux-web-components op GitHub', GITHUB_URL, GITHUB],
    ['Storybook van de nieuwste Flux', STORYBOOK_URL, STORYBOOK],
    ['De componenten van Flux in Figma', FIGMA_URL, FIGMA],
];

// De kop van vl-content-header vult zijn host; de grote variant vraagt anders minstens 31.5rem, met 6rem boven en
// onder. De titel staat in lijn met de inleiding en de tegels, die even breed zijn (--home-width erft door in de shadow
// root), en in de letter van de tegels.
const BANNER_CSS =
    '.vl-content-header { flex: 1; display: flex; flex-direction: column; } ' +
    '.vl-content-header__wrapper { flex: 1; } ' +
    '.vl-content-header--large .vl-content-header__wrapper > .vl-layout ' +
    '{ min-height: 14rem; padding-top: 3rem; padding-bottom: 3rem; max-width: var(--home-width); } ' +
    '.vl-content-header .vl-content-header__context__link, .vl-content-header .vl-content-header__title__link ' +
    '{ font-size: 1.8rem; }';

// De alinea in vl-paragraph houdt de marge van de browser (1em); de ruimte tot de tegels volstaat. Uitgevuld staat ze
// ook rechts recht, en met een wat kleinere regelafstand dan de 1.5 van Flux oogt ze compacter.
const INTRO_CSS = 'p.introduction { margin: 0; line-height: 1.35; text-align: justify; text-wrap: pretty; }';

// De inhoud van een tegel groeit al (flex: 1), maar de tegel zelf is geen flex-kolom: zo staat de footer met de links
// onderaan, in elke tegel op dezelfde hoogte. De kop groeit in Flux ook: in een kortere tegel zakte de tekst dan wat.
// Zo begint ze overal even hoog onder de kop.
const TILE_CSS =
    '.info-tile--full-height { display: flex; flex-direction: column; } ' +
    '.info-tile--full-height > :not(.info-tile__content) { flex: none; }';

// De tegels: wat Team Flux maakt. Een link buiten het portaal begint met https://.
const TILES: { title: string; subtitle: string; icon: VlIcon; text: string; links: [string, string][] }[] = [
    {
        title: 'Web componenten',
        subtitle: 'Met hun documentatie in Storybook',
        icon: 'programming-jigsaw',
        text:
            'De componenten, de stijlen en de kaart van Flux, in de huisstijl van de Vlaamse overheid, met de ' +
            'documentatie van elke release.',
        links: [
            [STORYBOOK_URL, 'Storybook'],
            [GITHUB_URL, 'GitHub'],
        ],
    },
    {
        title: 'Ontwerp',
        subtitle: 'De bibliotheek in Figma',
        icon: 'pencil-ruler',
        text: 'De componenten van Flux als bibliotheek in Figma, voor wie een scherm ontwerpt.',
        links: [[FIGMA_URL, 'Figma']],
    },
    {
        title: 'Flux-AI',
        subtitle: 'Kennis voor je AI-client',
        icon: 'magic-wand',
        text:
            'De kennis over Flux per versie, voor de AI-client van je project, met recepten om een frontend te ' +
            'bouwen en te onderhouden.',
        links: [[FLUX_AI_URL, 'Flux-AI']],
    },
];

@customElement('flux-home-page')
export class HomePage extends LitElement {
    static styles = [
        ...pageStyles,
        css`
            /* Het inhoudsvak van het dashboard: zonder titel en padding de hoogte van het venster. De inhoud is even
               breed als op de andere pagina's: 128rem, met 2 x 3rem padding. */
            :host {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                --home-width: 134rem;
            }

            section.banner {
                display: flex;
                flex-direction: column;
                flex: 1 0 auto;
                max-height: 34rem;
            }

            vl-content-header {
                display: flex;
                flex-direction: column;
                flex: 1;
            }

            /* De padding van de andere pagina's (app.ts), met veel ruimte tussen de banner en de inleiding en wat meer
               onderaan, en in het midden, onder de titel in de banner. */
            .content {
                box-sizing: border-box;
                width: 100%;
                max-width: var(--home-width);
                margin: 0 auto;
                padding: 12rem 3rem 4rem;
            }

            /* Onderaan, in het midden, zoals een voettekst: de bronnen, en daaronder de versie van Flux. Tegen de
               onderkant van het venster: de marge erboven neemt wat de banner, tot zijn 34rem, overlaat; is het
               venster te laag, dan volgen ze de tegels. */
            .foot {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                margin-top: auto;
                padding: 0 3rem 2.4rem;
            }

            /* De bronnen klein en grijs: een icoon heeft 3:1 als contrast nodig, grey-700 haalt dat op wit. */
            .sources {
                display: flex;
                gap: 2.4rem;
            }

            .sources a {
                display: inline-flex;
                color: var(--vl-color--grey-700);
            }

            .sources a:hover,
            .sources a:focus-visible {
                color: var(--vl-color--action, #0055cc);
            }

            .sources a:focus-visible {
                outline: 3px solid var(--vl-color--border-focus, #0055cc);
                outline-offset: 4px;
            }

            .sources svg {
                width: 2.2rem;
                height: 2.2rem;
                fill: currentColor;
            }

            /* Kleine tekst heeft 4,5:1 nodig: grey-800, niet het grijs van de logo's. */
            .built {
                margin: 0;
                font-size: 1.4rem;
                color: var(--vl-color--grey-800);
            }

            /* De tegels op een rij, met meer witruimte dan de grid van Flux geeft: 1.5rem tussen de kolommen. Een
               eigen grid van drie kolommen, niet die van Flux: die heeft er twaalf, en met elf keer 4rem ertussen werd
               ze op een smal scherm breder dan het scherm. Een tegel rekt mee tot de hoogte van de rij. */
            .tiles {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 4rem;
            }

            /* De inleiding over de eerste twee kolommen van de tegels. */
            .intro-row {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                column-gap: 4rem;
                margin-bottom: 6rem;
            }

            /* De inleiding loopt tot twee derde van de middelste tegel, niet over alle drie; staan de tegels onder
               elkaar, dan even breed. Over twee kolommen van breedte t, samen 2t + 4rem = 100%, is 5t/3 + 4rem gelijk
               aan (500% + 4rem) / 6. */
            .intro {
                grid-column: 1 / 3;
                max-width: calc((500% + 4rem) / 6);
            }

            /* De inleiding 10% kleiner dan in Flux, op elk scherm: Flux kiest de grootte per scherm uit deze
               variabelen. */
            .intro vl-paragraph {
                --vl-font-size--xlarge: calc(0.9 * 2.2rem);
                --vl-font-size--large: calc(0.9 * 2rem);
                --vl-font-size: calc(0.9 * 1.8rem);
            }

            /* Op een smal scherm staan de tegels onder elkaar, met minder ruimte boven de inleiding. */
            @media screen and (max-width: ${vlMediaScreenMedium}px) {
                .content {
                    padding-top: 6rem;
                }

                .tiles,
                .intro-row {
                    grid-template-columns: minmax(0, 1fr);
                    gap: 3rem;
                }

                .intro {
                    grid-column: auto;
                    max-width: none;
                }
            }

            /* Flux, het eerste woord, als initiaal: groot en donkergrijs over twee regels van de inleiding, met de
               tekst errond. De bovenkant van de letters valt samen met die van de eerste regel, de onderkant met die
               van de tweede. In em, want de inleiding wordt op een kleiner scherm kleiner: zo blijft dat kloppen. Het
               vak blijft lager dan twee regels van de inleiding, anders springt ook de derde regel in. */
            .intro strong {
                float: left;
                margin: 0.05em 0.16em 0 0;
                font-size: 3.1em;
                line-height: 0.8;
                font-weight: 600;
                letter-spacing: -0.02em;
                white-space: nowrap;
                color: var(--vl-color--grey-900);
            }
        `,
    ];

    render() {
        return html`
            <h1 class="visually-hidden">Flux</h1>
            <section class="banner">
                <vl-content-header custom-css=${BANNER_CSS}>
                    <img slot="image" src=${banner} alt="" />
                    <a slot="context-link" href="https://omgeving.vlaanderen.be">Departement Omgeving</a>
                    <a slot="title-link" href=${href('/')}>Frontend Library en User eXperience</a>
                </vl-content-header>
            </section>
            <section class="content" aria-label="Wat Team Flux maakt">
                <div class="intro-row">
                    <div class="intro">
                        <vl-paragraph introduction custom-css=${INTRO_CSS}>
                            <strong>Flux</strong> is de frontend library van het Departement Omgeving, met de
                            componenten in de huisstijl van de Vlaamse overheid, hun ontwerp in Figma en Flux-AI voor de
                            AI-client van je project. Op dit portaal vind je alles wat Team Flux maakt.
                        </vl-paragraph>
                    </div>
                </div>
                <div class="tiles">${TILES.map((tile) => this.renderTile(tile))}</div>
            </section>
            <footer class="foot">
                ${this.renderSources()}
                <p class="built">Gebouwd met Flux ${FLUX_VERSION}</p>
            </footer>
        `;
    }

    private renderSources() {
        return html`
            <nav class="sources" aria-label="Bronnen">
                ${SOURCES.map(
                    ([label, url, logo]) => html`
                        <a href=${url} title=${label} target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d=${logo}></path></svg>
                            <span class="visually-hidden">${label}, opent in een nieuw tabblad</span>
                        </a>
                    `,
                )}
            </nav>
        `;
    }

    private renderTile({ title, subtitle, icon, text, links }: (typeof TILES)[number]) {
        return html`
            <vl-info-tile-next
                highlight
                full-height
                icon=${icon}
                icon-as-badge
                heading-level="2"
                custom-css=${TILE_CSS}
            >
                <span slot="trigger">${title}</span>
                <span slot="subtitle">${subtitle}</span>
                <vl-text slot="content">${text}</vl-text>
                <div slot="footer" class="vl-group vl-group--wrap vl-group--separator-row">
                    ${links.map(([url, label]) => this.renderLink(url, label))}
                </div>
            </vl-info-tile-next>
        `;
    }

    // Een link buiten het portaal opent in een nieuw tabblad; een pagina van het portaal staat onder de basis.
    private renderLink(url: string, label: string) {
        const external = url.startsWith('https://');
        return html`<vl-link href=${external ? url : href(url)} ?external=${external}>${label}</vl-link>`;
    }
}
