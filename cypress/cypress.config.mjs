// Cypress, zoals in de flux-starter-app en de gateway van flux-mcp: componenttests naast de pagina's (src/**/*.cy.ts),
// met cypress-axe voor de toegankelijkheid.
//
//   pnpm run ct-ci     de componenttests, ook in publish:pages
//   pnpm run ct        interactief
import { createRequire } from 'node:module';
import { defineConfig } from 'cypress';

const { rules } = createRequire(import.meta.url)('../webpack.config.cjs');

export default defineConfig({
    video: false,
    // Flux zet zijn invoervelden en knoppen in een shadow root: de tests zoeken erdoorheen.
    includeShadowDom: true,
    component: {
        indexHtmlFile: 'cypress/support/component-index.html',
        supportFile: 'cypress/support/component.ts',
        specPattern: 'src/**/*.cy.ts',
        devServer: {
            bundler: 'webpack',
            webpackConfig: { mode: 'development', module: { rules }, resolve: { extensions: ['.ts', '.js'] } },
        },
    },
});
