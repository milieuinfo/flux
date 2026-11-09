// De componenttests: cy.mount zet een sjabloon van Lit op de pagina, zoals in de flux-starter-app, en cypress-axe
// controleert de toegankelijkheid.
//
// Geen test vraagt de releases aan GitHub: de API laat zonder aanmelden 60 vragen per uur toe, en een test hangt dan af
// van wat er net uitkwam. Elke test krijgt dezelfde releases (RELEASES), zonder wat de browser van een vorige test
// onthield; een test die iets anders wil, zet zijn eigen cy.intercept, die voorgaat.
import { getContainerEl } from '@cypress/mount-utils';
import 'cypress-axe';
import { render, TemplateResult } from 'lit';
import { CACHE_KEY, GitHubRelease } from '../../src/release';

export { accessible } from './a11y';

// De releases van flux-web-components zoals de API van GitHub ze geeft: 1.51.0 verscheen na 2.21.0, en 2.23.0 is
// een pre-release. De nieuwste is 2.22.0.
export const RELEASES: GitHubRelease[] = [
    ['v2.23.0-rc.1', '2026-11-05T09:00:00Z', true],
    ['v2.22.0', '2026-10-30T12:25:37Z', false],
    ['v1.51.0', '2026-10-20T08:00:00Z', false],
    ['v2.21.0', '2026-10-09T13:01:49Z', false],
].map(([tag, date, prerelease]) => ({
    tag_name: tag as string,
    html_url: `https://github.com/milieuinfo/flux-web-components/releases/tag/${tag}`,
    published_at: date as string,
    draft: false,
    prerelease: prerelease as boolean,
}));

// De vraag naar de releases, ongeacht de query.
export const RELEASES_REQUEST = {
    method: 'GET',
    hostname: 'api.github.com',
    pathname: '/repos/milieuinfo/flux-web-components/releases',
};

beforeEach(() => {
    cy.window().then((win) => win.localStorage.removeItem(CACHE_KEY));
    cy.intercept(RELEASES_REQUEST, RELEASES).as('releases');
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            mount(template: TemplateResult): Chainable<JQuery<HTMLElement>>;
        }
    }
}

Cypress.Commands.add('mount', (template: TemplateResult) => {
    // Een nieuwe container per test: render van Lit onthoudt wat het in een container zette.
    const container = document.createElement('div');
    getContainerEl().replaceChildren(container);
    render(template, container);
    return cy.wrap(container).children().first();
});
