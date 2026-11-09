// Uit de flux-starter-app (src/component/vl-dashboard, commit c8e6686): de layout van een dashboard, met navigatie,
// zoals in de gateway van flux-mcp. Drie aanpassingen: content-padding en content-max-width volgen hun attribuut ook na
// de eerste render, zodat de startpagina zonder padding de volle breedte neemt en de andere pagina's niet; de inhoud
// staat in het midden, met links en rechts evenveel witruimte; en scrollToTop zet de inhoud bovenaan, voor een andere
// pagina in de app.
import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlIconComponent, VlTextComponent, VlTitleComponent } from '@domg-wc/components/atom';
import { vlAccessibilityStyles, vlLayoutStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, LitElement, PropertyValues } from 'lit';
import { when } from 'lit/directives/when.js';
import { customElement, property, state } from 'lit/decorators.js';
import { vlDashboardStyles } from './vl-dashboard.css';

/**
 * @slot header - Plaats hier het vl-header component.
 * @slot nav-main - Plaats hier de hoofd navigatie links. Gebruik hiervoor de vl-nav-link componenten.
 *     Gebruik ofwel iconen voor àlle knoppen, ofwel geen iconen.
 *     `href` wordt aangeraden voor navigatie.
 *     Een nav link kan een icon-only actie knop hebben:
 *         `<vl-button icon="plus-circle-filled" label="Mijn actie" ghost slot="link-action"></vl-button>`
 *     Een nav link kan een badge hebben:
 *         `<button-badge slot="link-badge">1</button-badge>`
 *     De navigation is altijd 100% hoog tussen header en footer, en kan ingeklapt worden tot ongeveer breedte van
 *     een icon-only knop met wat margin. Op mobile verdwijnt de navigation in een hamburger menu, waarbij de
 *     mobiele navigation het volledig scherm inneemt onder de header wanneer opengeklapt.
 * @slot nav-utils - Plaats hier de hulpnavigatie links. Gebruik hiervoor de vl-nav-link componenten.
 *     Deze navigatie is optioneel en wordt alleen getoond wanneer er content in staat. Gebruik dit voor "app settings",
 *     "shopping cart", "help", etc.
 * @slot content - Plaats hier de hoofd content van de pagina. Deze is altijd 100% hoog tussen header en footer,
 *     en 100% breed naast de navigation. De content kan optioneel een padding van 30px hebben, en een max-width van
 *     1280px, zodat de content niet container-vullend is. Deze opties zijn beschikbaar via de `content-padding` en
 *     `content-max-width` attributen.
 * @slot header-actions - Plaats hier acties die bij de pagina header horen, zoals knoppen en een zoekveld.
 * @slot footer - Plaats hier het vl-footer component.
 */
@customElement('vl-dashboard')
export class VlDashboardComponent extends LitElement {
    static {
        registerWebComponents([VlButtonComponent, VlTitleComponent, VlTextComponent, VlIconComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLayoutStyles, vlAccessibilityStyles, vlDashboardStyles];
    }

    @state() private hasNavUtils = false;

    /** True wanneer een nav-link (in nav-main of nav-utils) een badge bevat. */
    @state() private navHasBadge = false;

    private badgeObserver: MutationObserver | undefined = undefined;

    /**
     * @property user-name - De naam van de gebruiker, bedrijf of entiteit, wordt getoond in de header van de navigation.
     * Wanneer er ook een user-icon of user-img is, wordt deze naam als alt-tekst gebruikt.
     */
    @property({ type: String, attribute: 'user-name' })
    userName: string | undefined = undefined;

    /**
     * @property user-img - Een afbeelding die wordt getoond in de header van de navigation. Dit kan een avatar zijn van de
     * gebruiker, of een logo van een bedrijf of entiteit.
     */
    @property({ type: String, attribute: 'user-img' })
    userImg: string | undefined = undefined;

    /**
     * @property user-icon - Een icoon dat wordt getoond in de header van de navigation.
     * Wordt getoond wanneer er geen user-img is.
     */
    @property({ type: String, attribute: 'user-icon' })
    userIcon: string | undefined = undefined;

    /**
     * @property page-title - De titel van de pagina, wordt getoond in de header van de content naast het page-icon.
     */
    @property({ type: String, attribute: 'page-title' })
    pageTitle: string | undefined = undefined;

    /**
     * @property page-subtitle - Een ondertitel van de pagina, wordt getoond naast de page-title.
     */
    @property({ type: String, attribute: 'page-subtitle' })
    pageSubtitle: string | undefined = undefined;

    /**
     * @property page-icon - Een icoon dat wordt getoond in de header van de content, naast de page-title.
     */
    @property({ type: String, attribute: 'page-icon' })
    pageIcon: string | undefined = undefined;

    /**
     * @property content-padding - De padding van de content area, standaard 30px.
     * Deze padding is optioneel en kan worden aangepast of verwijderd via dit attribuut.
     */
    @property({ type: String, attribute: 'content-padding' })
    contentPadding = '30px';

    /**
     * @property content-max-width - De max-width van de content area, standaard 100%.
     * Deze is optioneel en kan worden aangepast via dit attribuut.
     */
    @property({ type: String, attribute: 'content-max-width' })
    contentMaxWidth = '100%';

    private readonly contentStyles = new CSSStyleSheet();

    private rightPanelTriggerElement: VlButtonComponent | HTMLButtonElement | null = null;

    private get openMobileNavigationButton(): VlButtonComponent | null | undefined {
        return this.shadowRoot?.querySelector<VlButtonComponent>('#open-mobile-navigation-button');
    }
    private get closeMobileNavigationButton(): VlButtonComponent | null | undefined {
        return this.shadowRoot?.querySelector<VlButtonComponent>('#close-mobile-navigation-button');
    }
    private get toggleNavigationButton(): VlButtonComponent | null | undefined {
        return this.shadowRoot?.querySelector<VlButtonComponent>('#toggle-navigation-button');
    }
    private get navigationContainer(): HTMLElement | null | undefined {
        return this.shadowRoot?.querySelector<HTMLElement>('.vl-dashboard__navigation');
    }
    private get rightPanel(): HTMLElement | null | undefined {
        return this.shadowRoot?.querySelector<HTMLElement>('#right-panel');
    }
    private get rightPanelCloseButton(): VlButtonComponent | null | undefined {
        return this.shadowRoot?.querySelector<VlButtonComponent>('#close-right-panel-button');
    }

    private readonly recomputeNavBadge = () => {
        // Badges (element met slot="link-badge") kunnen in nav-main of nav-utils zitten,
        // ook genest in een vl-nav-sub. Een descendant-selector dekt beide gevallen.
        this.navHasBadge = !!this.querySelector(
            '[slot="nav-main"] [slot="link-badge"], [slot="nav-utils"] [slot="link-badge"]',
        );
    };

    private readonly onNavUtilsSlotChange = (e: Event) => {
        const slotEl = e.currentTarget as HTMLSlotElement;
        const hasElements = slotEl.assignedElements({ flatten: true }).length > 0;
        const hasText = slotEl
            .assignedNodes({ flatten: true })
            .some((n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? '').trim().length > 0);
        this.hasNavUtils = hasElements || hasText;
    };

    private readonly onHeaderActionsSlotChange = (e: Event) => {
        const slotEl = e.currentTarget as HTMLSlotElement;
        const hasActions = slotEl.assignedElements({ flatten: true }).length > 0;
        const contentHeader = this.shadowRoot?.querySelector<HTMLElement>('.vl-dashboard__content-header');
        contentHeader?.classList.toggle('has-actions', hasActions);
    };

    private readonly onOpenMobileNavigation = () => {
        this.navigationContainer?.classList.add('vl-dashboard__navigation--mobile');
        this.closeMobileNavigationButton?.shadowRoot?.querySelector('button')?.focus();
    };

    private readonly onCloseMobileNavigation = () => {
        this.navigationContainer?.classList.remove('vl-dashboard__navigation--mobile');
        this.openMobileNavigationButton?.shadowRoot?.querySelector('button')?.focus();
    };

    private readonly onToggleNavigation = () => {
        this.navigationContainer?.classList.toggle('vl-dashboard__navigation--collapsed');
        const collapsed = this.navigationContainer?.classList.contains('vl-dashboard__navigation--collapsed');
        this.toggleNavigationButton?.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        const event = new CustomEvent('vl-toggle-navigation', {
            detail: {
                collapsed,
            },
            composed: true,
            bubbles: true,
        });
        this.dispatchEvent(event);
        globalThis.localStorage.setItem('vl-dashboard-navigation-collapsed', collapsed ? 'true' : 'false');
    };

    private readonly openRightPanel = (e: Event) => {
        const triggerElement = e.currentTarget as VlButtonComponent | HTMLButtonElement;
        triggerElement.setAttribute('aria-expanded', 'true');
        this.rightPanelTriggerElement = triggerElement;
        this.rightPanel?.removeAttribute('hidden');
        this.rightPanel?.querySelector<HTMLElement>('.vl-dashboard__right-panel-area')?.focus();
        this.rightPanel?.scrollIntoView(true);
    };

    private readonly closeRightPanel = () => {
        this.rightPanelTriggerElement?.setAttribute('aria-expanded', 'false');
        const triggerButton = (
            this.rightPanelTriggerElement instanceof VlButtonComponent
                ? this.rightPanelTriggerElement.shadowRoot?.querySelector('button')
                : this.rightPanelTriggerElement
        ) as HTMLButtonElement;
        triggerButton?.setAttribute('aria-expanded', 'false');
        triggerButton?.focus();
        this.rightPanelTriggerElement = null;
        this.rightPanel?.setAttribute('hidden', '');
    };

    /**
     * Naar boven in de inhoud, bv. na een andere pagina in de app: de inhoud scrolt in haar eigen vak, op een smal
     * scherm in het venster.
     */
    scrollToTop(): void {
        this.shadowRoot?.querySelector('.vl-dashboard__content-area')?.scrollTo({ top: 0 });
        window.scrollTo({ top: 0 });
    }

    /**
     * Registeert een trigger voor het rechter paneel.
     * Dit zorgt ervoor dat de trigger de `aria-controls` en `aria-expanded` attributen krijgt.
     * Dit zorgt ook voor het openen van het rechter paneel.
     * Deze register moet in de `disconnectedCallback` ongedaan gemaakt worden via `unregisterRightPanelTrigger`.
     * @param triggerElement VlButtonComponent | HTMLButtonElement
     */
    public registerRightPanelTrigger(triggerElement: VlButtonComponent | HTMLButtonElement) {
        triggerElement.setAttribute('aria-controls', 'right-panel');
        triggerElement.setAttribute('aria-expanded', 'false');
        triggerElement.addEventListener('click', this.openRightPanel);
    }

    /**
     * Deze unregister verwijdert de `click` event listener en de `aria-controls` en
     * `aria-expanded` attributen van de trigger.
     * @param triggerElement  VlButtonComponent | HTMLButtonElement
     */
    public unregisterRightPanelTrigger(triggerElement: VlButtonComponent | HTMLButtonElement) {
        triggerElement.removeEventListener('click', this.openRightPanel);
        triggerElement.removeAttribute('aria-controls');
        triggerElement.removeAttribute('aria-expanded');
    }

    connectedCallback(): void {
        super.connectedCallback();
        // Herbereken de badge-indicator wanneer nav-links of hun badges (dynamisch) wijzigen.
        this.badgeObserver = new MutationObserver(this.recomputeNavBadge);
        this.badgeObserver.observe(this, { childList: true, subtree: true });
    }

    firstUpdated(): void {
        this.recomputeNavBadge();
        this.openMobileNavigationButton?.addEventListener('click', this.onOpenMobileNavigation);
        this.closeMobileNavigationButton?.addEventListener('click', this.onCloseMobileNavigation);
        this.toggleNavigationButton?.addEventListener('click', this.onToggleNavigation);
        if (globalThis.localStorage.getItem('vl-dashboard-navigation-collapsed') === 'true') {
            this.onToggleNavigation();
        }
        this.rightPanelCloseButton?.addEventListener('click', this.closeRightPanel);

        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, this.contentStyles];
        }
    }

    updated(changed: PropertyValues<this>) {
        if (changed.has('contentPadding') || changed.has('contentMaxWidth')) {
            this.contentStyles.replaceSync(`
                .vl-dashboard__content-area { padding: ${this.contentPadding}; }
                .vl-dashboard__content-area-max-width { max-width: ${this.contentMaxWidth}; margin-inline: auto; }
            `);
        }
        if (!this.pageTitle) {
            // If there is no title we still want a small min-width for the mobile nav icon
            this.style.setProperty('--vl-dashboard-title-min-width', '3rem');
        } else {
            // If page title is set, revert back to the previously set min-width by removing the property on this level
            this.style.removeProperty('--vl-dashboard-title-min-width');
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.badgeObserver?.disconnect();
        this.badgeObserver = undefined;
        this.openMobileNavigationButton?.removeEventListener('click', this.onOpenMobileNavigation);
        this.closeMobileNavigationButton?.removeEventListener('click', this.onCloseMobileNavigation);
        this.toggleNavigationButton?.removeEventListener('click', this.onToggleNavigation);
        this.rightPanelCloseButton?.removeEventListener('click', this.closeRightPanel);
    }

    private readonly onSkipToMainClick = (e: Event) => {
        e.preventDefault();
        const mainContent = this.shadowRoot?.querySelector<HTMLDivElement>('#main-content');
        mainContent?.focus();
        mainContent?.scrollIntoView({ behavior: 'instant' });
    };

    private readonly onSkipToContentClick = (e: Event) => {
        e.preventDefault();
        const content = this.shadowRoot?.querySelector<HTMLDivElement>('#page-content');
        content?.focus();
        content?.scrollIntoView({ behavior: 'instant' });
    };

    private renderMobileCloseButton() {
        return html`
            <div class="vl-dashboard__navigation-close-mobile">
                <vl-button id="close-mobile-navigation-button" icon="close" ghost></vl-button>
            </div>
        `;
    }

    render() {
        return html`
            <div class="vl-dashboard">
                <nav aria-label="Snel naar inhoud" tabindex="-1">
                    <a href="#main-content" class="vl-skip-link" @click=${this.onSkipToMainClick}
                        >Ga meteen naar de inhoud</a
                    >
                </nav>
                <slot name="header"></slot>
                <aside class="vl-dashboard__navigation" id="navigation" aria-label="Zijpaneel met navigatie">
                    ${when(
                        this.userName || this.userIcon || this.userImg,
                        () =>
                            html`<div class="vl-dashboard__navigation-header">
                                <div class="vl-dashboard__navigation-header-user">
                                    ${when(
                                        this.userImg || this.userIcon,
                                        () => html`
                                            <user-badge>
                                                ${when(
                                                    this.userImg && this.userName && !this.userIcon,
                                                    () => html`<img src="${this.userImg!}" alt="${this.userName!}" />`,
                                                )}
                                                ${when(
                                                    this.userIcon && !this.userImg,
                                                    () => html`<vl-icon icon="${this.userIcon!}"></vl-icon>`,
                                                )}
                                            </user-badge>
                                        `,
                                    )}
                                    ${when(this.userName, () => html`<user-name>${this.userName!}</user-name>`)}
                                </div>
                                ${this.renderMobileCloseButton()}
                            </div>`,
                        () => this.renderMobileCloseButton(),
                    )}

                    <nav class="vl-dashboard__navigation-main" aria-label="Hoofdnavigatie" tabindex="0">
                        <div role="list">
                            <slot name="nav-main"></slot>
                        </div>
                    </nav>
                    <nav
                        ?hidden=${!this.hasNavUtils}
                        class="vl-dashboard__navigation-utils"
                        aria-label="Hulpnavigatie"
                        tabindex="-1"
                    >
                        <div role="list">
                            <slot name="nav-utils" @slotchange=${this.onNavUtilsSlotChange}></slot>
                        </div>
                    </nav>
                    <div class="vl-dashboard__navigation-footer">
                        <vl-button
                            id="toggle-navigation-button"
                            icon="nav-left-double"
                            ghost
                            aria-expanded="true"
                            aria-controls="navigation"
                            label="Paneel inklappen"
                        ></vl-button>
                    </div>
                </aside>
                <main class="vl-dashboard__content" tabindex="-1" id="main-content">
                    <a href="#main-content" class="vl-skip-link" @click=${this.onSkipToContentClick}
                        >Ga meteen naar de pagina inhoud</a
                    >
                    <div class="vl-dashboard__content-header">
                        <div class="vl-dashboard__content-header-title">
                            <div class="vl-dashboard__navigation-open-mobile">
                                <vl-button
                                    id="open-mobile-navigation-button"
                                    icon="menu"
                                    ghost
                                    label=${this.navHasBadge
                                        ? 'Navigatie openen, er zijn meldingen'
                                        : 'Navigatie openen'}
                                ></vl-button>
                                ${when(
                                    this.navHasBadge,
                                    () => html`<span class="vl-dashboard__mobile-nav-badge" aria-hidden="true"></span>`,
                                )}
                            </div>
                            ${when(this.pageIcon, () => html`<vl-icon icon="${this.pageIcon!}" large></vl-icon>`)}
                            ${when(
                                this.pageTitle,
                                () => html`<vl-title type="h1" no-space-bottom>${this.pageTitle}</vl-title>`,
                            )}
                            ${when(this.pageSubtitle, () => html`<vl-text annotation>${this.pageSubtitle}</vl-text>`)}
                        </div>
                        <div class="vl-dashboard__content-header-actions">
                            <slot name="header-actions" @slotchange=${this.onHeaderActionsSlotChange}></slot>
                        </div>
                    </div>
                    <div class="vl-dashboard__content-wrapper">
                        <div
                            class="vl-dashboard__content-area"
                            tabindex="0"
                            id="page-content"
                            aria-label="Pagina inhoud"
                        >
                            <div class="vl-dashboard__content-area-max-width">
                                <slot name="content"></slot>
                            </div>
                        </div>
                        <aside class="vl-dashboard__right-panel" id="right-panel" hidden aria-label="Rechter paneel">
                            <div class="vl-dashboard__right-panel-area" tabindex="0">
                                <slot name="right-panel"></slot>
                            </div>
                            <vl-button
                                id="close-right-panel-button"
                                icon="close"
                                ghost
                                label="Paneel sluiten"
                            ></vl-button>
                        </aside>
                    </div>
                </main>

                <slot name="footer"></slot>
            </div>
        `;
    }
}
