# Pokédex

Browse, filter, compare and favourite Pokémon. A React single-page app built on [PokeAPI](https://pokeapi.co), with Google sign-in and per-user favourites stored in Firebase.

## Features

- **Browse** the National Dex with paginated, shareable URLs (`/?page=3`) and a generation filter (`/?generation=2`).
- **Compare** up to four Pokémon in a side-by-side table: stat bars with the best value in each row highlighted, abilities, and moves summarised (counts and shared moves) instead of listed in full. The selection persists across reloads.
- **Detail pages** themed by primary type, with flavour text, base stats, breeding and training info, a searchable moves panel with tabs for how each move is learned (taken from the most recent main-series game), previous/next navigation and the Pokémon's cry.
- **Favourites** saved to Firestore per Google account, updated optimistically.
- Responsive from 375px up, keyboard accessible, and respects `prefers-reduced-motion`.

## Tech stack

| Area    | Choice                                                      |
| ------- | ----------------------------------------------------------- |
| UI      | React 19, React Router 7 (data router)                      |
| State   | Redux Toolkit 2, RTK Query for all server data              |
| Backend | Firebase Auth (Google) and Cloud Firestore                  |
| Styling | Sass, BEM-style components, ITCSS-ordered global layers     |
| Tooling | Vite 8, Vitest 5 and Testing Library, ESLint 10, Prettier 3 |

## Getting started

Requires **Node 22.12+** and **npm 11+**. npm 10 has an install bug with Vitest's optional peer dependencies; run `npx npm@11 install` if you're on npm 10.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script            | What it does                                             |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server                                |
| `npm run build`   | Production build to `dist/`                              |
| `npm run preview` | Serve the production build locally                       |
| `npm test`        | Run the tests in watch mode                              |
| `npm run lint`    | ESLint, including the React Compiler–aware hooks rules   |
| `npm run format`  | Format everything with Prettier                          |
| `npm run check`   | Lint, format check, tests and build (what CI should run) |

## Architecture

```
src/
├── app/          store, routes, root layout, error/404 page
├── features/     one folder per domain: state, data access and hooks
│   ├── pokemon/      RTK Query API for PokeAPI, multi-Pokémon hook
│   ├── compare/      compare slice, localStorage persistence, toggle hook
│   ├── favourites/   RTK Query API over Firestore, optimistic updates
│   └── auth/         user slice, Firebase auth listener
├── pages/        one component per route
├── components/   presentational and composite UI
├── lib/          Firebase setup (Firestore is lazy-loaded)
├── utils/        pure formatting and data helpers
├── styles/       Sass: abstracts (no output), global site.scss, components
└── test/         test setup, render helper, PokeAPI fakes
```

### Key decisions

**Server state lives in RTK Query, not in components.** Every PokeAPI request goes through one API slice, which provides caching (an hour, since the data is static), request de-duplication, loading and error states, and cancellation. Each Pokémon is a single cache entry shared by the listing, detail and compare pages. Removing a Pokémon from Compare doesn't refetch the others, and going back to a page you've seen is instant. Cards and pager links prefetch on hover and focus.

**Client state is minimal.** Redux holds only what isn't derivable: the compare selection and the signed-in user. Everything else (best stat in a row, shared moves, the current page) is computed during render.

**The URL is the source of truth for navigation state.** The page and generation filter are search params, so views can be shared and bookmarked, and the back button works.

**Favourites use the same pattern.** Firestore is wrapped in an RTK Query API with `fakeBaseQuery`. Adds and removes update the cached list immediately and roll back if the write is rejected. Mutations carry the user and Pokémon they started with, so navigating mid-save can't apply the result to the wrong page.

**Code is split where it pays off.** Every route except the landing page is lazy-loaded, and the Firestore SDK (the largest dependency) only loads when a signed-in user reads favourites. The first page needs about 160KB of gzipped JS.

**Styles don't duplicate.** `_abstracts.scss` contains only variables and mixins, and every component stylesheet `@use`s it. Global CSS lives in `site.scss`, which is imported once.

## Security

- **Firestore rules** ([`firestore.rules`](firestore.rules)) are versioned with the code. Users can only read and write their own favourites, and writes are validated (document name format, a single integer `id`). Deploy them with `firebase deploy --only firestore:rules`.
- **The Firebase web config is public by design.** It identifies the project but grants nothing. The API key should also be restricted to the site's domains in Google Cloud.
- **Persisted state is validated.** The compare selection read from `localStorage` is checked (name format, positive integer id, no duplicates, max four) before it reaches the store.
- **Dependencies:** `npm audit` reports 0 vulnerabilities. Two transitive packages are pinned to patched versions through `overrides` in `package.json`: `@grpc/grpc-js`, which Firestore pins to an old minor, and ESLint's `minimatch`.
- No `dangerouslySetInnerHTML`, and no inline scripts in `index.html`.

## Testing

Tests run against the real store, router and RTK Query layer, with `fetch` stubbed by small PokeAPI fakes ([`src/test/pokeApi.js`](src/test/pokeApi.js)) and Firebase mocked out. They cover:

- URL-driven pagination, page bounds, invalid params and cache reuse on back navigation
- generation filtering and ordering
- the compare table's best-value highlighting, request counts and removal without refetching
- optimistic favourites, including rollback on a rejected write
- `localStorage` validation against tampered data
- move grouping across game versions, and the formatters
- 404 handling, the legacy `/account` redirect and unknown Pokémon

## Credits

Data from [PokeAPI](https://pokeapi.co); sprites, artwork and cries from the [PokeAPI sprites](https://github.com/PokeAPI/sprites) and [cries](https://github.com/PokeAPI/cries) repositories. Pokémon and its names are trademarks of Nintendo, Game Freak and Creatures Inc. This is a non-commercial portfolio project.
