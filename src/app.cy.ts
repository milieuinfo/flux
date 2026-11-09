import { html } from 'lit';
import { accessible } from '../cypress/support/component';
import './app';
import { appPath, href } from './router';

// Het portaal als geheel: de layout van het dashboard, het menu, en een pad dat het portaal niet kent. De test draait
// in de iframe van Cypress, zonder <base>: de basis is er /. Elke test zet de url van de pagina die hij opent, en zet
// daarna die van Cypress terug.
describe('Het portaal', () => {
    let cypressUrl = '';

    beforeEach(() => {
        cy.viewport(1280, 800);
        cy.location('href').then((url) => (cypressUrl = url));
    });

    afterEach(() => {
        cy.window().then((win) => win.history.replaceState(null, '', cypressUrl));
    });

    it('toont de startpagina, met Team Flux bovenaan het menu en Start actief', () => {
        cy.window().then((win) => win.history.replaceState(null, '', href('/')));
        cy.mount(html`<flux-app></flux-app>`);
        cy.get('vl-dashboard').shadow().find('user-name').should('have.text', 'Team Flux');
        cy.get('vl-nav-link[active]').should('contain', 'Start').and('have.attr', 'href', href('/'));
        cy.get('flux-home-page').should('exist');
        cy.document().its('title').should('equal', 'Flux');
        accessible('flux-app');
    });

    it('zegt dat een onbekende pagina niet bestaat, en leidt naar de start', () => {
        cy.window().then((win) => win.history.replaceState(null, '', href('/onbekend')));
        cy.mount(html`<flux-app></flux-app>`);
        cy.get('flux-not-found-page').find('vl-title').should('contain', 'Deze pagina bestaat niet');
        cy.get('vl-nav-link[active]').should('not.exist');
        cy.document().its('title').should('equal', 'Niet gevonden · Flux');
        accessible('flux-app');
        // Een interne link opent de pagina zonder herladen. Met click() van de browser: de klik van Cypress verlaat de
        // shadow root van vl-link niet, en de app luistert op het document.
        cy.get('flux-not-found-page')
            .find('vl-link')
            .shadow()
            .find('a')
            .then((link) => link[0].click());
        cy.get('flux-home-page').should('exist');
        cy.location('pathname').then((pathname) => expect(appPath(pathname)).to.equal('/'));
    });
});
