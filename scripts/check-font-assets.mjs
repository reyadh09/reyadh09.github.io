import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function cssFiles(directory) {
  const files = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) files.push(...await cssFiles(path));
    else if (path.endsWith('.css')) files.push(path);
  }
  return files;
}

const css = (await Promise.all((await cssFiles('dist/client')).map(path => readFile(path, 'utf8')))).join('\n');
const faces = [...css.matchAll(/@font-face\s*\{([^}]+)\}/g)]
  .map(match => match[1]).filter(face => face.includes('Cormorant Garamond'));
assert.equal(faces.length, 2, 'The deployed CSS must contain exactly two Garamond faces');
for (const style of ['normal', 'italic']) {
  const face = faces.find(rule => new RegExp(`font-style:\\s*${style}(?:;|$)`).test(rule));
  assert.ok(face, `Missing ${style} face`);
  assert.match(face, /font-weight:\s*600(?:;|$)/);
  assert.match(face, /font-display:\s*block(?:;|$)/);
  const embedded = face.match(/data:font\/woff2;base64,([A-Za-z0-9+/=]+)/);
  assert.ok(embedded, `${style} font must be embedded, not requested separately`);
  const suffix = style === 'italic' ? '-italic' : '';
  const original = await readFile(`app/fonts/cormorant-garamond/cormorant-garamond-semibold${suffix}.woff2`);
  assert.deepEqual(Buffer.from(embedded[1], 'base64'), original, `${style} font bytes changed`);
}
assert.doesNotMatch(await readFile('app/layout.tsx', 'utf8'), /as="font"/, 'Do not preload duplicate external font assets');
console.log('Verified two embedded Garamond 600 faces, correct bytes, block display, and no duplicate font preloads.');
