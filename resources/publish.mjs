// Publiceert het portaal op GitHub Pages: test, bouwt met de basis van de site en zet de build op de branch gh-pages,
// die GitHub Pages publiceert. Zo doet flux-prototypes het ook: GitHub Actions staat uit in de organisatie milieuinfo.
//
//   pnpm run publish:pages
//
// De site hoort bij een commit: het script weigert met wijzigingen die niet gecommit zijn, en buiten main of als main
// niet gepusht is. Het draait eerst lint, typecheck, de unit tests en de componenttests. De build komt als een nieuwe
// commit op gh-pages, met de commit van main in zijn boodschap; de geschiedenis van gh-pages blijft. Het werk gebeurt
// in een tijdelijke worktree, buiten de repo.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BRANCH = 'gh-pages';
// De basis van de site op GitHub Pages: https://milieuinfo.github.io/flux/.
const BASE = '/flux/';

const run = (command, args, options = {}) => execFileSync(command, args, { cwd: root, stdio: 'inherit', ...options });
const git = (args, cwd = root) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();

function stop(message) {
    console.error(`Niet gepubliceerd: ${message}`);
    process.exit(1);
}

if (git(['status', '--porcelain'])) stop('commit eerst je wijzigingen, de site hoort bij een commit.');
if (git(['rev-parse', '--abbrev-ref', 'HEAD']) !== 'main') stop('publiceer vanaf main.');
git(['fetch', '--quiet', 'origin']);
if (git(['rev-parse', 'HEAD']) !== git(['rev-parse', 'origin/main'])) {
    stop('main is niet gelijk met origin/main; push of pull eerst.');
}

for (const script of ['lint', 'typecheck', 'test', 'ct-ci']) run('pnpm', ['run', script]);
run('pnpm', ['run', 'build', '--env', `base=${BASE}`]);

const commit = git(['rev-parse', '--short', 'HEAD']);
const subject = git(['log', '-1', '--format=%s']);
const remoteBranch = git(['ls-remote', '--heads', 'origin', BRANCH]) !== '';
const worktree = mkdtempSync(join(tmpdir(), 'flux-gh-pages-'));

try {
    // Op de laatste publicatie verder bouwen, of de eerste keer een branch zonder geschiedenis van main.
    if (remoteBranch) {
        git(['fetch', '--quiet', 'origin', BRANCH]);
        git(['worktree', 'add', '--quiet', '--detach', worktree, `origin/${BRANCH}`]);
    } else {
        git(['worktree', 'add', '--quiet', '--detach', worktree]);
        git(['checkout', '--quiet', '--orphan', BRANCH], worktree);
    }
    // De vorige build eruit, de nieuwe erin; de eerste keer de bestanden van main, die na --orphan klaarstaan, en die
    // laat git rm enkel met --force los. Zonder Jekyll: GitHub Pages toont de bestanden zoals ze zijn.
    git(['rm', '-r', '--force', '--quiet', '--ignore-unmatch', '.'], worktree);
    cpSync(join(root, 'dist'), worktree, { recursive: true });
    writeFileSync(join(worktree, '.nojekyll'), '');
    git(['add', '--all'], worktree);
    if (!git(['status', '--porcelain'], worktree)) {
        console.log(`De site op ${BRANCH} is al die van ${commit}: niets te publiceren.`);
    } else {
        git(['commit', '--quiet', '-m', `Portaal, gebouwd uit ${commit}: ${subject}`], worktree);
        run('git', ['push', '--quiet', 'origin', `HEAD:${BRANCH}`], { cwd: worktree });
        console.log(`Gepubliceerd op ${BRANCH}, uit ${commit}: https://milieuinfo.github.io${BASE}`);
        console.log('GitHub Pages zet de site binnen een minuut of twee online.');
    }
} finally {
    git(['worktree', 'remove', '--force', worktree]);
}
