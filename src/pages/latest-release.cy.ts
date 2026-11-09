import { html } from 'lit';
import { accessible, RELEASES_REQUEST } from '../../cypress/support/component';
import { RELEASES_URL } from '../links';
import { CACHE_KEY } from '../release';
import './latest-release';

// De releases komen niet van GitHub, maar uit RELEASES in cypress/support/component.ts.
describe('De nieuwste release', () => {
    it('toont de hoogste versie, met haar datum en de links naar GitHub', () => {
        cy.mount(html`<flux-latest-release></flux-latest-release>`);
        cy.wait('@releases');
        cy.get('flux-latest-release').find('h2').should('have.text', 'Nieuwste release van Flux');
        // Niet 1.51.0, de laatst gepubliceerde, en niet 2.23.0-rc.1, een pre-release.
        cy.get('flux-latest-release').find('.version').should('have.text', '2.22.0');
        cy.get('flux-latest-release').find('section').should('have.attr', 'aria-busy', 'false');
        cy.get('flux-latest-release')
            .find('time')
            .should('have.text', '30 oktober 2026')
            .and('have.attr', 'datetime', '2026-10-30T12:25:37Z');
        cy.get('flux-latest-release')
            .contains('vl-link', 'Release notes')
            .should('have.attr', 'href', `${RELEASES_URL}/tag/v2.22.0`)
            .and('have.attr', 'external');
        cy.get('flux-latest-release').contains('vl-link', 'Alle releases').should('have.attr', 'href', RELEASES_URL);
        accessible('flux-latest-release');
    });

    it('houdt zijn plaats zolang de release laadt', () => {
        cy.intercept(RELEASES_REQUEST, (request) => request.reply({ delay: 500, body: [] }));
        cy.mount(html`<flux-latest-release></flux-latest-release>`);
        cy.get('flux-latest-release').find('section').should('have.attr', 'aria-busy', 'true');
        cy.get('flux-latest-release')
            .find('.version')
            .should('have.text', '')
            .invoke('outerHeight')
            .should('be.greaterThan', 40);
    });

    it('onthoudt de release, en vraagt ze binnen het uur niet opnieuw', () => {
        cy.mount(html`<flux-latest-release></flux-latest-release>`);
        cy.wait('@releases');
        cy.window().then((win) =>
            expect(JSON.parse(win.localStorage.getItem(CACHE_KEY)!).release.version).to.equal('2.22.0'),
        );
        cy.intercept(RELEASES_REQUEST, []).as('again');
        cy.mount(html`<flux-latest-release></flux-latest-release>`);
        cy.get('flux-latest-release').find('.version').should('have.text', '2.22.0');
        cy.get('@again.all').should('have.length', 0);
    });

    it('zegt het als GitHub niet antwoordt, met de link naar alle releases', () => {
        cy.intercept(RELEASES_REQUEST, { statusCode: 403, body: { message: 'API rate limit exceeded' } });
        cy.mount(html`<flux-latest-release></flux-latest-release>`);
        cy.get('flux-latest-release').find('.failed').should('contain', 'niet op te halen');
        cy.get('flux-latest-release').find('.version').should('not.exist');
        cy.get('flux-latest-release').contains('vl-link', 'Alle releases').should('have.attr', 'href', RELEASES_URL);
        accessible('flux-latest-release');
    });
});
