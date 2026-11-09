// De toegankelijkheid van een element met axe-core, voor de componenttests en de tests van begin tot einde: bij een
// fout zegt de melding welke regel en waar.
const target = (node: { target: unknown[] }) => node.target.flat().join(' ');

export function accessible(selector: string): void {
    cy.injectAxe({ axeCorePath: 'node_modules/axe-core/axe.min.js' });
    cy.checkA11y(
        selector,
        undefined,
        (violations) => {
            const found = violations.map((v) => `${v.id}: ${v.nodes.map(target).join(', ')}`);
            expect(found, 'toegankelijkheid').to.deep.equal([]);
        },
        true,
    );
}
