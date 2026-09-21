/**
 * Builds a URL for a file in public/media.
 *
 * Anchored to Vite's BASE_URL rather than written as a relative path, so an
 * image resolves the same whether the page is served from the site root, a
 * GitHub Pages subdirectory, or a deep route with a trailing slash. A plain
 * "./media/x.jpg" breaks on the last of those.
 */
export const media = (file: string): string =>
  `${import.meta.env.BASE_URL}media/${file}`;
