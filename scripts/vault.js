function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

const SEED_URL = "../seeds/seed.json";

// async function renderBooks() {
//   const main = document.querySelector("main");
//   if (!main) return;

//   try {
//     const books = await fetchBooks();

//     books.forEach((book) => {
//       const node = createBookSection(book);
//       main.appendChild(node);
//     });
//   } catch (err) {
//     main.innerHTML =
//       "<p>Failed to load books :(, check the console for more information.</p>";
//   }
// }

function loadNotes() {
  const stored = localStorage.getItem("selectedBook");

  if (!stored) {
    document.body.innerHTML = "<p>No book selected. Go back and pick one!</p>";
    return;
  }

  const book = JSON.parse(stored);

  return [book.notes, book.title];
}

function createNoteSection(note) {
  const section = document.createElement("section");
  section.className = "note";

  const noteInfo = document.createElement("div");
  noteInfo.className = "note-info";

  const about = document.createElement("div");
  about.className = "note-about";

  const page = document.createElement("p");
  page.className = "page";
  page.textContent = `page ${note.page}`;

  const quote = document.createElement("p");
  quote.className = "quote";
  quote.textContent = `${note.text}`;

  about.appendChild(page);

  noteInfo.appendChild(about);
  noteInfo.appendChild(quote);

  const moreBtn = document.createElement("button");
  moreBtn.className = "more";
  const moreImg = document.createElement("img");
  moreImg.src = "../assets/more.png";
  moreImg.alt = "more";
  moreBtn.appendChild(moreImg);

  section.appendChild(noteInfo);
  section.appendChild(moreBtn);

  return section;
}

async function renderNotes() {
  const main = document.querySelector("main");
  if (!main) return;

  try {
    const notesData = loadNotes();
    if (!notesData) {
      main.innerHTML = "<p>No book selected. Go back and pick one!</p>";
      return;
    }

    const [notesArray, bookTitle] = notesData;

    main.innerHTML = "";
    const header = document.createElement("h1");
    header.textContent = bookTitle || "Notes";
    header.className = "book";
    main.appendChild(header);

    notesArray.forEach((note) => {
      const node = createNoteSection(note);
      main.appendChild(node);
    });
  } catch (err) {
    main.innerHTML =
      "<p>Failed to load notes :(, check the console for more information.</p>";
  }
}

const pathname = window.location.pathname || "";
const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
const isIndexPage = filename === "vault.html" || filename === "vault";

if (isIndexPage) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNotes);
  } else {
    renderNotes();
  }
}
