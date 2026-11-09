import { appPath, BUILT_PAGES, documentTitle, href, NAVIGATION, resolve, routes } from './router';

test('elke pagina van het portaal, ook met een / op het einde', () => {
    expect(resolve('/')).toEqual({ page: 'home', title: 'Start' });
    expect(resolve('/wegwijzer')).toEqual({ page: 'wegwijzer', title: 'Wegwijzer' });
    expect(resolve('/wegwijzer/').page).toBe('wegwijzer');
    expect(resolve('/onbekend').page).toBe('unknown');
    expect(resolve('/onbekend/').page).toBe('unknown');
});

test('het pad binnen het portaal, onder de basis van GitHub Pages en lokaal', () => {
    expect(appPath('/flux/', '/flux/')).toBe('/');
    // Zonder / op het einde: GitHub Pages leidt /flux om naar /flux/, maar de app moet het ook kennen.
    expect(appPath('/flux', '/flux/')).toBe('/');
    expect(appPath('/flux/teams', '/flux/')).toBe('/teams');
    expect(appPath('/flux-mcp/', '/flux/')).toBeNull();
    expect(appPath('/andere-repo/', '/flux/')).toBeNull();
    expect(appPath('/', '/')).toBe('/');
    expect(appPath('/teams', '/')).toBe('/teams');
});

test('de url van een pagina, onder de basis', () => {
    expect(href('/', '/flux/')).toBe('/flux/');
    expect(href('/teams#start', '/flux/')).toBe('/flux/teams#start');
    expect(href('/', '/')).toBe('/');
});

test('de titel van het tabblad', () => {
    expect(documentTitle(resolve('/'))).toBe('Flux');
    expect(documentTitle(resolve('/wegwijzer'))).toBe('Wegwijzer · Flux');
    expect(documentTitle(resolve('/onbekend'))).toBe('Niet gevonden · Flux');
});

// Een pagina zonder eigen index.html geeft op GitHub Pages een 404, ook al kent de app ze.
test('elke pagina heeft haar eigen index.html, en staat in het menu', () => {
    expect([...BUILT_PAGES].sort()).toEqual(routes().sort());
    for (const [path] of NAVIGATION) expect(routes()).toContain(path);
});
