/** Archivos bajo `public/` (sirven en la raíz del sitio). Respeta `base` en GitHub Pages. */
export function publicAsset(relativePath: string): string {
  const trimmed = relativePath.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${trimmed}`;
}
