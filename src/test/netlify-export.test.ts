// @vitest-environment node
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
// Build-time script is intentionally outside the application import graph.
// @ts-expect-error JavaScript build helper has no application type declarations.
import { prepareNetlify } from '../../scripts/prepare-netlify.mjs';

const temporary: string[] = [];
async function fixture() {
  const dist = await mkdtemp(join(tmpdir(), 'netlify-export-test-'));
  temporary.push(dist);
  await mkdir(join(dist, 'client', 'assets'), { recursive: true });
  await mkdir(join(dist, 'server'));
  await writeFile(join(dist, 'server', 'index.mjs'), 'private server bundle');
  return dist;
}
afterEach(async () => {
  await Promise.all(temporary.splice(0).map(path => rm(path, { recursive: true, force: true })));
});

describe('Netlify static export', () => {
  it('puts the prerendered page and assets at dist root without server files', async () => {
    const dist = await fixture();
    const html = '<html lang="ar"><body>مياه البيت</body></html>';
    await writeFile(join(dist, 'client', 'index.html'), html);
    await writeFile(join(dist, 'client', 'assets', 'water.webp'), 'image');
    await prepareNetlify(dist);
    expect(await readFile(join(dist, 'index.html'), 'utf8')).toBe(html);
    expect(await readFile(join(dist, 'assets', 'water.webp'), 'utf8')).toBe('image');
    expect((await readdir(dist)).sort()).toEqual(['assets', 'index.html']);
  });

  it('fails before deleting output when prerendered HTML is missing', async () => {
    const dist = await fixture();
    await expect(prepareNetlify(dist)).rejects.toThrow();
    expect(await readFile(join(dist, 'server', 'index.mjs'), 'utf8')).toBe('private server bundle');
  });
});