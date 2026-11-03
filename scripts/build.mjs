import { build } from 'vite';
import { prepareNetlify } from './prepare-netlify.mjs';

// Programmatic build that always exits: lingering handles after prerender can't hang CI.
try {
  await build();
  if (process.env.NETLIFY === 'true') await prepareNetlify();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
