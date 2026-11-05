// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Avoid Netlify auto-detecting a functions deployment: the page is static.
  // Lovable retains its own enforced Worker output when building here.
  nitro: {
    // node-server's bundle has no fetch export, so prerendering "/" fails off-Lovable.
    preset: "cloudflare-module",
    output: { dir: "dist", publicDir: "dist/client", serverDir: "dist/server" },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Prerender "/" to static HTML at build time so the site deploys to static
    // hosts. The build-time Netlify export promotes dist/client to dist.
    // Only "/" is static; discovery is off so no other route is prerendered.
    pages: [{ path: "/" }],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
