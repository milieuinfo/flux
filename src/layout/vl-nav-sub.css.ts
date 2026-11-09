// Uit de flux-starter-app (src/component/vl-dashboard, commit c8e6686): de layout van een dashboard, met navigatie.
import { vlMediaScreenMedium } from '@domg-wc/styles';
import { css } from 'lit';

export const vlNavSubStyles = css`
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
        @media screen and (min-width: ${vlMediaScreenMedium}px) {
            .vl-nav-sub__label-text {
                display: none;
            }
            .vl-nav-sub__label {
                justify-content: center;
                padding-inline: 0;
            }
        }
    }
`;
