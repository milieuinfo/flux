import { html } from 'lit';
import { accessible } from '../../cypress/support/component';
import {
    CONFLUENCE_URL,
    DESIGN_SYSTEM_URL,
    DV_IDEA_URL,
    FLUX_MCP_URL,
    JIRA_URL,
    PROTOTYPE_URL,
    STORYBOOK_URL,
} from '../links';
import './wegwijzer-page';

describe('De wegwijzer', () => {
    it('zet alles van Team Flux op een rij, met bij elke link een korte uitleg', () => {
        cy.viewport(1280, 800);
        cy.mount(html`<flux-wegwijzer-page></flux-wegwijzer-page>`);
        cy.get('flux-wegwijzer-page').find('header vl-title').should('have.text', 'Wegwijzer');
        cy.get('flux-wegwijzer-page')
            .find('vl-title[type=h2]')
            .then((titles) => [...titles].map((title) => title.textContent?.trim()))
            .should('deep.equal', [
                'Documentatie en toepassingen',
                'Code op GitHub',
                'Code op GitLab',
                'Team Flux',
                'Digitaal Vlaanderen',
            ]);
        // Op GitHub de actieve repo's en de prototypes, elk met een eigen kop.
        cy.get('#github vl-title[type=h3]').should('have.length', 2).first().should('contain', 'Actief');
        cy.get('#github .points').first().find('.point').should('have.length', 5);
        cy.get('#github .points').last().find('.point').should('have.length', 2);
        cy.get('#gitlab .point').should('have.length', 6);
        // Elke link opent in een nieuw tabblad, met het icoon en de melding van vl-link, en heeft een uitleg.
        cy.get('flux-wegwijzer-page').find('.point').should('have.length', 20);
        cy.get('flux-wegwijzer-page')
            .find('.point')
            .each((point) => {
                expect(point.find('vl-link'), 'de link').to.have.attr('external');
                expect(point.find('vl-text').text().trim(), 'de uitleg').to.not.equal('');
            });
        const link = (name: string, part: string) =>
            cy.get(`#${part}`).contains('vl-link', new RegExp(`^\\s*${name}\\s*$`));
        link('Storybook', 'gebruiken').should('have.attr', 'href', STORYBOOK_URL);
        link('Flux-MCP', 'gebruiken').should('have.attr', 'href', FLUX_MCP_URL);
        link('Prototype VIZIER', 'gebruiken').should('have.attr', 'href', PROTOTYPE_URL);
        link('flux-web-components', 'github').should(
            'have.attr',
            'href',
            'https://github.com/milieuinfo/flux-web-components',
        );
        link('flux-proto-vizier', 'github').should(
            'have.attr',
            'href',
            'https://github.com/milieuinfo/flux-proto-vizier',
        );
        link('flux-starter-app', 'gitlab').should(
            'have.attr',
            'href',
            'https://git.omgeving.vlaanderen.be/git/flux/flux-starter-app',
        );
        link('flux-mcp-config', 'gitlab').should(
            'have.attr',
            'href',
            'https://git.omgeving.vlaanderen.be/git/cumulus/k8s/config/flux-mcp-config',
        );
        link('Jira', 'team').should('have.attr', 'href', JIRA_URL);
        link('Confluence', 'team').should('have.attr', 'href', CONFLUENCE_URL);
        link('Vlaanderen Design System', 'digitaal-vlaanderen').should('have.attr', 'href', DESIGN_SYSTEM_URL);
        link('Het idee bij Digitaal Vlaanderen', 'digitaal-vlaanderen').should('have.attr', 'href', DV_IDEA_URL);
        // Een privérepo en een link die een account vraagt, zeggen het naast hun naam.
        cy.get('#github .point')
            .filter(':has(.access)')
            .should('have.length', 3)
            .each((point) => {
                expect(point.find('.access').text().trim()).to.equal('privé');
            });
        cy.get('#gitlab .access').should('have.length', 6).first().should('have.text', 'aanmelden');
        cy.contains('#github .point', 'flux-web-components').find('.access').should('not.exist');
        // Drie punten naast elkaar.
        cy.get('#gitlab .point').then((points) => {
            const [first, second, third, fourth] = [...points].map((point) => point.getBoundingClientRect());
            expect(second.top, 'op een rij').to.equal(first.top);
            expect(third.top, 'op een rij').to.equal(first.top);
            expect(fourth.top, 'de volgende rij').to.be.greaterThan(first.bottom);
        });
        accessible('flux-wegwijzer-page');
    });

    it('zet de punten op een gsm onder elkaar, binnen de breedte van het scherm', () => {
        cy.viewport(390, 844);
        cy.mount(html`<flux-wegwijzer-page></flux-wegwijzer-page>`);
        cy.get('#gitlab .point').then((points) => {
            const [first, second] = [...points].map((point) => point.getBoundingClientRect());
            expect(second.top, 'onder elkaar').to.be.greaterThan(first.bottom);
        });
        cy.document().its('documentElement.scrollWidth').should('be.at.most', 390);
    });
});
