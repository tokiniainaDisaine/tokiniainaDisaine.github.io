# Book Notes & Vault

[Link to the live website](https://tokiniainadisaine.github.io/)

A small front-end-only app for tracking books and notes. It displays a "vault" of books, lets you add new book entries (persisted to localStorage), and includes a modal UI for creating a new book. The project is static and intended to be served as simple files (open `index.html` in a browser or use a static server).

---

## Features

- List books from a seed JSON file (`seeds/seed.json`).
- Add new books using a modal; new entries are stored in `localStorage` under the key `books_cache` so they persist across reloads.
- Click a book to open the vault page and store the selected book in `localStorage` under `selectedBook`.
- Responsive layout with a sidebar navigation and small-screen menu.

## Quick demo

1. Open `index.html` in your browser.
2. Click the "New Book Vault" card to open the create modal and add a book.
3. Click a book card to go to `pages/vault.html` where selected book details can be read and edited (if implemented).

## Project structure

Top-level files/folders:

- `index.html` — main page listing books.
- `assets/` — images and icons used by the app (book covers, icons).
- `pages/` — additional HTML pages (`vault.html`, `dashboard.html`, `settings.html`, `about.html`).
- `scripts/` — JavaScript modules for the UI (`main.js`, `vault.js`, etc.).
- `styles/` — CSS files for each page.
- `seeds/` — example JSON seed files with book data.
- `tests/` — simple HTML/JS files used for manual testing.

Important files:

- `scripts/main.js` — application entry point used on the index page; fetches seed data, renders book cards, and implements the "New Book" modal and localStorage caching.
- `seeds/seed.json` — default book list used when loading the app.

## How it works

- On load, `scripts/main.js` fetches `seeds/seed.json` (no-cache) and renders each book by creating DOM nodes.
- When creating a new book, the app saves the new entry to `localStorage.books_cache` and immediately prepends the new book to the DOM so it appears at the top of the vault.
- Clicking a book stores it in `localStorage.selectedBook` and navigates to `pages/vault.html` for viewing.

## Local development / Testing

This is a static site. You can open `index.html` directly in a modern browser, but using a simple static server is recommended to avoid CORS or file:// fetch quirks.

Using Python's simple server (works on Windows PowerShell):

```powershell
# from project root
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or using Node.js `http-server` (if installed):

```powershell
# from project root
npx http-server -c-1 -p 8000
# then open http://localhost:8000
```

Notes:

- The app fetches `seeds/seed.json` with `cache: 'no-store'`. If you make edits to the seed file, the simplest way to see changes is to restart the server or clear the browser cache.
- New books are stored in `localStorage.books_cache`; clear localStorage in the devtools Application tab if you want to reset.

## Accessibility & responsiveness

- The UI uses large tappable buttons and a keyboard-focusable modal.
- The `.new-book` button includes hover and focus-visible styles (see `styles/main.css`).

## Tests

Some ad-hoc test pages exist under the `tests/` folder for manual verification (chart test, fetch_json, etc.).

## Next improvements (suggestions)

- Replace PNG icons with inline SVG for crisp scaling and theme-friendly colors.
- Add form validation and better UX when creating books (e.g., show success toasts).
- Implement persistent server-side storage (backend) and sync between devices.
- Add unit tests (Jest) or E2E tests (Playwright) for critical UI flows.
- Improve image fallback: when a book cover is missing, show an SVG placeholder.

## Contributing

This is a small personal project. Feel free to open issues or create PRs that improve styling, accessibility, or add features.

When contributing:

1. Fork and create a branch for your feature.
2. Make small, focused changes and include details in the PR description.
3. Test across desktop and mobile widths.

## License

Add your preferred license here (default: MIT) or keep it private.

---

If you'd like, I can also:

- Add a `package.json` and simple dev scripts for running a static server and linting.
- Create a small screenshot gallery in the README.
- Add a CONTRIBUTING.md with more details.

Which follow-up would you like?
