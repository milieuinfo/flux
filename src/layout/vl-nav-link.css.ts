// Uit de flux-starter-app (src/component/vl-dashboard, commit c8e6686): de layout van een dashboard, met navigatie.
import { vlMediaScreenMedium } from '@domg-wc/styles';
import { css } from 'lit';

export const vlNavLinkStyles = css`
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
        @media screen and (min-width: ${vlMediaScreenMedium}px) {
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
`;
