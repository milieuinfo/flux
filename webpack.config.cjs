// Bouwt het portaal, zoals de app van de gateway van flux-mcp en de flux-starter-app: TypeScript met SWC, en per pagina
// een index.html met de bundel. De namen van de bundel en van een afbeelding dragen een hash, zodat een nieuwe versie
// nooit uit een cache komt. De regel voor ?raw komt uit de gids "Aan de slag" van Flux: de packages importeren hun css
// als tekst.
//
//   pnpm run build                         in dist/, voor de root van een site: /
//   pnpm run build --env base=/flux/       voor GitHub Pages, onder /flux/, zoals publish:pages
//   pnpm start                             lokaal op http://localhost:8080, en opnieuw bij elke wijziging
//
// GitHub Pages kent geen routes: een pad zonder bestand geeft 404.html. Daarom krijgt elke pagina uit src/pages.json
// haar eigen index.html, zodat een diepe link of een herlaadbeurt werkt, en geeft 404.html dezelfde app, die zegt dat
// de pagina niet bestaat.
const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PAGES = require('./src/pages.json');

// De transformatie van SWC, ook voor de componenttests van Cypress: de decorators van Lit, zoals in de starter.
const typescript = {
    test: /\.ts$/,
    exclude: /node_modules/,
    loader: 'swc-loader',
    options: {
        jsc: {
            target: 'es2022',
            parser: { syntax: 'typescript', decorators: true },
            transform: { legacyDecorator: true, decoratorMetadata: false, useDefineForClassFields: false },
        },
        module: { type: 'es6' },
    },
};

const rules = [
    typescript,
    { test: /\.css$/i, resourceQuery: /raw/, type: 'asset/source' },
    { test: /\.(png|svg)$/i, type: 'asset/resource' },
];

// De basis van de site eindigt op een /, ook als ze zonder werd meegegeven.
const basePath = (base) => (base ?? '/').replace(/\/?$/, '/');

// Het bestand van een pagina: / wordt index.html, /teams wordt teams/index.html.
const pageFile = (page) => path.posix.join(page.slice(1), 'index.html');

module.exports = (env, argv) => {
    const base = basePath(env?.base);
    // Het icoon in de tab: de φ van Flux, als favicon.svg, met een link in elke pagina.
    const html = (filename) =>
        new HtmlWebpackPlugin({ template: 'src/index.html', filename, base, favicon: 'src/assets/favicon.svg' });
    return {
        mode: argv?.mode ?? 'production',
        devtool: argv?.mode === 'development' ? 'eval-source-map' : false,
        entry: { index: './src/index.ts' },
        module: {
            // Een import die niet bestaat, is een fout, geen waarschuwing.
            parser: { javascript: { exportsPresence: 'error' } },
            rules,
        },
        resolve: { extensions: ['.ts', '.js'] },
        output: {
            clean: true,
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: base,
        },
        optimization: {
            splitChunks: { chunks: 'all' },
            minimizer: [new TerserPlugin({ extractComments: false })],
        },
        performance: { hints: false },
        plugins: [...PAGES.map((page) => html(pageFile(page))), html('404.html')],
        devServer: { historyApiFallback: true, port: 8080 },
    };
};

module.exports.rules = rules;
