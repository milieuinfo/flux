// Uit de flux-starter-app (src/component/vl-dashboard, commit c8e6686): de layout van een dashboard, met navigatie,
// zoals in de gateway van flux-mcp: een link navigeert via de router van het portaal.
import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { vlLayoutStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property, state } from 'lit/decorators.js';
import { navigate } from '../router';
import { vlNavLinkStyles } from './vl-nav-link.css';

@customElement('vl-nav-link')
export class VlNavLinkComponent extends LitElement {
    static {
        registerWebComponents([VlButtonComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLayoutStyles, vlNavLinkStyles];
    }

    @property({ type: String, attribute: 'icon' })
    icon: string | undefined = undefined;

    @property({ type: String, attribute: 'href' })
    href: string | undefined = undefined;

    @property({ type: Boolean, attribute: 'active', reflect: true })
    active = false;

    @property({ type: Boolean, attribute: 'collapsed' })
    collapsed = false;

    @property({ type: Boolean, attribute: 'external' })
    external = false;

    @property({ type: Boolean, attribute: 'disabled', reflect: true })
    disabled = false;

    @state()
    private _badgeContent = '';

    @state()
    private _linkContent = '';

    private handleBadgeSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        this._badgeContent = slot
            .assignedNodes()
            .map((n) => n.textContent)
            .join(' ')
            .trim();
    }

    private handleLinkSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        this._linkContent = slot
            .assignedNodes()
            .map((n) => n.textContent)
            .join(' ')
            .trim();
    }

    private readonly onClick = (e: MouseEvent) => {
        if (this.disabled) return;
        // Volg de link als er niet rechtstreeks op de button is geklikt
        const button = this.shadowRoot?.querySelector('vl-button');
        if (!button) return;
        if (!e.composedPath().includes(button)) {
            if (this.href) {
                if (this.external) {
                    globalThis.open(this.href, '_blank', 'noopener,noreferrer');
                } else {
                    // Aangepast: via de router van het portaal, zonder de pagina te herladen.
                    navigate(this.href);
                }
            } else {
                button.click();
            }
        }
    };

    protected firstUpdated(): void {
        this.setAttribute('role', 'listitem');
        this.addEventListener('click', this.onClick);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('click', this.onClick);
    }

    render() {
        const combinedLabel = [this._linkContent, this._badgeContent].filter(Boolean).join(', ');

        return html`
            <div class="vl-group vl-group--align-center">
                <vl-button
                    icon="${ifDefined(this.icon)}"
                    ghost
                    aria-current="${ifDefined(this.active ? 'page' : undefined)}"
                    block
                    cta-link=${ifDefined(this.href)}
                    .label=${combinedLabel}
                    narrow
                    external=${ifDefined(this.external ? 'true' : undefined)}
                    ?disabled=${this.disabled}
                >
                    <slot @slotchange=${this.handleLinkSlotChange}></slot>
                </vl-button>

                <slot name="link-action"></slot>
                <slot name="link-badge" @slotchange=${this.handleBadgeSlotChange}></slot>
            </div>
        `;
    }
}
