// Het portaal van Team Flux: de layout van een dashboard uit de flux-starter-app, zoals de app van de gateway van
// flux-mcp, met in de navigatie de pagina's van het portaal. De pagina hoort bij de url; een interne link wisselt de
// pagina zonder herladen (router.ts).
//
// Bovenaan de navigatie staat Team Flux met de φ van Flux, op de plaats waar een toepassing de gebruiker toont: het
// portaal kent geen aanmelden. Header en footer van Vlaanderen ontbreken, zoals in de gateway: die vragen een id van
// ACM/IDM.
import { registerWebComponents } from '@domg-wc/common';
import { VlTextComponent } from '@domg-wc/components/atom';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import logo from './assets/favicon.svg';
import { VlDashboardComponent } from './layout/vl-dashboard.component';
import { VlNavLinkComponent } from './layout/vl-nav-link.component';
import { VlNavSubComponent } from './layout/vl-nav-sub.component';
import './pages/home-page';
import './pages/not-found-page';
import { appPath, documentTitle, href, internalLink, NAVIGATE, navigate, NAVIGATION, resolve, Route } from './router';

@customElement('flux-app')
export class FluxApp extends LitElement {
    static {
        registerWebComponents([VlDashboardComponent, VlNavLinkComponent, VlNavSubComponent, VlTextComponent]);
    }

    // Het pad binnen het portaal; null buiten de basis, wat enkel kan als de basis van de build niet klopt.
    @state() private path: string | null = '/';
    @state() private navCollapsed = false;

    // Zonder shadow root, zoals de app van de starter: de inhoud gaat in de slots van vl-dashboard.
    protected createRenderRoot(): HTMLElement {
        return this;
    }

    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('popstate', this.onRoute);
        window.addEventListener(NAVIGATE, this.onRoute);
        document.addEventListener('click', this.onClick);
        this.addEventListener('vl-toggle-navigation', this.onToggleNavigation);
        this.onRoute();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        window.removeEventListener('popstate', this.onRoute);
        window.removeEventListener(NAVIGATE, this.onRoute);
        document.removeEventListener('click', this.onClick);
    }

    firstUpdated(): void {
        // Zonder header en footer van Vlaanderen: de navigatie en de inhoud nemen de hele hoogte.
        this.style.setProperty('--vl-dashboard-header-height', '0px');
        this.style.setProperty('--vl-dashboard-footer-height', '0px');
        this.style.setProperty('--vl-header-height', '0px');
        this.style.setProperty('--vl-dashboard-navigation-width', '28rem');
    }

    // Een andere pagina begint bovenaan, zoals na een klik op een gewone link; een anker blijft waar het is.
    private readonly onRoute = () => {
        const path = appPath(location.pathname);
        const otherPage = path !== this.path && !location.hash;
        this.path = path;
        if (otherPage) {
            this.updateComplete.then(() => this.querySelector<VlDashboardComponent>('vl-dashboard')?.scrollToTop());
        }
        document.title = documentTitle(this.route());
    };

    // Een interne link opent de pagina in het portaal, zonder herladen.
    private readonly onClick = (event: MouseEvent) => {
        const path = internalLink(event);
        if (!path) return;
        event.preventDefault();
        navigate(path);
    };

    private readonly onToggleNavigation = (event: Event) => {
        this.navCollapsed = (event as CustomEvent<{ collapsed: boolean }>).detail.collapsed;
    };

    private route(): Route {
        return resolve(this.path ?? '/onbekend');
    }

    render() {
        const route = this.route();
        // De startpagina heeft geen titel en geen padding: de banner neemt de volle hoogte en breedte (home-page.ts).
        // De andere pagina's zetten hun titel zelf, in een kop met het icoon uit het menu (pageHeader in
        // pages/page.ts).
        const home = route.page === 'home';
        return html`
            <vl-dashboard
                user-name="Team Flux"
                user-img=${logo}
                content-padding=${home ? '0' : '30px'}
                content-max-width=${home ? '100%' : '1280px'}
            >
                ${NAVIGATION.map(
                    ([path, title, icon]) =>
                        html`<vl-nav-link
                            slot="nav-main"
                            ?collapsed=${this.navCollapsed}
                            href=${href(path)}
                            icon=${icon}
                            ?active=${this.path === path}
                        >
                            ${title}
                        </vl-nav-link>`,
                )}
                <div slot="content">${this.page(route)}</div>
            </vl-dashboard>
        `;
    }

    private page(route: Route) {
        switch (route.page) {
            case 'home':
                return html`<flux-home-page></flux-home-page>`;
            default:
                return html`<flux-not-found-page></flux-not-found-page>`;
        }
    }
}
