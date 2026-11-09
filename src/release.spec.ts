import { CACHE_KEY, CACHE_TTL, GitHubRelease, highestRelease, latestRelease, Release, RELEASES_API } from './release';

const github = (tag: string, extra: Partial<GitHubRelease> = {}): GitHubRelease => ({
    tag_name: tag,
    html_url: `https://github.com/milieuinfo/flux-web-components/releases/tag/${tag}`,
    published_at: '2026-10-30T12:25:37Z',
    draft: false,
    prerelease: false,
    ...extra,
});

// Een localStorage in het geheugen, zoals die van de browser.
function memoryStorage(entries: Record<string, string> = {}): Storage {
    const items = new Map(Object.entries(entries));
    return {
        get length() {
            return items.size;
        },
        clear: () => items.clear(),
        getItem: (key) => items.get(key) ?? null,
        key: (index) => [...items.keys()][index] ?? null,
        removeItem: (key) => void items.delete(key),
        setItem: (key, value) => void items.set(key, value),
    };
}

const respond = (status: number, body: unknown) =>
    jest.fn(async () => new Response(JSON.stringify(body), { status })) as unknown as jest.Mock & typeof fetch;

const RELEASE: Release = {
    version: '2.22.0',
    url: 'https://github.com/milieuinfo/flux-web-components/releases/tag/v2.22.0',
    date: '2026-10-30T12:25:37Z',
};

describe('de hoogste release', () => {
    test('is de hoogste versie, niet de laatst gepubliceerde', () => {
        // Zoals op GitHub: 1.51.0 verscheen na 2.19.0.
        const releases = [github('v2.21.0'), github('v1.51.0'), github('v2.22.0'), github('v2.19.0'), github('v2.9.0')];
        expect(highestRelease(releases)).toEqual(RELEASE);
    });

    test('vergelijkt elk deel van de versie als getal', () => {
        expect(highestRelease([github('v2.9.9'), github('v2.10.0'), github('v2.10.0-rc.1')])?.version).toBe('2.10.0');
    });

    test('telt geen concept, pre-release of tag die geen versie is', () => {
        const releases = [
            github('v2.22.0'),
            github('v3.0.0', { draft: true }),
            github('v2.23.0', { prerelease: true }),
            github('v2.24.0', { published_at: null }),
            github('v9.0.0-beta.1'),
            github('nightly'),
        ];
        expect(highestRelease(releases)?.version).toBe('2.22.0');
    });

    test('is er niet zonder releases', () => {
        expect(highestRelease([])).toBeNull();
        expect(highestRelease([github('nightly')])).toBeNull();
    });
});

describe('de nieuwste release', () => {
    const now = Date.parse('2026-11-09T10:00:00Z');

    test('komt van GitHub, en de browser onthoudt ze', async () => {
        const storage = memoryStorage();
        const fetch = respond(200, [github('v2.21.0'), github('v2.22.0')]);
        await expect(latestRelease({ fetch, storage, now })).resolves.toEqual(RELEASE);
        expect(fetch).toHaveBeenCalledWith(RELEASES_API, expect.anything());
        expect(JSON.parse(storage.getItem(CACHE_KEY)!)).toEqual({ at: now, release: RELEASE });
    });

    test('komt binnen het uur uit wat de browser onthield, zonder GitHub', async () => {
        const storage = memoryStorage({ [CACHE_KEY]: JSON.stringify({ at: now - CACHE_TTL + 1, release: RELEASE }) });
        const fetch = respond(200, []);
        await expect(latestRelease({ fetch, storage, now })).resolves.toEqual(RELEASE);
        expect(fetch).not.toHaveBeenCalled();
    });

    test('komt na een uur opnieuw van GitHub', async () => {
        const old = { ...RELEASE, version: '2.21.0' };
        const storage = memoryStorage({ [CACHE_KEY]: JSON.stringify({ at: now - CACHE_TTL, release: old }) });
        const fetch = respond(200, [github('v2.22.0')]);
        await expect(latestRelease({ fetch, storage, now })).resolves.toEqual(RELEASE);
        expect(fetch).toHaveBeenCalled();
    });

    test('valt terug op wat de browser onthield als GitHub niet antwoordt, ook als het ouder is', async () => {
        const storage = memoryStorage({ [CACHE_KEY]: JSON.stringify({ at: now - 3 * CACHE_TTL, release: RELEASE }) });
        await expect(latestRelease({ fetch: respond(403, {}), storage, now })).resolves.toEqual(RELEASE);
    });

    test('faalt als GitHub niet antwoordt en de browser niets weet', async () => {
        await expect(latestRelease({ fetch: respond(403, {}), storage: memoryStorage(), now })).rejects.toThrow('403');
        await expect(latestRelease({ fetch: respond(200, []), storage: null, now })).rejects.toThrow('Geen release');
    });

    test('negeert wat de browser onthield als het geen release is', async () => {
        const storage = memoryStorage({ [CACHE_KEY]: '{"at": 1, "release": {"version": "x"}}' });
        await expect(latestRelease({ fetch: respond(200, [github('v2.22.0')]), storage, now })).resolves.toEqual(
            RELEASE,
        );
    });
});
