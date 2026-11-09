// Wat elke pagina van het portaal deelt, zoals in de app van de gateway van flux-mcp: de componenten van Flux die ze
// gebruiken, de layout van Flux (grid, stacked), wat Flux niet geeft, zoals een codeblok en lijsten, en de kop van een
// pagina met het icoon uit het menu.
import { registerWebComponents } from '@domg-wc/common';
import { VlIconComponent, VlLinkComponent, VlTextComponent, VlTitleComponent } from '@domg-wc/components/atom';
import { vlLayoutStyles, vlResetStyles } from '@domg-wc/styles';
import { css, html } from 'lit';

registerWebComponents([VlIconComponent, VlLinkComponent, VlTextComponent, VlTitleComponent]);

export const pageStyles = [
    vlResetStyles,
    ...vlLayoutStyles,
    css`
        :host {
            display: block;
        }

        section + section {
            margin-top: 3rem;
        }

        /* Een codeblok scrolt opzij; met tabindex="0" bereik je het ook met het toetsenbord. Het blok heeft de letter
           van de tekst, zodat een breedte in ch dezelfde is als die van de tekst; de code erin staat in een
           code-element, met de letter van code. */
        pre.code {
            background: var(--vl-color--background-subtle, #f3f5f6);
            border: 1px solid var(--vl-color--border-default, #cbd2da);
            padding: 1rem;
            overflow-x: auto;
            white-space: pre;
            font-family: inherit;
            line-height: 1.35;
        }

        ul.list {
            list-style: disc;
            padding-left: 2rem;
        }

        ol.list {
            list-style: decimal;
            padding-left: 2rem;
        }

        /* De reset van Flux geeft code het lettertype van de tekst: een naam uit de code valt dan niet op. */
        code {
            font-family: monospace;
            font-size: 0.9em;
        }

        .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
        }
    `,
];

// De pagina's die je leest: een kop met het icoon uit het menu, de eerste alinea iets groter, delen met ruimte
// ertussen, en tekst op leesbreedte.
export const readingStyles = css`
    /* Twee breedtes: lopende tekst, stappen en codeblokken op leesbreedte, 76ch in de gewone letter; tabellen, rijen
       van punten en kaders over de volle breedte. ch is de breedte van een 0, en een teken in Flanders Art Sans is
       gemiddeld smaller: 76ch geeft zo'n 95 tekens per regel. vl-text is inline: als blok krijgt hij een breedte.

       Lopende tekst eindigt op één lijn: wat inspringt, zoals een lijst, wordt smaller in plaats van verder door te
       lopen. Een lijst telt daarom haar opsommingstekens mee. */
    vl-text {
        display: block;
        max-width: 76ch;
    }

    .list {
        box-sizing: border-box;
        max-width: 76ch;
    }

    /* De eerste alinea: waar de pagina over gaat, iets groter, maar even breed als de tekst eronder. ch groeit mee
       met de letter: 76ch in de gewone letter van 1,8rem is 68,4ch in deze van 2rem. */
    .lead {
        font-size: 2rem;
        line-height: 1.5;
        max-width: calc(76ch * 1.8 / 2);
    }

    /* De kop als één geheel: het icoon, ernaast zo nodig waar je bent, klein en gedempt, en de titel, groot. Een
       lijn eronder. */
    .page-header {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-bottom: 4rem;
        padding-bottom: 2.4rem;
        border-bottom: 1px solid var(--vl-color--border-default, #cbd2da);
    }

    vl-title.context::part(h1) {
        color: var(--vl-color--text-subtle, #687483);
    }

    /* De delen van een pagina, met meer ruimte ertussen dan binnen een deel. */
    .part {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .part + .part {
        margin-top: 5rem;
    }

    /* Een rond icoon, in de blauwe kleur van de links en de iconen in het menu. */
    .badge {
        flex: none;
        display: grid;
        place-items: center;
        width: 4.4rem;
        height: 4.4rem;
        border-radius: 50%;
        background: var(--vl-color--action-100, #e6eefa);
        color: var(--vl-color--action, #0055cc);
    }

    /* Het icoon van de pagina zelf: groter en vol blauw, zodat het niet leest als een van de punten. */
    .badge--large {
        width: 6.4rem;
        height: 6.4rem;
        font-size: 2.6rem;
        background: var(--vl-color--action, #0055cc);
        color: var(--vl-color--text-on-action, #fff);
    }
`;

// De kop van een pagina: het icoon uit het menu in een blauwe badge, en de titel. Met een context staat die klein als
// h1, en de titel groot als h2; de delen van de pagina zijn dan h3.
export function pageHeader(icon: string, title: string, context?: string) {
    return html`
        <header class="page-header">
            <span class="badge badge--large"><vl-icon icon=${icon}></vl-icon></span>
            ${context
                ? html`<div>
                      <vl-title class="context" type="h1" appearance="h5" no-space-bottom>${context}</vl-title>
                      <vl-title type="h2" appearance="h1" no-space-bottom>${title}</vl-title>
                  </div>`
                : html`<vl-title type="h1" no-space-bottom>${title}</vl-title>`}
        </header>
    `;
}
