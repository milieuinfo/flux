(()=>{"use strict";var e,t={675:(e,t,n)=>{var a=n(515),i=n(727),o=n(913),l=n(901);const r=n.p+"d082d5dfcc43e9b6bcb3.svg";var s=n(166),d=n(297),c=n(230),h=n(134),v=n(801),p=n(722),g=n(705),u=n(854);const m=o.AH`
    .vl-dashboard {
        display: flex;
        flex-direction: row;
        height: calc(100vh - var(--vl-dashboard-header-height, 43px) - var(--vl-dashboard-footer-height, 128px));
    }
    @media screen and (max-width: ${u.Oh}px) {
        .vl-dashboard {
            display: block;
            height: 100%;
        }
    }

    /* Common Header Styles */
    .vl-dashboard__navigation-header,
    .vl-dashboard__content-header {
        box-sizing: border-box;
        min-height: 8.8rem;
        padding: var(--vl-spacing--normal);
        border-bottom: 1px solid var(--vl-color--border-default);
        display: flex;
        align-items: center;
        gap: var(--vl-spacing--xsmall);
    }

    /* Navigation Panel */
    .vl-dashboard__navigation {
        flex: 0 1 var(--vl-dashboard-navigation-width, 300px);
        background-color: var(--vl-color--background-subtle);
        border-right: 1px solid var(--vl-color--border-default);
        display: grid;
        grid-template-areas:
            'navigation-header'
            'navigation'
            'navigation-utils'
            'navigation-footer';
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto auto;

        .vl-dashboard__navigation-main {
            grid-area: navigation;
            padding-block: var(--vl-spacing--normal);
            overflow-y: auto;
            max-height: 100%;
        }
        .vl-dashboard__navigation-main div[role='list'] {
            display: flex;
            flex-direction: column;
            gap: var(--vl-spacing--xsmall);
        }

        @media screen and (max-width: ${u.Oh}px) {
            display: none;
        }

        &.vl-dashboard__navigation--mobile {
            @media screen and (max-width: ${u.Oh}px) {
                display: flex;
                flex-direction: column;
                height: calc(100vh - var(--vl-header-height, 43px));
                position: fixed;
                top: var(--vl-header-height, 43px);
                left: 0;
                width: 100%;

                + .vl-dashboard__content {
                    display: none;
                }
            }
        }

        &.vl-dashboard__navigation--collapsed {
            @media screen and (min-width: ${u.Oh}px) {
                flex-basis: 4.1rem;
                overflow: hidden;

                .vl-dashboard__navigation-footer,
                .vl-dashboard__navigation-utils {
                    vl-button::part(button),
                    vl-button::part(link) {
                        font-size: 0;
                        width: 100%;
                        padding-inline: 0;
                        justify-content: center !important;
                    }
                    vl-button::part(icon) {
                        font-size: var(--vl-font-size);
                    }
                }
                .vl-dashboard__navigation-main,
                .vl-dashboard__navigation-utils {
                    text-align: center;
                }
                .vl-dashboard__navigation-header {
                    padding-inline: 0.8rem;
                }
                .vl-dashboard__navigation-header-user > user-name {
                    display: none;
                }
                .vl-dashboard__navigation-header-user > user-badge {
                    width: 2.4rem;
                    height: 2.4rem;
                    font-size: 0.6em;
                }
                #toggle-navigation-button {
                    display: block;
                    transform: rotate(180deg);
                }
            }
        }
    }
    .vl-dashboard__navigation-header {
        grid-area: navigation-header;
        font-size: var(--vl-font-size--large);
        font-weight: 500;
        justify-content: space-between;
    }
    .vl-dashboard__navigation-header-user {
        display: flex;
        align-items: center;
        gap: var(--vl-spacing--xsmall);
    }
    .vl-dashboard__navigation-utils {
        grid-area: navigation-utils;
        padding-block: var(--vl-spacing--xxsmall);
        border-top: 1px solid var(--vl-color--border-default);
        /* De achtergrond van de navigatie, niet wit zoals in de starter: wit zijn de subitems (vl-nav-sub), en wat
           hier staat, zijn hoofditems. */
        background-color: var(--vl-color--background-subtle);
        overflow-x: hidden;

        vl-button::part(button) {
            justify-content: flex-start;
        }

        @media screen and (max-width: ${u.Oh}px) {
            overflow-x: unset;
        }
    }
    .vl-dashboard__navigation-utils div[role='list'] {
        display: flex;
        flex-direction: column;
        gap: var(--vl-spacing--xsmall);
    }
    .vl-dashboard__navigation-footer {
        grid-area: navigation-footer;
        padding: 5px;
        border-top: 1px solid var(--vl-color--border-default);

        @media screen and (max-width: ${u.Oh}px) {
            display: none;
        }
    }
    .vl-dashboard__navigation-open-mobile,
    .vl-dashboard__navigation-close-mobile {
        display: none;

        @media screen and (max-width: ${u.Oh}px) {
            display: block;
        }
    }

    .vl-dashboard__navigation-open-mobile {
        position: relative;
    }
    .vl-dashboard__mobile-nav-badge {
        position: absolute;
        top: 0.4rem;
        right: 0.4rem;
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        background-color: var(--vl-color--background-error);
        border: 1px solid white;
        pointer-events: none;
    }

    .vl-dashboard__navigation-close-mobile {
        margin-left: auto;
        margin-block: var(--vl-spacing--normal);
        margin-right: var(--vl-spacing--normal);

        @media screen and (max-width: ${u.Oh}px) {
            & + .vl-dashboard__navigation-main {
                border-top: 1px solid var(--vl-color--border-default);
            }
        }
    }

    .vl-dashboard__navigation-header {
        .vl-dashboard__navigation-close-mobile {
            margin: 0;
        }
    }

    /* Content Panel */
    .vl-dashboard__content {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        min-width: 0; /* allow flex children to shrink */
        position: relative;
    }
    .vl-dashboard__content-header {
        justify-content: flex-end;
        flex-wrap: wrap;
        align-items: center;

        &:not(:has(vl-title)) {
            align-items: flex-end;
            min-height: 0;
            padding: 0;
            border-bottom: 0;
        }
        &.has-actions {
            padding: var(--vl-spacing--normal);
            border-bottom: 1px solid var(--vl-color--border-default);
        }

        @media screen and (max-width: ${u.Oh}px) {
            position: sticky;
            top: var(--vl-dashboard-header-height, 43px);
            background-color: var(--vl-color--background-default);
            z-index: 1;

            &:not(:has(vl-title)) {
                padding: var(--vl-spacing--normal);
                border-bottom: 1px solid var(--vl-color--border-default);
            }
        }
    }

    .vl-dashboard__content-header-title,
    .vl-dashboard__content-header-actions {
        display: flex;
        gap: var(--vl-spacing--xsmall);
        align-items: center;
        flex-wrap: wrap;
    }
    .vl-dashboard__content-header-title {
        /* Indien de actions ervoor zouden zorgen dat de titel kleiner wordt 
         * dan --vl-dashboard-title-min-width, zorgt deze variabele ervoor dat
         * de titel de volledige breedte inneemt van de header en de actions
         * op een nieuwe lijn beginnen. */
        flex: 1 1 var(--vl-dashboard-title-min-width, 30rem);
        min-width: 0; /* Important for flex and ellipsis */
    }
    .vl-dashboard__content-header-title vl-title::part(h1) {
        font-size: var(--vl-font-size--large);
        word-break: break-word;
    }
    .vl-dashboard__content-header-actions {
        flex-wrap: wrap;
    }
    .vl-dashboard__content-wrapper {
        display: flex;
        flex-direction: row;
        flex: 1;
        min-height: 0; /* allow flex children to shrink */

        @media screen and (max-width: ${u.Oh}px) {
            display: block;
            position: relative;
        }
    }
    .vl-dashboard__content-area {
        flex: 1;
        min-height: 0; /* allow flex children to shrink */
        overflow-x: hidden;
        overflow-y: auto;
        /* Niet in de starter: zo scrolt wat absoluut staat mee in dit vak, zoals een caption of tekst met
           visually-hidden voor een schermlezer. Anders hoorde het bij .vl-dashboard__content, stak het onderaan een
           lange pagina onder het venster uit, en scrolde het muiswiel boven de navigatie het hele venster. */
        position: relative;
    }

    /* Right Panel */
    .vl-dashboard__right-panel {
        flex: 0 1 calc(100% / 3);
        height: 100%;
        display: flex;
        flex-direction: column;
        min-width: 300px;
        border-left: 1px solid var(--vl-color--border-default);
        position: relative;

        .vl-dashboard__right-panel-area {
            min-height: 0; /* allow flex children to shrink */
            overflow-x: hidden;
            overflow-y: auto;
            padding: var(--vl-spacing--small);
            padding-right: var(--vl-spacing--large);
        }

        #close-right-panel-button {
            position: absolute;
            top: 1rem;
            right: 1rem;
        }

        @media screen and (max-width: ${u.Oh}px) {
            background-color: var(--vl-color--background-default);
            position: absolute;
            top: 0;
            right: 0;
            min-width: 0;
            scroll-margin-top: var(--vl-dashboard-header-height, 43px);
        }
    }

    user-name {
        text-wrap: pretty;
        line-height: 1.1;
    }

    user-badge {
        width: 4.5rem;
        height: 4.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: var(--vl-color--background-default);
        border: 1px solid var(--vl-color--border-default);
        overflow: hidden;
        flex-shrink: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    [hidden] {
        display: none !important;
    }

    nav:has(.vl-skip-link):focus-within {
        .vl-skip-link {
            position: absolute;
            height: unset;
            width: unset;
            overflow: unset;
            clip: unset;
            margin: unset;
            cursor: pointer;
            background: white;
            z-index: var(--vl-z-layer--skip-link);
            box-shadow: none;
        }
    }

    /* Afdrukken: enkel de inhoud, over de breedte van het papier en over zoveel bladzijden als nodig. Zonder de
       navigatie, de kop van het dashboard en de links om naar de inhoud te springen, en zonder de vaste hoogte met een
       eigen scrollgebied: daarvan drukte de browser enkel het deel af dat op het scherm stond. */
    @media print {
        .vl-dashboard,
        .vl-dashboard__content,
        .vl-dashboard__content-wrapper,
        .vl-dashboard__content-area {
            display: block;
            height: auto;
            overflow: visible;
        }

        .vl-dashboard__navigation,
        .vl-dashboard__content-header,
        .vl-dashboard__right-panel,
        .vl-skip-link {
            display: none !important;
        }
    }
`;function b(e,t,n,a){var i,o=arguments.length,l=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,a);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(l=(o<3?i(l):o>3?i(t,n,l):i(t,n))||l);return o>3&&l&&Object.defineProperty(t,n,l),l}class f extends o.WF{static{(0,a.gy)([s.Y,d.I,i.T,c.b])}static get styles(){return[h.q,v.b,p.Z,m]}get openMobileNavigationButton(){return this.shadowRoot?.querySelector("#open-mobile-navigation-button")}get closeMobileNavigationButton(){return this.shadowRoot?.querySelector("#close-mobile-navigation-button")}get toggleNavigationButton(){return this.shadowRoot?.querySelector("#toggle-navigation-button")}get navigationContainer(){return this.shadowRoot?.querySelector(".vl-dashboard__navigation")}get rightPanel(){return this.shadowRoot?.querySelector("#right-panel")}get rightPanelCloseButton(){return this.shadowRoot?.querySelector("#close-right-panel-button")}scrollToTop(){this.shadowRoot?.querySelector(".vl-dashboard__content-area")?.scrollTo({top:0}),window.scrollTo({top:0})}registerRightPanelTrigger(e){e.setAttribute("aria-controls","right-panel"),e.setAttribute("aria-expanded","false"),e.addEventListener("click",this.openRightPanel)}unregisterRightPanelTrigger(e){e.removeEventListener("click",this.openRightPanel),e.removeAttribute("aria-controls"),e.removeAttribute("aria-expanded")}connectedCallback(){super.connectedCallback(),this.badgeObserver=new MutationObserver(this.recomputeNavBadge),this.badgeObserver.observe(this,{childList:!0,subtree:!0})}firstUpdated(){this.recomputeNavBadge(),this.openMobileNavigationButton?.addEventListener("click",this.onOpenMobileNavigation),this.closeMobileNavigationButton?.addEventListener("click",this.onCloseMobileNavigation),this.toggleNavigationButton?.addEventListener("click",this.onToggleNavigation),"true"===globalThis.localStorage.getItem("vl-dashboard-navigation-collapsed")&&this.onToggleNavigation(),this.rightPanelCloseButton?.addEventListener("click",this.closeRightPanel),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[...this.shadowRoot.adoptedStyleSheets,this.contentStyles])}updated(e){(e.has("contentPadding")||e.has("contentMaxWidth"))&&this.contentStyles.replaceSync(`\n                .vl-dashboard__content-area { padding: ${this.contentPadding}; }\n                .vl-dashboard__content-area-max-width { max-width: ${this.contentMaxWidth}; margin-inline: auto; }\n            `),this.pageTitle?this.style.removeProperty("--vl-dashboard-title-min-width"):this.style.setProperty("--vl-dashboard-title-min-width","3rem")}disconnectedCallback(){super.disconnectedCallback(),this.badgeObserver?.disconnect(),this.badgeObserver=void 0,this.openMobileNavigationButton?.removeEventListener("click",this.onOpenMobileNavigation),this.closeMobileNavigationButton?.removeEventListener("click",this.onCloseMobileNavigation),this.toggleNavigationButton?.removeEventListener("click",this.onToggleNavigation),this.rightPanelCloseButton?.removeEventListener("click",this.closeRightPanel)}renderMobileCloseButton(){return o.qy`
            <div class="vl-dashboard__navigation-close-mobile">
                <vl-button id="close-mobile-navigation-button" icon="close" ghost></vl-button>
            </div>
        `}render(){return o.qy`
            <div class="vl-dashboard">
                <nav aria-label="Snel naar inhoud" tabindex="-1">
                    <a href="#main-content" class="vl-skip-link" @click=${this.onSkipToMainClick}
                        >Ga meteen naar de inhoud</a
                    >
                </nav>
                <slot name="header"></slot>
                <aside class="vl-dashboard__navigation" id="navigation" aria-label="Zijpaneel met navigatie">
                    ${(0,g.z)(this.userName||this.userIcon||this.userImg,()=>o.qy`<div class="vl-dashboard__navigation-header">
                                <div class="vl-dashboard__navigation-header-user">
                                    ${(0,g.z)(this.userImg||this.userIcon,()=>o.qy`
                                            <user-badge>
                                                ${(0,g.z)(this.userImg&&this.userName&&!this.userIcon,()=>o.qy`<img src="${this.userImg}" alt="${this.userName}" />`)}
                                                ${(0,g.z)(this.userIcon&&!this.userImg,()=>o.qy`<vl-icon icon="${this.userIcon}"></vl-icon>`)}
                                            </user-badge>
                                        `)}
                                    ${(0,g.z)(this.userName,()=>o.qy`<user-name>${this.userName}</user-name>`)}
                                </div>
                                ${this.renderMobileCloseButton()}
                            </div>`,()=>this.renderMobileCloseButton())}

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
                                    label=${this.navHasBadge?"Navigatie openen, er zijn meldingen":"Navigatie openen"}
                                ></vl-button>
                                ${(0,g.z)(this.navHasBadge,()=>o.qy`<span class="vl-dashboard__mobile-nav-badge" aria-hidden="true"></span>`)}
                            </div>
                            ${(0,g.z)(this.pageIcon,()=>o.qy`<vl-icon icon="${this.pageIcon}" large></vl-icon>`)}
                            ${(0,g.z)(this.pageTitle,()=>o.qy`<vl-title type="h1" no-space-bottom>${this.pageTitle}</vl-title>`)}
                            ${(0,g.z)(this.pageSubtitle,()=>o.qy`<vl-text annotation>${this.pageSubtitle}</vl-text>`)}
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
        `}constructor(...e){super(...e),this.hasNavUtils=!1,this.navHasBadge=!1,this.badgeObserver=void 0,this.userName=void 0,this.userImg=void 0,this.userIcon=void 0,this.pageTitle=void 0,this.pageSubtitle=void 0,this.pageIcon=void 0,this.contentPadding="30px",this.contentMaxWidth="100%",this.contentStyles=new CSSStyleSheet,this.rightPanelTriggerElement=null,this.recomputeNavBadge=()=>{this.navHasBadge=!!this.querySelector('[slot="nav-main"] [slot="link-badge"], [slot="nav-utils"] [slot="link-badge"]')},this.onNavUtilsSlotChange=e=>{const t=e.currentTarget,n=t.assignedElements({flatten:!0}).length>0,a=t.assignedNodes({flatten:!0}).some(e=>e.nodeType===Node.TEXT_NODE&&(e.textContent??"").trim().length>0);this.hasNavUtils=n||a},this.onHeaderActionsSlotChange=e=>{const t=e.currentTarget.assignedElements({flatten:!0}).length>0,n=this.shadowRoot?.querySelector(".vl-dashboard__content-header");n?.classList.toggle("has-actions",t)},this.onOpenMobileNavigation=()=>{this.navigationContainer?.classList.add("vl-dashboard__navigation--mobile"),this.closeMobileNavigationButton?.shadowRoot?.querySelector("button")?.focus()},this.onCloseMobileNavigation=()=>{this.navigationContainer?.classList.remove("vl-dashboard__navigation--mobile"),this.openMobileNavigationButton?.shadowRoot?.querySelector("button")?.focus()},this.onToggleNavigation=()=>{this.navigationContainer?.classList.toggle("vl-dashboard__navigation--collapsed");const e=this.navigationContainer?.classList.contains("vl-dashboard__navigation--collapsed");this.toggleNavigationButton?.setAttribute("aria-expanded",e?"false":"true");const t=new CustomEvent("vl-toggle-navigation",{detail:{collapsed:e},composed:!0,bubbles:!0});this.dispatchEvent(t),globalThis.localStorage.setItem("vl-dashboard-navigation-collapsed",e?"true":"false")},this.openRightPanel=e=>{const t=e.currentTarget;t.setAttribute("aria-expanded","true"),this.rightPanelTriggerElement=t,this.rightPanel?.removeAttribute("hidden"),this.rightPanel?.querySelector(".vl-dashboard__right-panel-area")?.focus(),this.rightPanel?.scrollIntoView(!0)},this.closeRightPanel=()=>{this.rightPanelTriggerElement?.setAttribute("aria-expanded","false");const e=this.rightPanelTriggerElement instanceof s.Y?this.rightPanelTriggerElement.shadowRoot?.querySelector("button"):this.rightPanelTriggerElement;e?.setAttribute("aria-expanded","false"),e?.focus(),this.rightPanelTriggerElement=null,this.rightPanel?.setAttribute("hidden","")},this.onSkipToMainClick=e=>{e.preventDefault();const t=this.shadowRoot?.querySelector("#main-content");t?.focus(),t?.scrollIntoView({behavior:"instant"})},this.onSkipToContentClick=e=>{e.preventDefault();const t=this.shadowRoot?.querySelector("#page-content");t?.focus(),t?.scrollIntoView({behavior:"instant"})}}}b([(0,l.wk)()],f.prototype,"hasNavUtils",void 0),b([(0,l.wk)()],f.prototype,"navHasBadge",void 0),b([(0,l.MZ)({type:String,attribute:"user-name"})],f.prototype,"userName",void 0),b([(0,l.MZ)({type:String,attribute:"user-img"})],f.prototype,"userImg",void 0),b([(0,l.MZ)({type:String,attribute:"user-icon"})],f.prototype,"userIcon",void 0),b([(0,l.MZ)({type:String,attribute:"page-title"})],f.prototype,"pageTitle",void 0),b([(0,l.MZ)({type:String,attribute:"page-subtitle"})],f.prototype,"pageSubtitle",void 0),b([(0,l.MZ)({type:String,attribute:"page-icon"})],f.prototype,"pageIcon",void 0),b([(0,l.MZ)({type:String,attribute:"content-padding"})],f.prototype,"contentPadding",void 0),b([(0,l.MZ)({type:String,attribute:"content-max-width"})],f.prototype,"contentMaxWidth",void 0),f=b([(0,l.EM)("vl-dashboard")],f);var x=n(601);const y=[["/","Start","places-home"],["/wegwijzer","Wegwijzer","direction-sign"]],w={"/":{page:"home",title:"Start"},"/wegwijzer":{page:"wegwijzer",title:"Wegwijzer"}},k={page:"unknown",title:"Niet gevonden"};function _(){return document.querySelector("base")?new URL(document.baseURI).pathname:"/"}function j(e,t=_()){return`${e}/`===t?"/":e.startsWith(t)?`/${e.slice(t.length)}`:null}function $(e,t=_()){return t+e.replace(/^\//,"")}function z(e){const t=e.length>1?e.replace(/\/+$/,""):e;return w[t]??k}const C="flux-navigate";function S(e){const t=new URL(e,document.baseURI),n=t.origin===location.origin?j(t.pathname):null;null!==n&&z(n)!==k?(history.pushState(null,"",t.pathname+t.search+t.hash),window.dispatchEvent(new Event(C))):location.assign(t.href)}const O=o.AH`
    :host > .vl-group {
        position: relative;
        padding-inline: var(--vl-spacing--normal);
        padding-block: 0.2rem;
    }

    slot[name='link-badge']::slotted(button-badge) {
        position: absolute;
        right: calc(var(--vl-spacing--normal) + 0.8rem);
        pointer-events: none;
        min-width: 1.8rem;
        max-width: 50%;
        height: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.9rem;
        color: white;
        background-color: var(--vl-color--background-error);
        border: 1px solid var(--vl-color--background-error);
        padding: 0 0.3rem;
        font-size: 0.6em;
        font-weight: bold;
    }

    vl-button:first-child {
        flex: 1;

        &::part(button),
        &::part(link) {
            justify-content: flex-start;
        }
    }

    :host([collapsed]) {
        @media screen and (min-width: ${u.Oh}px) {
            & > .vl-group {
                padding-inline: 0;
            }
            vl-button::part(button),
            vl-button::part(link) {
                font-size: 0;
                width: 100%;
                padding-inline: 0;
                justify-content: center !important;
            }
            vl-button::part(icon) {
                font-size: var(--vl-font-size);
            }
            slot[name='link-action'] {
                display: none;
            }
            slot[name='link-badge']::slotted(*) {
                font-size: 0.5em !important;
                min-width: 1rem !important;
                height: 1rem !important;
                border-radius: 0.5rem !important;
                right: 0.2rem;
                top: 0;
                padding: 0.2rem !important;
            }
        }
    }

    :host([active]) {
        display: block;
        position: relative;
        background-color: #e6eefa;
        outline: 0.5rem solid #e6eefa;

        vl-button::part(button),
        vl-button::part(link) {
            color: var(--vl-color--text-default);
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background-color: var(--vl-color--action);
            outline: 0.5rem solid var(--vl-color--action);
        }
    }

    :host([active][collapsed]) {
        outline-width: 0.2rem;
        &::before {
            outline-width: 0.2rem;
        }
    }
`;function P(e,t,n,a){var i,o=arguments.length,l=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,a);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(l=(o<3?i(l):o>3?i(t,n,l):i(t,n))||l);return o>3&&l&&Object.defineProperty(t,n,l),l}class R extends o.WF{static{(0,a.gy)([s.Y])}static get styles(){return[h.q,v.b,O]}handleBadgeSlotChange(e){const t=e.target;this._badgeContent=t.assignedNodes().map(e=>e.textContent).join(" ").trim()}handleLinkSlotChange(e){const t=e.target;this._linkContent=t.assignedNodes().map(e=>e.textContent).join(" ").trim()}firstUpdated(){this.setAttribute("role","listitem"),this.addEventListener("click",this.onClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.onClick)}render(){const e=[this._linkContent,this._badgeContent].filter(Boolean).join(", ");return o.qy`
            <div class="vl-group vl-group--align-center">
                <vl-button
                    icon="${(0,x.J)(this.icon)}"
                    ghost
                    aria-current="${(0,x.J)(this.active?"page":void 0)}"
                    block
                    cta-link=${(0,x.J)(this.href)}
                    .label=${e}
                    narrow
                    external=${(0,x.J)(this.external?"true":void 0)}
                    ?disabled=${this.disabled}
                >
                    <slot @slotchange=${this.handleLinkSlotChange}></slot>
                </vl-button>

                <slot name="link-action"></slot>
                <slot name="link-badge" @slotchange=${this.handleBadgeSlotChange}></slot>
            </div>
        `}constructor(...e){super(...e),this.icon=void 0,this.href=void 0,this.active=!1,this.collapsed=!1,this.external=!1,this.disabled=!1,this._badgeContent="",this._linkContent="",this.onClick=e=>{if(this.disabled)return;const t=this.shadowRoot?.querySelector("vl-button");t&&(e.composedPath().includes(t)||(this.href?this.external?globalThis.open(this.href,"_blank","noopener,noreferrer"):S(this.href):t.click()))}}}P([(0,l.MZ)({type:String,attribute:"icon"})],R.prototype,"icon",void 0),P([(0,l.MZ)({type:String,attribute:"href"})],R.prototype,"href",void 0),P([(0,l.MZ)({type:Boolean,attribute:"active",reflect:!0})],R.prototype,"active",void 0),P([(0,l.MZ)({type:Boolean,attribute:"collapsed"})],R.prototype,"collapsed",void 0),P([(0,l.MZ)({type:Boolean,attribute:"external"})],R.prototype,"external",void 0),P([(0,l.MZ)({type:Boolean,attribute:"disabled",reflect:!0})],R.prototype,"disabled",void 0),P([(0,l.wk)()],R.prototype,"_badgeContent",void 0),P([(0,l.wk)()],R.prototype,"_linkContent",void 0),R=P([(0,l.EM)("vl-nav-link")],R);const E=o.AH`
    :host {
        display: block;
    }

    .vl-nav-sub {
        border-block: 1px solid var(--vl-color--border-default);
        background: var(--vl-color--background, white);
        padding-block: var(--vl-spacing--xxsmall);
        margin-block: -0.5rem;
    }

    .vl-nav-sub__label {
        display: flex;
        align-items: center;
        gap: 0.5em;
        font-weight: 500;
        font-size: 1.6rem;
        color: var(--vl-color--text-default);
        padding-left: calc(var(--vl-spacing--normal) + var(--vl-spacing--xsmall) + 0.2rem);
        padding-right: var(--vl-spacing--normal);
        padding-top: 0.8rem;
        padding-bottom: 1.6rem;
    }

    .vl-nav-sub__items {
        display: flex;
        flex-direction: column;
        gap: var(--vl-spacing--xsmall);
    }

    :host([collapsed]) {
        @media screen and (min-width: ${u.Oh}px) {
            .vl-nav-sub__label-text {
                display: none;
            }
            .vl-nav-sub__label {
                justify-content: center;
                padding-inline: 0;
            }
        }
    }
`;function F(e,t,n,a){var i,o=arguments.length,l=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,a);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(l=(o<3?i(l):o>3?i(t,n,l):i(t,n))||l);return o>3&&l&&Object.defineProperty(t,n,l),l}class M extends o.WF{static{(0,a.gy)([c.b])}static get styles(){return[h.q,v.b,E]}firstUpdated(){this.setAttribute("role","listitem")}updated(){this.syncCollapsed()}syncCollapsed(){this.querySelectorAll("vl-nav-link").forEach(e=>{e.toggleAttribute("collapsed",this.collapsed)})}render(){return o.qy`
            <div class="vl-nav-sub">
                ${(0,g.z)(this.label,()=>o.qy`
                        <span id="label" class="vl-nav-sub__label" aria-hidden="true">
                            ${(0,g.z)(this.icon,()=>o.qy`<vl-icon icon="${this.icon}"></vl-icon>`)}
                            <span class="vl-nav-sub__label-text">${this.label}</span>
                        </span>
                    `)}
                <div
                    class="vl-nav-sub__items"
                    role="list"
                    aria-labelledby=${(0,x.J)(this.label?"label":void 0)}
                >
                    <slot @slotchange=${this.onSlotChange}></slot>
                </div>
            </div>
        `}constructor(...e){super(...e),this.label=void 0,this.icon=void 0,this.collapsed=!1,this.onSlotChange=()=>{this.syncCollapsed()}}}F([(0,l.MZ)({type:String,attribute:"label"})],M.prototype,"label",void 0),F([(0,l.MZ)({type:String,attribute:"icon"})],M.prototype,"icon",void 0),F([(0,l.MZ)({type:Boolean,attribute:"collapsed",reflect:!0})],M.prototype,"collapsed",void 0),M=F([(0,l.EM)("vl-nav-sub")],M);var q=n(967),T=n(262),D=n(494);const N=JSON.parse('{"El":{"Az":"2.22.0"}}'),I=n.p+"2664e6922d0b83b2968f.svg",A=e=>`https://github.com/milieuinfo/${e}`,L=e=>`https://git.omgeving.vlaanderen.be/git/${e}`,H=A("flux-web-components"),B=`${H}/releases`,U="https://flux.omgeving.vlaanderen.be/release-v2/latest/storybook",W="https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=11-7198",V=`${U}/?path=/docs/afnemen-flux-ai-frontendstroomlijning--documentatie`,Z=/^v?(\d+)\.(\d+)\.(\d+)$/,G="flux-latest-release";function J(e,t){for(let n=0;n<e.length;n++)if(e[n]!==t[n])return e[n]-t[n];return 0}async function K({fetch:e=fetch.bind(globalThis),storage:t=X(),now:n=Date.now()}={}){const a=function(e){try{const t=JSON.parse(e?.getItem(G)??"null");return t&&"number"==typeof t.at&&Z.test(t.release?.version)?t:null}catch{return null}}(t);if(a&&n-a.at<36e5)return a.release;try{const a=await e("https://api.github.com/repos/milieuinfo/flux-web-components/releases?per_page=100",{headers:{Accept:"application/vnd.github+json"}});if(!a.ok)throw new Error(`GitHub antwoordt ${a.status}`);const i=function(e){let t=null;for(const n of e){const e=Z.exec(n.tag_name);if(!e||n.draft||n.prerelease||!n.published_at)continue;const a=e.slice(1).map(Number);(!t||J(a,t.parts)>0)&&(t={parts:a,release:{version:a.join("."),url:n.html_url,date:n.published_at}})}return t?.release??null}(await a.json());if(!i)throw new Error("Geen release gevonden");return function(e,t){try{e?.setItem(G,JSON.stringify(t))}catch{}}(t,{at:n,release:i}),i}catch(e){if(a)return a.release;throw e}}function X(){try{return globalThis.localStorage??null}catch{return null}}var Y=n(345);(0,a.gy)([c.b,Y.m,i.T,d.I]);const Q=[h.q,...v.b,o.AH`
        :host {
            display: block;
        }

        section + section {
            margin-top: 3rem;
        }

        /* Een codeblok scrolt opzij; met tabindex="0" bereik je het ook met het toetsenbord. Het blok heeft de letter
           van de tekst, zodat een breedte in ch dezelfde is als die van de tekst; de code erin staat in een
           code-element, met de letter van code. */
        pre.code {
            background: var(--vl-color--background-subtle, #f3f5f6);
            border: 1px solid var(--vl-color--border-default, #cbd2da);
            padding: 1rem;
            overflow-x: auto;
            white-space: pre;
            font-family: inherit;
            line-height: 1.35;
        }

        ul.list {
            list-style: disc;
            padding-left: 2rem;
        }

        ol.list {
            list-style: decimal;
            padding-left: 2rem;
        }

        /* De reset van Flux geeft code het lettertype van de tekst: een naam uit de code valt dan niet op. */
        code {
            font-family: monospace;
            font-size: 0.9em;
        }

        .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
        }
    `],ee=o.AH`
    /* Twee breedtes: lopende tekst, stappen en codeblokken op leesbreedte, 76ch in de gewone letter; tabellen, rijen
       van punten en kaders over de volle breedte. ch is de breedte van een 0, en een teken in Flanders Art Sans is
       gemiddeld smaller: 76ch geeft zo'n 95 tekens per regel. vl-text is inline: als blok krijgt hij een breedte.

       Lopende tekst eindigt op één lijn: wat inspringt, zoals een lijst, wordt smaller in plaats van verder door te
       lopen. Een lijst telt daarom haar opsommingstekens mee. */
    vl-text {
        display: block;
        max-width: 76ch;
    }

    .list {
        box-sizing: border-box;
        max-width: 76ch;
    }

    /* De eerste alinea: waar de pagina over gaat, iets groter, maar even breed als de tekst eronder. ch groeit mee
       met de letter: 76ch in de gewone letter van 1,8rem is 68,4ch in deze van 2rem. */
    .lead {
        font-size: 2rem;
        line-height: 1.5;
        max-width: calc(76ch * 1.8 / 2);
    }

    /* De kop als één geheel: het icoon, ernaast zo nodig waar je bent, klein en gedempt, en de titel, groot. Een
       lijn eronder. */
    .page-header {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-bottom: 4rem;
        padding-bottom: 2.4rem;
        border-bottom: 1px solid var(--vl-color--border-default, #cbd2da);
    }

    vl-title.context::part(h1) {
        color: var(--vl-color--text-subtle, #687483);
    }

    /* De delen van een pagina, met meer ruimte ertussen dan binnen een deel. */
    .part {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .part + .part {
        margin-top: 5rem;
    }

    /* Een rond icoon, in de blauwe kleur van de links en de iconen in het menu. */
    .badge {
        flex: none;
        display: grid;
        place-items: center;
        width: 4.4rem;
        height: 4.4rem;
        border-radius: 50%;
        background: var(--vl-color--action-100, #e6eefa);
        color: var(--vl-color--action, #0055cc);
    }

    /* Het icoon van de pagina zelf: groter en vol blauw, zodat het niet leest als een van de punten. */
    .badge--large {
        width: 6.4rem;
        height: 6.4rem;
        font-size: 2.6rem;
        background: var(--vl-color--action, #0055cc);
        color: var(--vl-color--text-on-action, #fff);
    }
`;function te(e,t,n){return o.qy`
        <header class="page-header">
            <span class="badge badge--large"><vl-icon icon=${e}></vl-icon></span>
            ${n?o.qy`<div>
                      <vl-title class="context" type="h1" appearance="h5" no-space-bottom>${n}</vl-title>
                      <vl-title type="h2" appearance="h1" no-space-bottom>${t}</vl-title>
                  </div>`:o.qy`<vl-title type="h1" no-space-bottom>${t}</vl-title>`}
        </header>
    `}function ne(e,t,n,a){var i,o=arguments.length,l=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,a);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(l=(o<3?i(l):o>3?i(t,n,l):i(t,n))||l);return o>3&&l&&Object.defineProperty(t,n,l),l}const ae=new Intl.DateTimeFormat("nl-BE",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});class ie extends o.WF{static{this.styles=[...Q,o.AH`
            /* Een blauwe lijn links, in de kleur van de links, houdt het blok bij elkaar. */
            :host {
                display: block;
                padding-left: 2.4rem;
                border-left: 0.4rem solid var(--vl-color--action, #0055cc);
            }

            .label {
                margin: 0;
                font-size: 1.4rem;
                font-weight: 500;
                letter-spacing: 0.06em;
                text-transform: uppercase;
                color: var(--vl-color--grey-800);
            }

            /* De versie zo groot als de initiaal van de inleiding ernaast. */
            .version {
                display: block;
                margin: 0.6rem 0 0.4rem;
                min-height: 1em;
                font-size: 5rem;
                font-weight: 600;
                line-height: 1;
                letter-spacing: -0.02em;
                color: var(--vl-color--grey-900);
            }

            .date {
                min-height: 1.5em;
                margin: 0 0 1rem;
                color: var(--vl-color--grey-800);
            }

            .failed {
                margin: 0.6rem 0 1rem;
            }
        `]}connectedCallback(){super.connectedCallback(),void 0===this.release&&this.load()}async load(){try{this.release=await K()}catch{this.release=null}}render(){const e=this.release;return o.qy`
            <section aria-labelledby="label" aria-busy=${void 0===e?"true":"false"}>
                <h2 id="label" class="label">Nieuwste release van Flux</h2>
                ${null===e?o.qy`<p class="failed">De nieuwste release is nu niet op te halen bij GitHub.</p>
                          <vl-link href=${B} external>Alle releases</vl-link>`:o.qy`<span class="version">${e?.version??""}</span>
                          <p class="date">
                              ${e?o.qy`<time datetime=${e.date}>${this.date(e)}</time>`:""}
                          </p>
                          <div class="vl-group vl-group--wrap vl-group--separator-row">
                              ${e?o.qy`<vl-link href=${e.url} external>Release notes</vl-link>`:""}
                              <vl-link href=${B} external>Alle releases</vl-link>
                          </div>`}
            </section>
        `}date(e){return ae.format(new Date(e.date))}}ne([(0,l.wk)()],ie.prototype,"release",void 0),ie=ne([(0,l.EM)("flux-latest-release")],ie),(0,a.gy)([T.U,D.wS,q.Q]);const oe=N.El.Az,le=[["flux-web-components op GitHub",H,"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"],["Storybook van de nieuwste Flux",U,"M16.71.243l-.12 2.71a.18.18 0 00.29.15l1.06-.8.9.7a.18.18 0 00.28-.14l-.1-2.76 1.33-.1a1.2 1.2 0 011.279 1.2v21.596a1.2 1.2 0 01-1.26 1.2l-16.096-.72a1.2 1.2 0 01-1.15-1.16l-.75-19.797a1.2 1.2 0 011.13-1.27L16.7.222zM13.64 9.3c0 .47 3.16.24 3.59-.08 0-3.2-1.72-4.89-4.859-4.89-3.15 0-4.899 1.72-4.899 4.29 0 4.45 5.999 4.53 5.999 6.959 0 .7-.32 1.1-1.05 1.1-.96 0-1.35-.49-1.3-2.16 0-.36-3.649-.48-3.769 0-.27 4.03 2.23 5.2 5.099 5.2 2.79 0 4.969-1.49 4.969-4.18 0-4.77-6.099-4.64-6.099-6.999 0-.97.72-1.1 1.13-1.1.45 0 1.25.07 1.19 1.87z"],["De componenten van Flux in Figma",W,"M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"]],re=[{title:"Web componenten",subtitle:"Met hun documentatie in Storybook",icon:"programming-jigsaw",text:"De componenten, de stijlen en de kaart van Flux, in de huisstijl van de Vlaamse overheid, met de documentatie van elke release.",links:[[U,"Storybook"],[H,"GitHub"]]},{title:"Ontwerp",subtitle:"De bibliotheek in Figma",icon:"pencil-ruler",text:"De componenten van Flux als bibliotheek in Figma, voor wie een scherm ontwerpt.",links:[[W,"Figma"]]},{title:"Flux-AI",subtitle:"Kennis voor je AI-client",icon:"magic-wand",text:"De kennis over Flux per versie, voor de AI-client van je project, met recepten om een frontend te bouwen en te onderhouden.",links:[[V,"Flux-AI"]]}];class se extends o.WF{static{this.styles=[...Q,o.AH`
            /* Het inhoudsvak van het dashboard: zonder titel en padding de hoogte van het venster. De inhoud is even
               breed als op de andere pagina's: 128rem, met 2 x 3rem padding. */
            :host {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                --home-width: 134rem;
            }

            section.banner {
                display: flex;
                flex-direction: column;
                flex: 1 0 auto;
                max-height: 34rem;
            }

            vl-content-header {
                display: flex;
                flex-direction: column;
                flex: 1;
            }

            /* De padding van de andere pagina's (app.ts), met veel ruimte tussen de banner en de inleiding en wat meer
               onderaan, en in het midden, onder de titel in de banner. */
            .content {
                box-sizing: border-box;
                width: 100%;
                max-width: var(--home-width);
                margin: 0 auto;
                padding: 12rem 3rem 4rem;
            }

            /* Onderaan, in het midden, zoals een voettekst: de bronnen, en daaronder de versie van Flux. Tegen de
               onderkant van het venster: de marge erboven neemt wat de banner, tot zijn 34rem, overlaat; is het
               venster te laag, dan volgen ze de tegels. */
            .foot {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                margin-top: auto;
                padding: 0 3rem 2.4rem;
            }

            /* De bronnen klein en grijs: een icoon heeft 3:1 als contrast nodig, grey-700 haalt dat op wit. */
            .sources {
                display: flex;
                gap: 2.4rem;
            }

            .sources a {
                display: inline-flex;
                color: var(--vl-color--grey-700);
            }

            .sources a:hover,
            .sources a:focus-visible {
                color: var(--vl-color--action, #0055cc);
            }

            .sources a:focus-visible {
                outline: 3px solid var(--vl-color--border-focus, #0055cc);
                outline-offset: 4px;
            }

            .sources svg {
                width: 2.2rem;
                height: 2.2rem;
                fill: currentColor;
            }

            /* Kleine tekst heeft 4,5:1 nodig: grey-800, niet het grijs van de logo's. */
            .built {
                margin: 0;
                font-size: 1.4rem;
                color: var(--vl-color--grey-800);
            }

            /* De tegels op een rij, met meer witruimte dan de grid van Flux geeft: 1.5rem tussen de kolommen. Een
               eigen grid van drie kolommen, niet die van Flux: die heeft er twaalf, en met elf keer 4rem ertussen werd
               ze op een smal scherm breder dan het scherm. Een tegel rekt mee tot de hoogte van de rij. */
            .tiles {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 4rem;
            }

            /* De inleiding over de eerste twee kolommen van de tegels, de nieuwste release boven de derde. */
            .intro-row {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                column-gap: 4rem;
                margin-bottom: 6rem;
            }

            /* De inleiding loopt tot twee derde van de middelste tegel, niet over alle drie; staan de tegels onder
               elkaar, dan even breed. Over twee kolommen van breedte t, samen 2t + 4rem = 100%, is 5t/3 + 4rem gelijk
               aan (500% + 4rem) / 6. */
            .intro {
                grid-column: 1 / 3;
                max-width: calc((500% + 4rem) / 6);
            }

            flux-latest-release {
                grid-column: 3;
                align-self: start;
            }

            /* De inleiding 10% kleiner dan in Flux, op elk scherm: Flux kiest de grootte per scherm uit deze
               variabelen. */
            .intro vl-paragraph {
                --vl-font-size--xlarge: calc(0.9 * 2.2rem);
                --vl-font-size--large: calc(0.9 * 2rem);
                --vl-font-size: calc(0.9 * 1.8rem);
            }

            /* Op een smal scherm staan de tegels onder elkaar, met minder ruimte boven de inleiding. */
            @media screen and (max-width: ${u.Oh}px) {
                .content {
                    padding-top: 6rem;
                }

                .tiles,
                .intro-row {
                    grid-template-columns: minmax(0, 1fr);
                    gap: 3rem;
                }

                .intro,
                flux-latest-release {
                    grid-column: auto;
                    max-width: none;
                }
            }

            /* Flux, het eerste woord, als initiaal: groot en donkergrijs over twee regels van de inleiding, met de
               tekst errond. De bovenkant van de letters valt samen met die van de eerste regel, de onderkant met die
               van de tweede. In em, want de inleiding wordt op een kleiner scherm kleiner: zo blijft dat kloppen. Het
               vak blijft lager dan twee regels van de inleiding, anders springt ook de derde regel in. */
            .intro strong {
                float: left;
                margin: 0.05em 0.16em 0 0;
                font-size: 3.1em;
                line-height: 0.8;
                font-weight: 600;
                letter-spacing: -0.02em;
                white-space: nowrap;
                color: var(--vl-color--grey-900);
            }
        `]}render(){return o.qy`
            <h1 class="visually-hidden">Flux</h1>
            <section class="banner">
                <vl-content-header custom-css=${".vl-content-header { flex: 1; display: flex; flex-direction: column; } .vl-content-header__wrapper { flex: 1; } .vl-content-header--large .vl-content-header__wrapper > .vl-layout { min-height: 14rem; padding-top: 3rem; padding-bottom: 3rem; max-width: var(--home-width); } .vl-content-header .vl-content-header__context__link, .vl-content-header .vl-content-header__title__link { font-size: 1.8rem; }"}>
                    <img slot="image" src=${I} alt="" />
                    <a slot="context-link" href="https://omgeving.vlaanderen.be">Departement Omgeving</a>
                    <a slot="title-link" href=${$("/")}>Frontend Library en User eXperience</a>
                </vl-content-header>
            </section>
            <section class="content" aria-label="Wat Team Flux maakt">
                <div class="intro-row">
                    <div class="intro">
                        <vl-paragraph introduction custom-css=${"p.introduction { margin: 0; line-height: 1.35; text-align: justify; text-wrap: pretty; }"}>
                            <strong>Flux</strong> is de frontend library van het Departement Omgeving, met de
                            componenten in de huisstijl van de Vlaamse overheid, hun ontwerp in Figma en Flux-AI voor de
                            AI-client van je project. Op dit portaal vind je alles wat Team Flux maakt; de
                            <vl-link href=${$("/wegwijzer")}>wegwijzer</vl-link> zet het op een rij.
                        </vl-paragraph>
                    </div>
                    <flux-latest-release></flux-latest-release>
                </div>
                <div class="tiles">${re.map(e=>this.renderTile(e))}</div>
            </section>
            <footer class="foot">
                ${this.renderSources()}
                <p class="built">Gebouwd met Flux ${oe}</p>
            </footer>
        `}renderSources(){return o.qy`
            <nav class="sources" aria-label="Bronnen">
                ${le.map(([e,t,n])=>o.qy`
                        <a href=${t} title=${e} target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d=${n}></path></svg>
                            <span class="visually-hidden">${e}, opent in een nieuw tabblad</span>
                        </a>
                    `)}
            </nav>
        `}renderTile({title:e,subtitle:t,icon:n,text:a,links:i}){return o.qy`
            <vl-info-tile-next
                highlight
                full-height
                icon=${n}
                icon-as-badge
                heading-level="2"
                custom-css=${".info-tile--full-height { display: flex; flex-direction: column; } .info-tile--full-height > :not(.info-tile__content) { flex: none; }"}
            >
                <span slot="trigger">${e}</span>
                <span slot="subtitle">${t}</span>
                <vl-text slot="content">${a}</vl-text>
                <div slot="footer" class="vl-group vl-group--wrap vl-group--separator-row">
                    ${i.map(([e,t])=>this.renderLink(e,t))}
                </div>
            </vl-info-tile-next>
        `}renderLink(e,t){const n=e.startsWith("https://");return o.qy`<vl-link href=${n?e:$(e)} ?external=${n}>${t}</vl-link>`}}se=function(e,t,n,a){var i,o=arguments.length,l=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,a);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(l=(o<3?i(l):o>3?i(t,n,l):i(t,n))||l);return o>3&&l&&Object.defineProperty(t,n,l),l}([(0,l.EM)("flux-home-page")],se);class de extends o.WF{static{this.styles=[...Q,ee]}render(){return o.qy`
            ${te("alert-circle","Deze pagina bestaat niet")}
            <section class="part">
                <vl-text class="lead">De link is verouderd, of er staat een fout in het adres.</vl-text>
                <vl-text>Op de <vl-link href=${$("/")}>startpagina</vl-link> vind je alles van Team Flux.</vl-text>
            </section>
        `}}de=function(e,t,n,a){var i,o=arguments.length,l=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,a);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(l=(o<3?i(l):o>3?i(t,n,l):i(t,n))||l);return o>3&&l&&Object.defineProperty(t,n,l),l}([(0,l.EM)("flux-not-found-page")],de);const ce={public:"",login:"aanmelden",private:"privé"},he=[{id:"gebruiken",title:"Documentatie en toepassingen",text:"Wat je gebruikt om met Flux te bouwen, en wat ermee gebouwd is.",groups:[{links:[{icon:"content-book",name:"Storybook",url:U,text:"De documentatie van de nieuwste release: elke component met zijn voorbeelden, de richtlijnen en de gidsen om Flux af te nemen."},{icon:"magic-wand",name:"Flux-MCP",url:"https://flux-mcp-oefen.omgeving.vlaanderen.be",text:"De gateway van Flux-AI, in de oefenomgeving: hoe je de MCP-server aan je AI-client koppelt, je token, en de versies van Flux die de server kent.",access:"login"},{icon:"laptop",name:"Prototype VIZIER",url:"https://flux-prototypes.omgeving.vlaanderen.be/vizier/overzicht",text:"De opvolging van gewestelijke planprocedures, als prototype gebouwd met Flux en de recepten van Flux-MCP, met fictieve gegevens."}]}]},{id:"github",title:"Code op GitHub",text:"In de organisatie milieuinfo. Een privérepo zie je enkel als je er toegang toe hebt.",groups:[{title:"Actief",links:[{icon:"programming-jigsaw",name:"flux-web-components",url:A("flux-web-components"),text:"De monorepo van Flux: de componenten, de stijlen en de kaart, met hun documentatie in Storybook. Hier verschijnen de releases."},{icon:"globe",name:"flux-builds",url:A("flux-builds"),text:"Storybook van elke release, gebouwd, op GitHub Pages onder flux.omgeving.vlaanderen.be."},{icon:"user-group",name:"flux-agents",url:A("flux-agents"),text:"Een lokale pijplijn van AI-agents voor de tickets van flux-web-components: verfijnen, plannen, ontwikkelen en reviewen. Mergen doe je zelf.",access:"private"},{icon:"server",name:"flux-mcp",url:A("flux-mcp"),text:"De MCP-server van Flux-AI, met zijn gateway: per release wat een upgrade verandert, en de documentatie uit Storybook, voor de AI-client van je project.",access:"private"},{icon:"paint-palette",name:"flux-assets",url:A("flux-assets"),text:"De gedeelde assets, zoals het lettertype en de stijl van de Vlaamse overheid, als package en op de CDN van het departement."}]},{title:"Prototypes",links:[{icon:"laptop",name:"flux-prototypes",url:A("flux-prototypes"),text:"De gebouwde prototypes, op GitHub Pages onder flux-prototypes.omgeving.vlaanderen.be. Hun broncode staat in een eigen repo."},{icon:"code-branch",name:"flux-proto-vizier",url:A("flux-proto-vizier"),text:"De broncode van het prototype van VIZIER, gebouwd met de recepten van Flux-MCP.",access:"private"}]}]},{id:"gitlab",title:"Code op GitLab",text:"Op de GitLab van het departement, met een account van het departement.",groups:[{links:[{icon:"dashboard",name:"flux-starter-app",url:L("flux/flux-starter-app"),text:"Een startproject met de basis van een toepassing in Flux, met de layout van een dashboard. Een nieuwe frontend vertrekt hiervan.",access:"login"},{icon:"server",name:"flux-mcp",url:L("flux/flux-mcp"),text:"flux-mcp voor Jenkins, dat er de images voor het containerplatform bouwt.",access:"login"},{icon:"wrench",name:"flux-mcp-config",url:L("cumulus/k8s/config/flux-mcp-config"),text:"De configuratie van flux-mcp op het containerplatform, per omgeving, in KCL.",access:"login"},{icon:"code-branch",name:"flux-proto-vizier",url:L("flux/flux-proto-vizier"),text:"Het prototype van VIZIER op GitLab: de frontend, met de Flux web componenten.",access:"login"},{icon:"check-shield",name:"anubis-template",url:L("flux/anubis-template"),text:"Anubis, dat een toepassing tegen bots beschermt, met zijn pagina’s in de huisstijl van de Vlaamse overheid.",access:"login"},{icon:"lock",name:"flux-csp-poc",url:L("flux/flux-csp-poc"),text:"Een kleine toepassing die toont hoe Flux werkt met een strikte Content Security Policy, met de header, de footer, de rich text editor en de kaart.",access:"login"}]}]},{id:"team",title:"Team Flux",text:"Waar het team zijn werk plant en vastlegt, met een account van het departement.",groups:[{links:[{icon:"file-tasks-check",name:"Jira",url:"https://jira.omgeving.vlaanderen.be/jira/secure/RapidBoard.jspa?rapidView=980&useStoredSettings=true",text:"Het bord van Team Flux, met de tickets (FLUX) en wat in de sprint zit.",access:"login"},{icon:"document",name:"Confluence",url:"https://confluence.omgeving.vlaanderen.be/confluence/spaces/AEO/pages/212436378/Team+Flux+UI+UX",text:"De pagina van Team Flux (UI/UX), met de afspraken en de documentatie van het team.",access:"login"}]}]},{id:"digitaal-vlaanderen",title:"Digitaal Vlaanderen",text:"Flux volgt de huisstijl van de Vlaamse overheid, die Digitaal Vlaanderen in zijn design system beschrijft.",groups:[{links:[{icon:"paint-brush",name:"Vlaanderen Design System",url:"https://www.vlaanderen.be/vlaanderen-design-system",text:"Het design system van de Vlaamse overheid: de huisstijl, de componenten en de richtlijnen."},{icon:"lightbulb",name:"Het idee bij Digitaal Vlaanderen",url:"https://vlaamseoverheid.atlassian.net/jira/polaris/projects/DS/ideas/view/5724a117-be3c-4591-9435-ed3e569752f6",text:"Het idee in Jira Product Discovery van het Vlaanderen Design System, met een account van de Vlaamse overheid.",access:"login"}]}]}];class ve extends o.WF{static{this.styles=[...Q,ee,o.AH`
            /* Gelijkwaardige punten op een rij, over de volle breedte, zoals in de documentatie van de gateway: drie
               naast elkaar, op een smal scherm onder elkaar. */
            .points {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 3rem 4rem;
                margin: 1rem 0;
                padding: 0;
                list-style: none;
            }

            .point {
                display: flex;
                gap: 1.6rem;
                align-items: flex-start;
            }

            .point-title {
                display: flex;
                flex-wrap: wrap;
                align-items: baseline;
                column-gap: 1rem;
                margin: 0.8rem 0 0.4rem;
                font-weight: 500;
            }

            /* Wie de link kan openen, klein en gedempt naast de naam; grey-800 haalt het contrast van kleine tekst. */
            .access {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                font-size: 1.4rem;
                font-weight: 400;
                color: var(--vl-color--grey-800);
            }

            .access vl-icon {
                font-size: 1.2rem;
            }

            .group-title {
                margin-top: 1.5rem;
            }

            @media screen and (max-width: ${u.Oh}px) {
                .points {
                    grid-template-columns: minmax(0, 1fr);
                }
            }
        `]}render(){return o.qy`
            ${te("direction-sign","Wegwijzer")}
            <section class="part">
                <vl-text class="lead">
                    Alles van Team Flux op een rij: de documentatie en de toepassingen, de code op GitHub en GitLab,
                    waar het team werkt, en het design system van Digitaal Vlaanderen. Elke link opent in een nieuw
                    tabblad.
                </vl-text>
            </section>
            ${he.map(e=>this.renderPart(e))}
        `}renderPart({id:e,title:t,text:n,groups:a}){return o.qy`
            <section class="part" id=${e} aria-labelledby="${e}-title">
                <vl-title id="${e}-title" type="h2" appearance="h3" no-space-bottom>${t}</vl-title>
                <vl-text>${n}</vl-text>
                ${a.map(e=>o.qy`
                        ${e.title?o.qy`<vl-title class="group-title" type="h3" appearance="h5" no-space-bottom>
                                  ${e.title}
                              </vl-title>`:o.s6}
                        <ul class="points">
                            ${e.links.map(e=>this.renderLink(e))}
                        </ul>
                    `)}
            </section>
        `}renderLink({icon:e,name:t,url:n,text:a,access:i="public"}){return o.qy`
            <li class="point">
                <span class="badge"><vl-icon icon=${e}></vl-icon></span>
                <div>
                    <span class="point-title">
                        <vl-link href=${n} external>${t}</vl-link>
                        ${"public"===i?o.s6:o.qy`<span class="access"><vl-icon icon="lock"></vl-icon>${ce[i]}</span>`}
                    </span>
                    <vl-text>${a}</vl-text>
                </div>
            </li>
        `}}function pe(e,t,n,a){var i,o=arguments.length,l=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,a);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(l=(o<3?i(l):o>3?i(t,n,l):i(t,n))||l);return o>3&&l&&Object.defineProperty(t,n,l),l}ve=function(e,t,n,a){var i,o=arguments.length,l=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,a);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(l=(o<3?i(l):o>3?i(t,n,l):i(t,n))||l);return o>3&&l&&Object.defineProperty(t,n,l),l}([(0,l.EM)("flux-wegwijzer-page")],ve);class ge extends o.WF{static{(0,a.gy)([f,R,M,i.T])}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),window.addEventListener("popstate",this.onRoute),window.addEventListener(C,this.onRoute),document.addEventListener("click",this.onClick),this.addEventListener("vl-toggle-navigation",this.onToggleNavigation),this.onRoute()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.onRoute),window.removeEventListener(C,this.onRoute),document.removeEventListener("click",this.onClick)}firstUpdated(){this.style.setProperty("--vl-dashboard-header-height","0px"),this.style.setProperty("--vl-dashboard-footer-height","0px"),this.style.setProperty("--vl-header-height","0px"),this.style.setProperty("--vl-dashboard-navigation-width","28rem")}route(){return z(this.path??"/onbekend")}render(){const e=this.route(),t="home"===e.page;return o.qy`
            <vl-dashboard
                user-name="Team Flux"
                user-img=${r}
                content-padding=${t?"0":"30px"}
                content-max-width=${t?"100%":"1280px"}
            >
                ${y.map(([e,t,n])=>o.qy`<vl-nav-link
                            slot="nav-main"
                            ?collapsed=${this.navCollapsed}
                            href=${$(e)}
                            icon=${n}
                            ?active=${this.path===e}
                        >
                            ${t}
                        </vl-nav-link>`)}
                <div slot="content">${this.page(e)}</div>
            </vl-dashboard>
        `}page(e){switch(e.page){case"home":return o.qy`<flux-home-page></flux-home-page>`;case"wegwijzer":return o.qy`<flux-wegwijzer-page></flux-wegwijzer-page>`;default:return o.qy`<flux-not-found-page></flux-not-found-page>`}}constructor(...e){super(...e),this.path="/",this.navCollapsed=!1,this.onRoute=()=>{const e=j(location.pathname),t=e!==this.path&&!location.hash;var n;this.path=e,t&&this.updateComplete.then(()=>this.querySelector("vl-dashboard")?.scrollToTop()),document.title="home"===(n=this.route()).page?"Flux":`${n.title} · Flux`},this.onClick=e=>{const t=function(e){if(e.defaultPrevented||0!==e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return null;const t=e.composedPath().find(e=>e instanceof HTMLAnchorElement&&e.hasAttribute("href"));if(!t||"_blank"===t.target||t.hasAttribute("download"))return null;const n=new URL(t.href,document.baseURI),a=n.origin===location.origin?j(n.pathname):null;return null===a||z(a)===k||n.hash&&n.pathname===location.pathname&&n.search===location.search?null:n.pathname+n.search+n.hash}(e);t&&(e.preventDefault(),S(t))},this.onToggleNavigation=e=>{this.navCollapsed=e.detail.collapsed}}}pe([(0,l.wk)()],ge.prototype,"path",void 0),pe([(0,l.wk)()],ge.prototype,"navCollapsed",void 0),ge=pe([(0,l.EM)("flux-app")],ge)}},n={};function a(e){var i=n[e];if(void 0!==i)return i.exports;var o=n[e]={exports:{}};return t[e](o,o.exports,a),o.exports}a.m=t,e=[],a.O=(t,n,i,o)=>{if(!n){var l=1/0;for(c=0;c<e.length;c++){for(var[n,i,o]=e[c],r=!0,s=0;s<n.length;s++)(!1&o||l>=o)&&Object.keys(a.O).every(e=>a.O[e](n[s]))?n.splice(s--,1):(r=!1,o<l&&(l=o));if(r){e.splice(c--,1);var d=i();void 0!==d&&(t=d)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[n,i,o]},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.p="/flux/",(()=>{var e={57:0};a.O.j=t=>0===e[t];var t=(t,n)=>{var i,o,[l,r,s]=n,d=0;if(l.some(t=>0!==e[t])){for(i in r)a.o(r,i)&&(a.m[i]=r[i]);if(s)var c=s(a)}for(t&&t(n);d<l.length;d++)o=l[d],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(c)},n=self.webpackChunkflux_portaal=self.webpackChunkflux_portaal||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var i=a.O(void 0,[629],()=>a(675));i=a.O(i)})();