// De componenttests: cy.mount zet een sjabloon van Lit op de pagina, zoals in de flux-starter-app, en cypress-axe
// controleert de toegankelijkheid.
import { getContainerEl } from '@cypress/mount-utils';
import 'cypress-axe';
import { render, TemplateResult } from 'lit';

export { accessible } from './a11y';

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
