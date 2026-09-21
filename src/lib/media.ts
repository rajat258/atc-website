/**
 * Builds a URL for a file in public/media.
 *
 * Anchored to Vite's BASE_URL rather than written as a relative path, so an
 * image resolves the same whether the page is served from the site root, a
 * GitHub Pages subdirectory, or a deep route with a trailing slash. A plain
 * "./media/x.jpg" breaks on the last of those.
 *
 * The trailing slash is enforced here as well as in vite.config, because a
 * base of "/atc-website" rather than "/atc-website/" silently produces
 * "/atc-websitemedia/..." and every image on the site 404s.
 */
const BASE = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const media = (file: string): string => `${BASE}media/${file}`;
