// De nieuwste release van flux-web-components, voor de startpagina: de hoogste versie onder de releases op GitHub. Niet
// de laatst gepubliceerde: een release van v1, zoals 1.51.0, verschijnt soms na een van v2. Een concept, een
// pre-release of een tag die geen versie is, telt niet.
//
// Het portaal is een statische site: de browser vraagt de releases aan de API van GitHub, die dat zonder aanmelden
// toelaat (CORS), tot 60 keer per uur per IP-adres. Daarom onthoudt de browser het antwoord een uur. Lukt het niet, dan
// geldt wat de browser nog weet, ook als het ouder is; weet hij niets, dan faalt het, en toont de pagina een link naar
// de releases.

// De releases staan van nieuw naar oud: de hoogste versie zit bij de honderd nieuwste.
export const RELEASES_API = 'https://api.github.com/repos/milieuinfo/flux-web-components/releases?per_page=100';

// Wat de pagina van een release toont: de versie zonder v, de link naar de release op GitHub en de datum.
export interface Release {
    version: string;
    url: string;
    date: string;
}

// Wat de API van GitHub over een release geeft, voor zover het portaal het gebruikt.
export interface GitHubRelease {
    tag_name: string;
    html_url: string;
    published_at: string | null;
    draft: boolean;
    prerelease: boolean;
}

const VERSION = /^v?(\d+)\.(\d+)\.(\d+)$/;

export const CACHE_KEY = 'flux-latest-release';
export const CACHE_TTL = 60 * 60 * 1000;

interface Cached {
    at: number;
    release: Release;
}

// De release met de hoogste versie, of null als er geen is.
export function highestRelease(releases: GitHubRelease[]): Release | null {
    let best: { parts: number[]; release: Release } | null = null;
    for (const release of releases) {
        const match = VERSION.exec(release.tag_name);
        if (!match || release.draft || release.prerelease || !release.published_at) continue;
        const parts = match.slice(1).map(Number);
        if (!best || compareVersions(parts, best.parts) > 0) {
            best = { parts, release: { version: parts.join('.'), url: release.html_url, date: release.published_at } };
        }
    }
    return best?.release ?? null;
}

function compareVersions(a: number[], b: number[]): number {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
}

export interface Options {
    fetch?: typeof fetch;
    storage?: Storage | null;
    now?: number;
}

// De nieuwste release: uit wat de browser onthield, als dat minder dan een uur oud is, en anders van GitHub.
export async function latestRelease({
    fetch: get = fetch.bind(globalThis),
    storage = localStore(),
    now = Date.now(),
}: Options = {}): Promise<Release> {
    const cached = read(storage);
    if (cached && now - cached.at < CACHE_TTL) return cached.release;
    try {
        const response = await get(RELEASES_API, { headers: { Accept: 'application/vnd.github+json' } });
        if (!response.ok) throw new Error(`GitHub antwoordt ${response.status}`);
        const release = highestRelease((await response.json()) as GitHubRelease[]);
        if (!release) throw new Error('Geen release gevonden');
        write(storage, { at: now, release });
        return release;
    } catch (error) {
        if (cached) return cached.release;
        throw error;
    }
}

// localStorage kan ontbreken of een fout geven, zoals in een privévenster: dan onthoudt de browser niets.
function localStore(): Storage | null {
    try {
        return globalThis.localStorage ?? null;
    } catch {
        return null;
    }
}

function read(storage: Storage | null): Cached | null {
    try {
        const cached = JSON.parse(storage?.getItem(CACHE_KEY) ?? 'null') as Cached | null;
        return cached && typeof cached.at === 'number' && VERSION.test(cached.release?.version) ? cached : null;
    } catch {
        return null;
    }
}

function write(storage: Storage | null, cached: Cached): void {
    try {
        storage?.setItem(CACHE_KEY, JSON.stringify(cached));
    } catch {
        // Vol of geweigerd: de volgende keer vraagt de browser het opnieuw.
    }
}
