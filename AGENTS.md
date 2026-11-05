<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the static Netlify export in the build-only `scripts/prepare-netlify.mjs`: on Netlify it promotes prerendered client files to `dist` and removes server artifacts, while Lovable keeps its required output layout.
- Pin Nitro's external build target (a fetch-exporting preset such as cloudflare-module, never node-server) and client output explicitly: host auto-detection must not change the export directory, and prerender needs a fetch handler.
- Keep orderable pack data in the browser-safe product catalog shared by the order page and price tests, so displayed prices and regression checks use the same source.
