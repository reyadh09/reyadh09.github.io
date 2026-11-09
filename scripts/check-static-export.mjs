import assert from 'node:assert/strict';
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const output = resolve('dist/client');
const routes = ['about-me', 'research', 'lab', 'cv'];
// Vinext's trailingSlash export currently skips redirecting routes. Export
// without redirects, then provide directory indexes for GitHub Pages URLs.
for (const route of routes) {
  const target = join(output, route, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await copyFile(join(output, `${route}.html`), target);
}
await writeFile(join(output, '.nojekyll'), '');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    assert.ok(!entry.isSymbolicLink(), `Unexpected symlink: ${entry.name}`);
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const files = await walk(output);
const paths = new Set(files.map(path => path.slice(output.length + 1)));
for (const path of paths) {
  assert.ok(!/(^|\/)(README[^/]*|\.git|\.env[^/]*|package[^/]*|app|scripts|tests)(\/|$)/i.test(path), `Private file in export: ${path}`);
  assert.ok(!/\.(md|tsx?|map|ya?ml|toml)$/i.test(path), `Source file in export: ${path}`);
}

for (const path of ['index.html', ...routes.map(route => `${route}/index.html`)]) {
  const html = await readFile(join(output, path), 'utf8');
  assert.match(html, /Seong-ho Lee/);
  assert.doesNotMatch(html, /site-creator-vinext-starter|ChatGPTAuthProvider/);
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const url = match[1].split(/[?#]/)[0];
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    const target = url.replace(/^\//, '').replace(/\/$/, '');
    assert.ok(paths.has(target) || paths.has(`${target}/index.html`) || (!target && paths.has('index.html')), `Missing asset or route ${url} in ${path}`);
  }
}
const cv = await readFile(join(output, 'cv/index.html'), 'utf8');
assert.match(cv, /Print \/ Save PDF/);
assert.doesNotMatch(cv, /class="site-header"|Welcome!|Current members|Google Scholar/);
const home = await readFile(join(output, 'index.html'), 'utf8');
assert.match(home, /href="\/cv" target="_blank"/);
console.log(`Verified ${routes.length + 1} pages and ${files.length} public files; README, source files and source maps excluded.`);
