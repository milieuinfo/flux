// De links naar wat Team Flux maakt, met de logo's voor onderaan de startpagina. De paden van de logo's komen uit
// simple-icons 13.21.0 (CC0-1.0), in een viewBox van 24 bij 24; de kleur komt van de link (currentColor). Zo staan ze
// ook in de app van de gateway van flux-mcp.

// Een repo op GitHub, in de organisatie milieuinfo.
export const githubRepo = (name: string) => `https://github.com/milieuinfo/${name}`;

// Een repo op de GitLab van het departement, met zijn pad onder git/, zoals in de url om te clonen.
export const gitlabRepo = (path: string) => `https://git.omgeving.vlaanderen.be/git/${path}`;

export const GITHUB_URL = githubRepo('flux-web-components');

// De releases van flux-web-components; de nieuwste toont de startpagina (release.ts).
export const RELEASES_URL = `${GITHUB_URL}/releases`;

// Storybook van de nieuwste release, via latest van Flux zelf.
export const STORYBOOK_URL = 'https://flux.omgeving.vlaanderen.be/release-v2/latest/storybook';

export const FIGMA_URL = 'https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=11-7198';

// De gids over Flux-AI in Storybook (Afnemen), in de nieuwste release.
export const FLUX_AI_URL = `${STORYBOOK_URL}/?path=/docs/afnemen-flux-ai-frontendstroomlijning--documentatie`;

// De gateway van Flux-MCP in de oefenomgeving; aanmelden gaat met een account van het departement.
export const FLUX_MCP_URL = 'https://flux-mcp-oefen.omgeving.vlaanderen.be';

// Het prototype van VIZIER, op de site van flux-prototypes.
export const PROTOTYPE_URL = 'https://flux-prototypes.omgeving.vlaanderen.be/vizier/overzicht';

// Het bord van Team Flux in Jira, en zijn pagina in Confluence.
export const JIRA_URL =
    'https://jira.omgeving.vlaanderen.be/jira/secure/RapidBoard.jspa?rapidView=980&useStoredSettings=true';
export const CONFLUENCE_URL =
    'https://confluence.omgeving.vlaanderen.be/confluence/spaces/AEO/pages/212436378/Team+Flux+UI+UX';

// Digitaal Vlaanderen: het Vlaanderen Design System, en het idee in hun Jira Product Discovery (DS).
export const DESIGN_SYSTEM_URL = 'https://www.vlaanderen.be/vlaanderen-design-system';
export const DV_IDEA_URL =
    'https://vlaamseoverheid.atlassian.net/jira/polaris/projects/DS/ideas/view/5724a117-be3c-4591-9435-ed3e569752f6';

export const GITHUB =
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01' +
    '-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087' +
    '-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108' +
    '-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303' +
    '-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405' +
    ' 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61' +
    '-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57' +
    'C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12';

export const STORYBOOK =
    'M16.71.243l-.12 2.71a.18.18 0 00.29.15l1.06-.8.9.7a.18.18 0 00.28-.14l-.1-2.76 1.33-.1a1.2 1.2 0' +
    ' 011.279 1.2v21.596a1.2 1.2 0 01-1.26 1.2l-16.096-.72a1.2 1.2 0 01-1.15-1.16l-.75-19.797a1.2 1.2' +
    ' 0 011.13-1.27L16.7.222zM13.64 9.3c0 .47 3.16.24 3.59-.08 0-3.2-1.72-4.89-4.859-4.89-3.15 0' +
    '-4.899 1.72-4.899 4.29 0 4.45 5.999 4.53 5.999 6.959 0 .7-.32 1.1-1.05 1.1-.96 0-1.35-.49-1.3' +
    '-2.16 0-.36-3.649-.48-3.769 0-.27 4.03 2.23 5.2 5.099 5.2 2.79 0 4.969-1.49 4.969-4.18 0-4.77' +
    '-6.099-4.64-6.099-6.999 0-.97.72-1.1 1.13-1.1.45 0 1.25.07 1.19 1.87z';

export const FIGMA =
    'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51' +
    'h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c' +
    '-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355' +
    '-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014' +
    '-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355' +
    ' 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49' +
    '-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0' +
    ' 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476' +
    ' 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49' +
    ' 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019' +
    '-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z';
