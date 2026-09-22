# ATC Group website

Marketing site for ATC Group, the Ahmedabad packaging group made up of
**Akshay FIBC** (new FIBC bulk bags, woven sacks) and **Akshay Trading Co.**
(reconditioned jumbo bags, paper sacks).

Static site. React + TypeScript, built by Vite, deployed to GitHub Pages by
GitHub Actions on every push to `main`.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npx tsc -b         # type check on its own
```

Node 20.19+ or 22.12+ is what CI uses. Anything from Node 18 up will run the
dev server.

---

## How the code is laid out

```
src/
  styles/
    tokens.css        Design tokens. Colour, type, space, motion, elevation.
    base.css          Reset, element defaults, shared primitives, reveal system.
  data/               All copy and catalogue content. Edit here, not in JSX.
    site.ts           Company facts, contact details, headline figures, nav.
    products.ts       Product catalogue and the two divisions.
    industries.ts     Sectors served and the bag each usually needs.
    capabilities.ts   Manufacturing process chain and build options.
    timeline.ts       Company milestones.
  hooks/
    useReveal.ts      Shared IntersectionObserver for scroll reveals.
    useCountUp.ts     Counts a figure up the first time it is seen.
    useScrolled.ts    True once the page has scrolled past a threshold.
    useScrollLock.ts  Freezes scroll while the mobile drawer is open.
  components/         Reusable pieces. One .tsx + one .module.css each.
  sections/           Home page bands.
  pages/              One file per route.
```

### The rules that keep it consistent

1. **No raw values in component CSS.** Every colour, font, size, space,
   radius, shadow and duration is a `var(--token)` from `tokens.css`. Reskin
   the whole site by editing that one file.
2. **Copy lives in `src/data`,** not inside components. Someone who has never
   written React can update a product description.
3. **One CSS Module per component.** Class names are camelCase and scoped, so
   there is no global cascade to reason about.
4. **Animation is CSS, driven by data attributes.** JavaScript only flips
   `data-revealed`; the stylesheet decides what that looks like. Nothing
   animates on the main thread.
5. **Every animation has a `prefers-reduced-motion` answer.** Content is never
   left invisible when motion is turned off.

### Adding a product

Add an entry to the `products` array in `src/data/products.ts`, drop the photo
into `public/media/`, and reference it by filename. The Products page, the
home page grid and the contact form dropdown all pick it up automatically.

---

## Design system

**Colour.** Deep forest green on cream, taken from the client's own profile
deck. Gold is the metallic from the primary logo lockup and is rationed:
section numbers, active states, hairline accents. Nothing else.

**Type.**
- `Outfit` for display. Geometric, and it echoes the circular construction of
  the AT monogram.
- `Inter` for body copy.
- `IBM Plex Mono` for labels, section numbers and specification tables. This
  is what gives the site its spec-sheet character and separates it from
  competitors who all use one humanist sans for everything.

**Type scale** is fluid. Every step interpolates with `clamp()` between a
360px phone and a 1440px desktop, so nothing jumps at a breakpoint.

**The logo** is rendered as a CSS mask over `currentColor`, not an `<img>`.
One asset serves cream, forest and photographic backgrounds, and it stays
crisp at any size.

---

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`:

1. Install with `npm ci`
2. Type check with `tsc -b`
3. Build with `BASE_PATH` set from the Pages configuration, so the same
   workflow serves a project site today and a custom domain later
4. Copy `index.html` to `404.html` so deep links work on a static host
5. Publish to GitHub Pages

Pull requests build but do not deploy, so a broken change is caught first.

### Moving to the real host later

The build is a folder of static files. Point any web server at `dist/`.

- **Custom domain on Pages:** add a `CNAME` file to `public/`. The workflow
  needs no change, because `base_path` becomes empty automatically.
- **Somewhere else entirely:** run `npm run build` with `BASE_PATH=/` and
  upload `dist/`. Configure the server to fall back to `index.html` for
  unknown paths, which is the same job `404.html` does on Pages.

---

## Before this goes live

See `CONTENT-TODO.md`. The short version: the certifications, the exact
address and the real product photography still need to come from the client.

---

## Checking responsive layout

```bash
npm run build && npm run preview     # in one terminal
node scripts/check-layout.mjs        # in another
node scripts/check-layout.mjs https://rajat258.github.io/atc-website/
```

Loads all five routes at eleven viewports from 320px to 1920px and fails on
anything that would make the page scroll sideways, or on a heading left
invisible by a reveal that never fired.

It lifts the `overflow-x` guard before measuring. Measuring with the guard in
place is how horizontal overflow goes unnoticed: the guard hides exactly what
you are looking for.
