// De wegwijzer: alles van Team Flux op een rij, met bij elke link een korte uitleg. Eerst wat je gebruikt, de
// documentatie, Flux-MCP en het prototype; dan de code, op GitHub en op GitLab; dan waar het team werkt, en het design
// system van Digitaal Vlaanderen, waarop Flux steunt.
//
// De punten staan in de opmaak van de documentatie van de gateway van flux-mcp: een icoon in een blauwe badge, de naam
// en de uitleg, twee of drie naast elkaar over de volle breedte, en op een smal scherm onder elkaar. De naam is de link;
// buiten het portaal opent hij in een nieuw tabblad, met het icoon en de melding van vl-link. Vraagt een link een
// account, zoals op GitLab, Jira of Confluence, of is een repo op GitHub privé, dan staat dat naast de naam, met een
// slotje.
import type { VlIcon } from '@domg-wc/components/atom/icon/vl-icon-list';
import { vlMediaScreenMedium } from '@domg-wc/styles';
import { css, html, LitElement, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
    CONFLUENCE_URL,
    DESIGN_SYSTEM_URL,
    DV_IDEA_URL,
    FLUX_MCP_URL,
    githubRepo,
    gitlabRepo,
    JIRA_URL,
    PROTOTYPE_URL,
    STORYBOOK_URL,
} from '../links';
import { pageHeader, pageStyles, readingStyles } from './page';

// Wie een link kan openen: iedereen, wie zich aanmeldt, of wie toegang heeft tot een privérepo.
type Access = 'public' | 'login' | 'private';

const ACCESS_LABEL: Record<Access, string> = { public: '', login: 'aanmelden', private: 'privé' };

export interface Link {
    icon: VlIcon;
    name: string;
    url: string;
    text: string;
    access?: Access;
}

export interface Group {
    title?: string;
    links: Link[];
}

export interface Part {
    id: string;
    title: string;
    text: string;
    groups: Group[];
}

export const PARTS: Part[] = [
    {
        id: 'gebruiken',
        title: 'Documentatie en toepassingen',
        text: 'Wat je gebruikt om met Flux te bouwen, en wat ermee gebouwd is.',
        groups: [
            {
                links: [
                    {
                        icon: 'content-book',
                        name: 'Storybook',
                        url: STORYBOOK_URL,
                        text:
                            'De documentatie van de nieuwste release: elke component met zijn voorbeelden, de ' +
                            'richtlijnen en de gidsen om Flux af te nemen.',
                    },
                    {
                        icon: 'magic-wand',
                        name: 'Flux-MCP',
                        url: FLUX_MCP_URL,
                        text:
                            'De gateway van Flux-AI, in de oefenomgeving: hoe je de MCP-server aan je AI-client ' +
                            'koppelt, je token, en de versies van Flux die de server kent.',
                        access: 'login',
                    },
                    {
                        icon: 'laptop',
                        name: 'Prototype VIZIER',
                        url: PROTOTYPE_URL,
                        text:
                            'De opvolging van gewestelijke planprocedures, als prototype gebouwd met Flux en de ' +
                            'recepten van Flux-MCP, met fictieve gegevens.',
                    },
                ],
            },
        ],
    },
    {
        id: 'github',
        title: 'Code op GitHub',
        text: 'In de organisatie milieuinfo. Een privérepo zie je enkel als je er toegang toe hebt.',
        groups: [
            {
                title: 'Actief',
                links: [
                    {
                        icon: 'programming-jigsaw',
                        name: 'flux-web-components',
                        url: githubRepo('flux-web-components'),
                        text:
                            'De monorepo van Flux: de componenten, de stijlen en de kaart, met hun documentatie in ' +
                            'Storybook. Hier verschijnen de releases.',
                    },
                    {
                        icon: 'globe',
                        name: 'flux-builds',
                        url: githubRepo('flux-builds'),
                        text:
                            'Storybook van elke release, gebouwd, op GitHub Pages onder ' +
                            'flux.omgeving.vlaanderen.be.',
                    },
                    {
                        icon: 'user-group',
                        name: 'flux-agents',
                        url: githubRepo('flux-agents'),
                        text:
                            'Een lokale pijplijn van AI-agents voor de tickets van flux-web-components: verfijnen, ' +
                            'plannen, ontwikkelen en reviewen. Mergen doe je zelf.',
                        access: 'private',
                    },
                    {
                        icon: 'server',
                        name: 'flux-mcp',
                        url: githubRepo('flux-mcp'),
                        text:
                            'De MCP-server van Flux-AI, met zijn gateway: per release wat een upgrade verandert, en de ' +
                            'documentatie uit Storybook, voor de AI-client van je project.',
                        access: 'private',
                    },
                    {
                        icon: 'paint-palette',
                        name: 'flux-assets',
                        url: githubRepo('flux-assets'),
                        text:
                            'De gedeelde assets, zoals het lettertype en de stijl van de Vlaamse overheid, als ' +
                            'package en op de CDN van het departement.',
                    },
                ],
            },
            {
                title: 'Prototypes',
                links: [
                    {
                        icon: 'laptop',
                        name: 'flux-prototypes',
                        url: githubRepo('flux-prototypes'),
                        text:
                            'De gebouwde prototypes, op GitHub Pages onder flux-prototypes.omgeving.vlaanderen.be. ' +
                            'Hun broncode staat in een eigen repo.',
                    },
                    {
                        icon: 'code-branch',
                        name: 'flux-proto-vizier',
                        url: githubRepo('flux-proto-vizier'),
                        text: 'De broncode van het prototype van VIZIER, gebouwd met de recepten van Flux-MCP.',
                        access: 'private',
                    },
                ],
            },
        ],
    },
    {
        id: 'gitlab',
        title: 'Code op GitLab',
        text: 'Op de GitLab van het departement, met een account van het departement.',
        groups: [
            {
                links: [
                    {
                        icon: 'dashboard',
                        name: 'flux-starter-app',
                        url: gitlabRepo('flux/flux-starter-app'),
                        text:
                            'Een startproject met de basis van een toepassing in Flux, met de layout van een ' +
                            'dashboard. Een nieuwe frontend vertrekt hiervan.',
                        access: 'login',
                    },
                    {
                        icon: 'server',
                        name: 'flux-mcp',
                        url: gitlabRepo('flux/flux-mcp'),
                        text: 'flux-mcp voor Jenkins, dat er de images voor het containerplatform bouwt.',
                        access: 'login',
                    },
                    {
                        icon: 'wrench',
                        name: 'flux-mcp-config',
                        url: gitlabRepo('cumulus/k8s/config/flux-mcp-config'),
                        text: 'De configuratie van flux-mcp op het containerplatform, per omgeving, in KCL.',
                        access: 'login',
                    },
                    {
                        icon: 'code-branch',
                        name: 'flux-proto-vizier',
                        url: gitlabRepo('flux/flux-proto-vizier'),
                        text: 'Het prototype van VIZIER op GitLab: de frontend, met de Flux web componenten.',
                        access: 'login',
                    },
                    {
                        icon: 'check-shield',
                        name: 'anubis-template',
                        url: gitlabRepo('flux/anubis-template'),
                        text:
                            'Anubis, dat een toepassing tegen bots beschermt, met zijn pagina’s in de huisstijl van ' +
                            'de Vlaamse overheid.',
                        access: 'login',
                    },
                    {
                        icon: 'lock',
                        name: 'flux-csp-poc',
                        url: gitlabRepo('flux/flux-csp-poc'),
                        text:
                            'Een kleine toepassing die toont hoe Flux werkt met een strikte Content Security Policy, ' +
                            'met de header, de footer, de rich text editor en de kaart.',
                        access: 'login',
                    },
                ],
            },
        ],
    },
    {
        id: 'team',
        title: 'Team Flux',
        text: 'Waar het team zijn werk plant en vastlegt, met een account van het departement.',
        groups: [
            {
                links: [
                    {
                        icon: 'file-tasks-check',
                        name: 'Jira',
                        url: JIRA_URL,
                        text: 'Het bord van Team Flux, met de tickets (FLUX) en wat in de sprint zit.',
                        access: 'login',
                    },
                    {
                        icon: 'document',
                        name: 'Confluence',
                        url: CONFLUENCE_URL,
                        text: 'De pagina van Team Flux (UI/UX), met de afspraken en de documentatie van het team.',
                        access: 'login',
                    },
                ],
            },
        ],
    },
    {
        id: 'digitaal-vlaanderen',
        title: 'Digitaal Vlaanderen',
        text: 'Flux volgt de huisstijl van de Vlaamse overheid, die Digitaal Vlaanderen in zijn design system beschrijft.',
        groups: [
            {
                links: [
                    {
                        icon: 'paint-brush',
                        name: 'Vlaanderen Design System',
                        url: DESIGN_SYSTEM_URL,
                        text: 'Het design system van de Vlaamse overheid: de huisstijl, de componenten en de richtlijnen.',
                    },
                    {
                        icon: 'lightbulb',
                        name: 'Het idee bij Digitaal Vlaanderen',
                        url: DV_IDEA_URL,
                        text:
                            'Het idee in Jira Product Discovery van het Vlaanderen Design System, met een account van ' +
                            'de Vlaamse overheid.',
                        access: 'login',
                    },
                ],
            },
        ],
    },
];

@customElement('flux-wegwijzer-page')
export class WegwijzerPage extends LitElement {
    static styles = [
        ...pageStyles,
        readingStyles,
        css`
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

            @media screen and (max-width: ${vlMediaScreenMedium}px) {
                .points {
                    grid-template-columns: minmax(0, 1fr);
                }
            }
        `,
    ];

    render() {
        return html`
            ${pageHeader('direction-sign', 'Wegwijzer')}
            <section class="part">
                <vl-text class="lead">
                    Alles van Team Flux op een rij: de documentatie en de toepassingen, de code op GitHub en GitLab,
                    waar het team werkt, en het design system van Digitaal Vlaanderen. Elke link opent in een nieuw
                    tabblad.
                </vl-text>
            </section>
            ${PARTS.map((part) => this.renderPart(part))}
        `;
    }

    private renderPart({ id, title, text, groups }: Part) {
        return html`
            <section class="part" id=${id} aria-labelledby="${id}-title">
                <vl-title id="${id}-title" type="h2" appearance="h3" no-space-bottom>${title}</vl-title>
                <vl-text>${text}</vl-text>
                ${groups.map(
                    (group) => html`
                        ${group.title
                            ? html`<vl-title class="group-title" type="h3" appearance="h5" no-space-bottom>
                                  ${group.title}
                              </vl-title>`
                            : nothing}
                        <ul class="points">
                            ${group.links.map((link) => this.renderLink(link))}
                        </ul>
                    `,
                )}
            </section>
        `;
    }

    private renderLink({ icon, name, url, text, access = 'public' }: Link) {
        return html`
            <li class="point">
                <span class="badge"><vl-icon icon=${icon}></vl-icon></span>
                <div>
                    <span class="point-title">
                        <vl-link href=${url} external>${name}</vl-link>
                        ${access === 'public'
                            ? nothing
                            : html`<span class="access"><vl-icon icon="lock"></vl-icon>${ACCESS_LABEL[access]}</span>`}
                    </span>
                    <vl-text>${text}</vl-text>
                </div>
            </li>
        `;
    }
}
