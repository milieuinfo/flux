// Uit de flux-starter-app (src/component/vl-dashboard, commit c8e6686): de layout van een dashboard, met navigatie,
// zoals in de gateway van flux-mcp. Drie afwijkingen: de hulpnavigatie onderaan is niet wit, zie
// .vl-dashboard__navigation-utils; het inhoudsvak houdt ook wat absoluut staat binnen, zie .vl-dashboard__content-area;
// en afgedrukt staat enkel de inhoud, zie @media print.
import { vlMediaScreenMedium } from '@domg-wc/styles';
import { css } from 'lit';

export const vlDashboardStyles = css`
    .vl-dashboard {
        display: flex;
        flex-direction: row;
        height: calc(100vh - var(--vl-dashboard-header-height, 43px) - var(--vl-dashboard-footer-height, 128px));
    }
    @media screen and (max-width: ${vlMediaScreenMedium}px) {
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

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            display: none;
        }

        &.vl-dashboard__navigation--mobile {
            @media screen and (max-width: ${vlMediaScreenMedium}px) {
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
            @media screen and (min-width: ${vlMediaScreenMedium}px) {
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

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
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

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            display: none;
        }
    }
    .vl-dashboard__navigation-open-mobile,
    .vl-dashboard__navigation-close-mobile {
        display: none;

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
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

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
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

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
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

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
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

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
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
`;
