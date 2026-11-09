// Jest voor de unit tests (*.spec.ts), zoals in de flux-starter-app: TypeScript met SWC, als CommonJS, zodat Jest geen
// ESM-vlaggen nodig heeft. Componenten test Cypress.
export default {
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    transform: {
        '^.+\\.ts$': ['@swc/jest', { jsc: { parser: { syntax: 'typescript' } }, module: { type: 'commonjs' } }],
    },
};
