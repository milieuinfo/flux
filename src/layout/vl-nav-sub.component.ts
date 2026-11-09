// Uit de flux-starter-app (src/component/vl-dashboard, commit c8e6686): de layout van een dashboard, met navigatie.
import { registerWebComponents } from '@domg-wc/common';
import { VlIconComponent } from '@domg-wc/components/atom';
import { vlLayoutStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { customElement, property } from 'lit/decorators.js';
import { vlNavSubStyles } from './vl-nav-sub.css';
import { VlNavLinkComponent } from './vl-nav-link.component';

/**
 * Groepeert een set van vl-nav-link componenten onder een gedeeld label binnen de nav-main slot van vl-dashboard.
 *
 * @slot - Plaats hier de vl-nav-link componenten die tot deze sub-navigatie behoren.
 */
@customElement('vl-nav-sub')
export class VlNavSubComponent extends LitElement {
    static {
        registerWebComponents([VlIconComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLayoutStyles, vlNavSubStyles];
    }

    /**
     * @property label - Het label van de sub-navigatie groep. Wordt verborgen wanneer de navigatie is ingeklapt,
     * maar blijft via aria-labelledby beschikbaar als toegankelijke naam van de geneste lijst.
     */
    @property({ type: String, attribute: 'label' })
    label: string | undefined = undefined;

    /**
     * @property icon - Het icoon dat naast het label van de sub-navigatie groep wordt getoond.
     */
    @property({ type: String, attribute: 'icon' })
    icon: string | undefined = undefined;

    /**
     * @property collapsed - Klapt de sub-navigatie mee in met de hoofdnavigatie: het label wordt verborgen en de
     * collapsed-staat wordt doorgegeven aan de onderliggende vl-nav-link componenten.
     */
    @property({ type: Boolean, attribute: 'collapsed', reflect: true })
    collapsed = false;

    protected firstUpdated(): void {
        this.setAttribute('role', 'listitem');
    }

    protected updated(): void {
        this.syncCollapsed();
    }

    private readonly onSlotChange = () => {
        this.syncCollapsed();
    };

    private syncCollapsed(): void {
        this.querySelectorAll<VlNavLinkComponent>('vl-nav-link').forEach((link) => {
            link.toggleAttribute('collapsed', this.collapsed);
        });
    }

    render() {
        return html`
            <div class="vl-nav-sub">
                ${when(
                    this.label,
                    () => html`
                        <span id="label" class="vl-nav-sub__label" aria-hidden="true">
                            ${when(this.icon, () => html`<vl-icon icon="${this.icon!}"></vl-icon>`)}
                            <span class="vl-nav-sub__label-text">${this.label}</span>
                        </span>
                    `,
                )}
                <div
                    class="vl-nav-sub__items"
                    role="list"
                    aria-labelledby=${ifDefined(this.label ? 'label' : undefined)}
                >
                    <slot @slotchange=${this.onSlotChange}></slot>
                </div>
            </div>
        `;
    }
}
