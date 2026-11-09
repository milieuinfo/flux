// De routes van het portaal. Een interne link verandert de url zonder de pagina te herladen. Elke pagina heeft een
// eigen index.html (src/pages.json, webpack.config.cjs), zodat ook een diepe link of een herlaadbeurt werkt.
//
// Het portaal staat op GitHub Pages onder een basis, /flux/, en lokaal onder /. De basis staat in <base href> van de
// pagina; de routes hier zijn paden binnen het portaal, zoals /, en href() maakt er een url van onder de basis.
import type { VlIcon } from '@domg-wc/components/atom/icon/vl-icon-list';
import PAGES from './pages.json';

export type Page = 'home' | 'wegwijzer' | 'unknown';

export interface Route {
    page: Page;
    title: string;
}

// De pagina's, in deze volgorde in het menu, met hun icoon in het menu en in de kop van de pagina. Een nieuwe pagina
// komt ook in src/pages.json, voor haar index.html; router.spec.ts kijkt na dat beide lijsten dezelfde pagina's noemen.
export const NAVIGATION: [path: string, title: string, icon: VlIcon][] = [
    ['/', 'Start', 'places-home'],
    ['/wegwijzer', 'Wegwijzer', 'direction-sign'],
];

const ROUTES: Record<string, Route> = {
    '/': { page: 'home', title: 'Start' },
    '/wegwijzer': { page: 'wegwijzer', title: 'Wegwijzer' },
};

const UNKNOWN: Route = { page: 'unknown', title: 'Niet gevonden' };

// De paden die een eigen index.html krijgen.
export const BUILT_PAGES: string[] = PAGES;

export function routes(): string[] {
    return Object.keys(ROUTES);
}

// De basis van de site, uit <base href>: /flux/ op GitHub Pages, / lokaal. Zonder <base>, zoals in de componenttests
// van Cypress, is ze /.
export function basePath(): string {
    return document.querySelector('base') ? new URL(document.baseURI).pathname : '/';
}

// Het pad binnen het portaal van een pad in de browser, of null als het buiten het portaal valt.
export function appPath(pathname: string, base = basePath()): string | null {
    if (`${pathname}/` === base) return '/';
    if (!pathname.startsWith(base)) return null;
    return `/${pathname.slice(base.length)}`;
}

// De url van een pagina van het portaal, onder de basis; een anker of query blijft.
export function href(path: string, base = basePath()): string {
    return base + path.replace(/^\//, '');
}

// De route van een pad binnen het portaal; een / op het einde telt niet.
export function resolve(path: string): Route {
    const clean = path.length > 1 ? path.replace(/\/+$/, '') : path;
    return ROUTES[clean] ?? UNKNOWN;
}

// De titel van het tabblad: de naam van de pagina en Flux, de startpagina enkel Flux. Zo onderscheidt ook de
// geschiedenis, een bladwijzer en een schermlezer ze (WCAG 2.4.2).
export function documentTitle(route: Route): string {
    return route.page === 'home' ? 'Flux' : `${route.title} · Flux`;
}

export const NAVIGATE = 'flux-navigate';

// Naar een andere pagina van het portaal, zonder te herladen. Een url buiten het portaal laadt een nieuwe pagina. Het
// anker blijft.
export function navigate(target: string): void {
    const url = new URL(target, document.baseURI);
    const path = url.origin === location.origin ? appPath(url.pathname) : null;
    if (path === null || resolve(path) === UNKNOWN) {
        location.assign(url.href);
        return;
    }
    history.pushState(null, '', url.pathname + url.search + url.hash);
    window.dispatchEvent(new Event(NAVIGATE));
}

// Het pad van een klik op een interne link van het portaal, of null. De link mag in een shadow root staan, zoals de <a>
// van een vl-button met cta-link. Een anker op dezelfde pagina laat het portaal aan de browser.
export function internalLink(event: MouseEvent): string | null {
    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
    ) {
        return null;
    }
    const anchor = event
        .composedPath()
        .find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement && node.hasAttribute('href'));
    if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return null;
    const url = new URL(anchor.href, document.baseURI);
    const path = url.origin === location.origin ? appPath(url.pathname) : null;
    if (path === null || resolve(path) === UNKNOWN) return null;
    if (url.hash && url.pathname === location.pathname && url.search === location.search) return null;
    return url.pathname + url.search + url.hash;
}
