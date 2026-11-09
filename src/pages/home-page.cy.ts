import { html } from 'lit';
import { accessible } from '../../cypress/support/component';
import { FIGMA_URL, FLUX_AI_URL, GITHUB_URL, STORYBOOK_URL } from '../links';
import { href } from '../router';
import './home-page';

describe('De startpagina', () => {
    it('toont wat Team Flux maakt, met de banner, de inleiding en drie tegels op een rij', () => {
        cy.viewport(1280, 800);
        cy.mount(html`<flux-home-page></flux-home-page>`);
        // vl-content-header toont een kopie van het beeld en de links, in zijn shadow root.
        cy.get('vl-content-header')
            .shadow()
            .find('picture img')
            .should('have.attr', 'alt', '')
            .and(($img) => {
                expect(($img[0] as HTMLImageElement).naturalWidth, 'de banner laadt').to.be.greaterThan(0);
            });
        cy.get('vl-content-header').shadow().find('h2').should('contain', 'Frontend Library en User eXperience');
        cy.get('vl-content-header a[slot=title-link]').should('have.attr', 'href', href('/'));
        // Het dashboard toont op de startpagina geen titel; de pagina heeft er een voor een schermlezer.
        cy.get('h1').should('have.text', 'Flux');
        cy.get('.intro vl-paragraph[introduction]').should('contain', 'Flux is de frontend library');
        cy.get('.intro').contains('vl-link', 'wegwijzer').should('have.attr', 'href', href('/wegwijzer'));
        // Prominent naast de inleiding, boven de derde tegel: de nieuwste release, uit RELEASES in
        // cypress/support/component.ts.
        cy.get('flux-latest-release').find('.version').should('have.text', '2.22.0');
        cy.get('flux-latest-release').then((release) => {
            cy.get('.intro').then((intro) => {
                cy.get('vl-info-tile-next').then((tiles) => {
                    const box = release[0].getBoundingClientRect();
                    expect(box.top, 'naast de inleiding').to.be.closeTo(intro[0].getBoundingClientRect().top, 1);
                    expect(box.left, 'boven de derde tegel').to.be.closeTo(tiles[2].getBoundingClientRect().left, 1);
                    expect(box.bottom, 'boven de tegels').to.be.lessThan(tiles[0].getBoundingClientRect().top);
                });
            });
        });
        cy.get('vl-info-tile-next').should('have.length', 3).first().should('contain', 'Web componenten');
        // Bovenaan de inleiding, smaller dan de drie tegels samen, en daaronder de tegels op een rij.
        cy.get('.intro').then((intro) => {
            cy.get('vl-info-tile-next').then((tiles) => {
                const text = intro[0].getBoundingClientRect();
                const [first, second, third] = [...tiles].map((tile) => tile.getBoundingClientRect());
                expect(first.top, 'onder de inleiding').to.be.greaterThan(text.bottom);
                expect(second.top, 'op een rij').to.equal(first.top);
                expect(third.top, 'op een rij').to.equal(first.top);
                expect(text.left, 'in lijn met de tegels').to.be.closeTo(first.left, 1);
                expect(text.width, 'smaller dan de tegels samen').to.be.lessThan(third.right - first.left);
            });
        });
        // De tekst en de links in de tegels staan op dezelfde hoogte, ook als de tekst in een tegel korter is.
        cy.get('vl-info-tile-next').then((tiles) => {
            const top = (tile: Element, selector: string) => tile.querySelector(selector)!.getBoundingClientRect().top;
            const [first, ...others] = [...tiles];
            for (const tile of others) {
                expect(top(tile, 'vl-text'), 'de tekst').to.equal(top(first, 'vl-text'));
                expect(top(tile, '[slot=footer]'), 'de links').to.equal(top(first, '[slot=footer]'));
            }
        });
        // Een link buiten het portaal opent in een nieuw tabblad, met het icoon en de melding van vl-link.
        cy.contains('vl-info-tile-next', 'Web componenten').within(() => {
            cy.contains('vl-link', 'Storybook').should('have.attr', 'href', STORYBOOK_URL).and('have.attr', 'external');
            cy.contains('vl-link', 'GitHub').should('have.attr', 'href', GITHUB_URL);
        });
        cy.contains('vl-info-tile-next', 'Ontwerp').find('vl-link').should('have.attr', 'href', FIGMA_URL);
        cy.contains('vl-info-tile-next', 'Flux-AI').find('vl-link').should('have.attr', 'href', FLUX_AI_URL);
        // Onderaan de bronnen, elk in een nieuw tabblad; de naam staat er voor een schermlezer.
        cy.get('nav.sources a').should('have.length', 3);
        cy.get('nav.sources a').each((link) => {
            expect(link, 'nieuw tabblad').to.have.attr('target', '_blank');
            expect(link.attr('rel'), 'zonder toegang tot deze pagina').to.contain('noopener');
        });
        cy.contains('nav.sources a', 'flux-web-components op GitHub').should('have.attr', 'href', GITHUB_URL);
        // Daaronder de versie van Flux waarmee het portaal gebouwd is, uit package.json.
        cy.get('footer .built')
            .invoke('text')
            .should('match', /^Gebouwd met Flux \d+\.\d+\.\d+$/);
        // Tegen de onderkant van de pagina, die minstens zo hoog is als het venster.
        cy.get('flux-home-page').then((host) => {
            cy.get('footer.foot').then((foot) => {
                const page = host[0].getBoundingClientRect();
                expect(page.height, 'zo hoog als het venster').to.be.at.least(Cypress.config('viewportHeight'));
                expect(foot[0].getBoundingClientRect().bottom, 'onderaan').to.be.closeTo(page.bottom, 1);
            });
        });
        accessible('flux-home-page');
    });

    it('zet de tegels op een gsm onder elkaar, binnen de breedte van het scherm', () => {
        cy.viewport(390, 844);
        cy.mount(html`<flux-home-page></flux-home-page>`);
        // De nieuwste release onder de inleiding, boven de tegels.
        cy.get('flux-latest-release').then((release) => {
            cy.get('.intro').then((intro) => {
                cy.get('vl-info-tile-next').then((tiles) => {
                    const box = release[0].getBoundingClientRect();
                    expect(box.top, 'onder de inleiding').to.be.greaterThan(intro[0].getBoundingClientRect().bottom);
                    expect(box.bottom, 'boven de tegels').to.be.lessThan(tiles[0].getBoundingClientRect().top);
                });
            });
        });
        cy.get('vl-info-tile-next').then((tiles) => {
            const [first, second, third] = [...tiles].map((tile) => tile.getBoundingClientRect());
            expect(second.top, 'onder elkaar').to.be.greaterThan(first.bottom);
            expect(third.top, 'onder elkaar').to.be.greaterThan(second.bottom);
            for (const tile of [first, second, third]) {
                expect(tile.right, 'binnen het scherm').to.be.at.most(390);
            }
        });
        cy.document().its('documentElement.scrollWidth').should('be.at.most', 390);
    });
});
