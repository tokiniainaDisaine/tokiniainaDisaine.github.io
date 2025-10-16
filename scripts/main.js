function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

function showAddSection() {
  const modalHeader = document.querySelector(".modal-panel");
  modalHeader.style.display = "block";
}

function hideAddSection() {
  const modalHeader = document.querySelector(".modal-panel");
  modalHeader.style.display = "none";
}

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
  const bookSection = document.createElement("section");
  bookSection.className = "book";

  const bookInfo = document.createElement("div");
  bookInfo.className = "book-info";

  const bookCover = document.createElement("div");
  bookCover.className = "book-cover";

  const bookCoverImage = document.createElement("img");
  bookCoverImage.src = `assets/book_covers/${
    book.id || book.title || "placeholder"
  }.jpg`;
  bookCoverImage.alt = book.title;
  bookCover.appendChild(bookCoverImage);

  const bookAbout = document.createElement("div");
  bookAbout.className = "book-about";

  const title = document.createElement("h3");
  title.className = "title";
  title.textContent = book.title || "Untitled";

  const author = document.createElement("h3");
  author.className = "author";
  author.textContent = book.author || "No Author";

  const pages = document.createElement("p");
  pages.className = "pages";
  pages.textContent = book.pages ? `${book.pages} pages` : "—";

  const tags = document.createElement("ul");
  tags.className = "book-tags";
  if (book.tag) {
    const tag = document.createElement("li");
    tag.textContent = book.tag;
    tags.appendChild(tag);
  }

  const views = document.createElement("p");
  views.className = "views";
  views.textContent = `Views: ${formatNumber(book.views || 0)}`;

  bookAbout.appendChild(title);
  bookAbout.appendChild(author);
  bookAbout.appendChild(pages);
  bookAbout.appendChild(tags);
  bookAbout.appendChild(views);

  bookInfo.appendChild(bookCover);
  bookInfo.appendChild(bookAbout);

  const moreButton = document.createElement("button");
  moreButton.className = "more";

  const moreImg = document.createElement("img");
  moreImg.src = "./assets/more.png";
  moreImg.alt = "more";
  moreButton.appendChild(moreImg);

  const link = document.createElement('a');

  link.href = "vault.html";
  // link.textContent = `${book.title} — ${book.author}`;
  link.style.cursor = "pointer";

  link.onclick = (event) => {
    event.preventDefault();
    localStorage.setItem("selectedBook", JSON.stringify(book));
    window.location.href = "./pages/vault.html";
  };

  link.appendChild(bookInfo);
  bookSection.appendChild(link);
  bookSection.appendChild(moreButton);

  return bookSection;
}

async function renderBooks() {
  const main = document.querySelector("main");
  if (!main) return;

  try {
    const books = await fetchBooks();

    books.forEach((book) => {
      const node = createBookSection(book);
      main.appendChild(node);
    });
  } catch (err) {
    main.innerHTML =
      "<p>Failed to load books :(, check the console for more information.</p>";
  }
}

const pathname = window.location.pathname || "";
const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
const isIndexPage =
  filename === "" || filename === "index.html" || filename === "index";

if (isIndexPage) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderBooks);
  } else {
    renderBooks();
  }
}