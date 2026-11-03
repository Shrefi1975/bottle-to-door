import { cp, mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Build-time only: publish static files, never the generated server bundle.
export async function prepareNetlify(dist = resolve('dist')) {
  const client = join(dist, 'client');
  const html = await readFile(join(client, 'index.html'), 'utf8');
  if (!/<html[\s>]/i.test(html)) {
    throw new Error('Netlify export requires a prerendered dist/client/index.html.');
  }
  const staging = await mkdtemp(join(tmpdir(), 'water-netlify-'));
  try {
    await cp(client, staging, { recursive: true });
    for (const entry of await readdir(dist)) {
      await rm(join(dist, entry), { recursive: true, force: true });
    }
    await cp(staging, dist, { recursive: true });
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
  console.log('Netlify static export ready: dist/index.html');
}

const entry = process.argv[1];
if (entry && import.meta.url === pathToFileURL(resolve(entry)).href && process.env.NETLIFY === 'true') {
  await prepareNetlify();
}