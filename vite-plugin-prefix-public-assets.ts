import type { Plugin, ResolvedConfig } from "vite";

/**
 * En GitHub Pages el sitio vive bajo /NombreRepo/. Las rutas absolutas
 * "/assets/..." apuntan a github.io/assets/... (404). Las reescribimos a
 * "/NombreRepo/assets/..." usando el `base` de Vite.
 */
export function prefixPublicAssetsPlugin(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "prefix-public-assets",
    apply: "build",
    configResolved(c) {
      config = c;
    },
    generateBundle(_options, bundle) {
      const base = config.base;
      const prefix = base.replace(/\/$/, "");
      if (!prefix) return;

      const rewrite = (code: string): string =>
        code
          .replace(/"\/assets\//g, `"${prefix}/assets/`)
          .replace(/'\/assets\//g, `'${prefix}/assets/`)
          .replace(
            new RegExp(String.fromCharCode(96) + "\\/assets\\/", "g"),
            String.fromCharCode(96) + prefix + "/assets/",
          )
          .replace(/src="assets\//g, `src="${prefix}/assets/`)
          .replace(/src='assets\//g, `src='${prefix}/assets/`)
          .replace(/public\/assets\//g, `${prefix}/assets/`)
          .replace(/url\(\/assets\//g, `url(${prefix}/assets/`)
          .replace(/url\("\/assets\//g, `url("${prefix}/assets/`)
          .replace(/url\('\/assets\//g, `url('${prefix}/assets/`);

      for (const chunk of Object.values(bundle)) {
        if (chunk.type === "chunk" && chunk.code) {
          chunk.code = rewrite(chunk.code);
        }
        if (chunk.type === "asset") {
          const name = chunk.fileName;
          if (name.endsWith(".map")) continue;
          if (
            typeof chunk.source === "string" &&
            (name.endsWith(".css") || name.endsWith(".html"))
          ) {
            chunk.source = rewrite(chunk.source);
          }
        }
      }
    },
  };
}
