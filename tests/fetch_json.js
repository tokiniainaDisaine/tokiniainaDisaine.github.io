// --------- Fetch & render seed data into <main> ---------
// Note: Browsers block fetch of local files when opened via file://.
// Run a local server during development (e.g., `npx http-server` or `python -m http.server`).

const SEED_URL = "./seeds/seed.json";

async function fetchBooks() {
  try {
    const res = await fetch(SEED_URL, { cache: "no-store" });
    if (!res.ok)
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching seed data:", err);
    throw err;
  }
}

function formatNumber(n) {
  return n.toLocaleString();
}

function createBookSection(book) {
  const section = document.createElement("section");
  section.className = "book";

  const bookInfo = document.createElement("div");
  bookInfo.className = "book-info";

  const cover = document.createElement("div");
  cover.className = "book-cover";
  const img = document.createElement("img");
  // try a filename based on id or title; fallback to a generic placeholder if missing
  img.src = `assets/book_covers/${book.id || book.title || "placeholder"}.jpg`;
  img.alt = `${book.title} cover`;
  cover.appendChild(img);

  const about = document.createElement("div");
  about.className = "book-about";

  const title = document.createElement("h3");
  title.className = "title";
  title.textContent = book.title || "Untitled";

  const author = document.createElement("h3");
  author.className = "author";
  author.textContent = book.author || "Unknown";

  const pages = document.createElement("p");
  pages.className = "pages";
  pages.textContent = book.pages ? `${book.pages} pages` : "—";

  const tags = document.createElement("ul");
  tags.className = "book-tags";
  if (book.tag) {
    const li = document.createElement("li");
    li.textContent = book.tag;
    tags.appendChild(li);
  }

  const views = document.createElement("p");
  views.className = "views muted";
  views.textContent = `Views: ${formatNumber(book.views || 0)}`;

  about.appendChild(title);
  about.appendChild(author);
  about.appendChild(pages);
  about.appendChild(tags);
  about.appendChild(views);

  bookInfo.appendChild(cover);
  bookInfo.appendChild(about);

  const moreBtn = document.createElement("button");
  moreBtn.className = "more";
  const moreImg = document.createElement("img");
  moreImg.src = "assets/more.png";
  moreImg.alt = "more";
  moreBtn.appendChild(moreImg);

  section.appendChild(bookInfo);
  section.appendChild(moreBtn);

  return section;
}

async function renderBooks() {
  const main = document.querySelector("main");
  if (!main) return;

  // const loading = document.createElement('p');
  // loading.textContent = 'Loading books...';
  // main.innerHTML = '';
  // main.appendChild(loading);

  try {
    const books = await fetchBooks();
    // main.innerHTML = '';
    books.forEach((book) => {
      const node = createBookSection(book);
      main.appendChild(node);
    });
  } catch (err) {
    main.innerHTML = "<p>Failed to load books. Check console for details.</p>";
  }
}

const currentPath = window.location.pathname;

const pathSegments = currentPath.split("/");
const pageName = pathSegments[pathSegments.length - 1];

if (pageName === "index.html") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderBooks);
  } else {
    renderBooks();
  }
} else return;
