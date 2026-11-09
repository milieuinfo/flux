// Een pad dat het portaal niet kent: GitHub Pages geeft dan 404.html, met dezelfde app. De pagina zegt het, met de kop
// van de andere pagina's, en leidt naar de startpagina.
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { href } from '../router';
import { pageHeader, pageStyles, readingStyles } from './page';

@customElement('flux-not-found-page')
export class NotFoundPage extends LitElement {
    static styles = [...pageStyles, readingStyles];

    render() {
        return html`
            ${pageHeader('alert-circle', 'Deze pagina bestaat niet')}
            <section class="part">
                <vl-text class="lead">De link is verouderd, of er staat een fout in het adres.</vl-text>
                <vl-text>Op de <vl-link href=${href('/')}>startpagina</vl-link> vind je alles van Team Flux.</vl-text>
            </section>
        `;
    }
}
