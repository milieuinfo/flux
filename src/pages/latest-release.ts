// De nieuwste release van Flux, prominent op de startpagina: de versie groot, de datum, en de links naar de release en
// naar alle releases op GitHub. De versie is de hoogste release van flux-web-components (release.ts), niet de versie
// waarmee het portaal gebouwd is: die staat onderaan de startpagina.
//
// Zolang de release laadt, houdt het blok zijn plaats, zodat de pagina niet verspringt; een schermlezer hoort de
// versie pas als ze er is (aria-busy). Lukt het niet, dan zegt het blok dat, met de link naar alle releases.
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { RELEASES_URL } from '../links';
import { latestRelease, Release } from '../release';
import { pageStyles } from './page';

const DATE = new Intl.DateTimeFormat('nl-BE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

@customElement('flux-latest-release')
export class LatestRelease extends LitElement {
    static styles = [
        ...pageStyles,
        css`
            /* Een blauwe lijn links, in de kleur van de links, houdt het blok bij elkaar. */
            :host {
                display: block;
                padding-left: 2.4rem;
                border-left: 0.4rem solid var(--vl-color--action, #0055cc);
            }

            .label {
                margin: 0;
                font-size: 1.4rem;
                font-weight: 500;
                letter-spacing: 0.06em;
                text-transform: uppercase;
                color: var(--vl-color--grey-800);
            }

            /* De versie zo groot als de initiaal van de inleiding ernaast. */
            .version {
                display: block;
                margin: 0.6rem 0 0.4rem;
                min-height: 1em;
                font-size: 5rem;
                font-weight: 600;
                line-height: 1;
                letter-spacing: -0.02em;
                color: var(--vl-color--grey-900);
            }

            .date {
                min-height: 1.5em;
                margin: 0 0 1rem;
                color: var(--vl-color--grey-800);
            }

            .failed {
                margin: 0.6rem 0 1rem;
            }
        `,
    ];

    // undefined zolang de release laadt, null als ze niet te vinden is.
    @state() private release: Release | null | undefined;

    connectedCallback(): void {
        super.connectedCallback();
        if (this.release === undefined) this.load();
    }

    private async load() {
        try {
            this.release = await latestRelease();
        } catch {
            this.release = null;
        }
    }

    render() {
        const release = this.release;
        return html`
            <section aria-labelledby="label" aria-busy=${release === undefined ? 'true' : 'false'}>
                <h2 id="label" class="label">Nieuwste release van Flux</h2>
                ${release === null
                    ? html`<p class="failed">De nieuwste release is nu niet op te halen bij GitHub.</p>
                          <vl-link href=${RELEASES_URL} external>Alle releases</vl-link>`
                    : html`<span class="version">${release?.version ?? ''}</span>
                          <p class="date">
                              ${release ? html`<time datetime=${release.date}>${this.date(release)}</time>` : ''}
                          </p>
                          <div class="vl-group vl-group--wrap vl-group--separator-row">
                              ${release ? html`<vl-link href=${release.url} external>Release notes</vl-link>` : ''}
                              <vl-link href=${RELEASES_URL} external>Alle releases</vl-link>
                          </div>`}
            </section>
        `;
    }

    private date(release: Release): string {
        return DATE.format(new Date(release.date));
    }
}
