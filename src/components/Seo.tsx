import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
};

/**
 * Sets the document title and meta description per route.
 *
 * Small enough not to justify a helmet dependency: the site has five pages
 * and no server rendering to reconcile with.
 */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = `${title} · ATC Group`;

    const set = (selector: string, attr: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute(attr, value);
    };

    set('meta[name="description"]', "content", description);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
  }, [title, description]);

  return null;
}
