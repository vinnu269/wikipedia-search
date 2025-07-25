const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const spinner = document.getElementById("spinner");
const clearBtn = document.getElementById("clearBtn");
const scrollBtn = document.getElementById("scrollToTop");

function createResultCard(result) {
  const card = document.createElement("div");
  card.className = "result-card";

  const title = document.createElement("a");
  title.href = result.link;
  title.target = "_blank";
  title.textContent = result.title;
  title.className = "result-title";

  const url = document.createElement("a");
  url.href = result.link;
  url.target = "_blank";
  url.className = "result-url";
  url.textContent = result.link;

  const desc = document.createElement("p");
  desc.className = "link-description";
  desc.textContent = result.description;

  card.appendChild(title);
  card.appendChild(url);
  card.appendChild(desc);
  searchResults.appendChild(card);
}

function displayResults(results) {
  searchResults.innerHTML = "";
  spinner.classList.add("d-none");

  if (results.length === 0) {
    searchResults.innerHTML = `<p class="text-center text-light font-weight-bold">🙁 No results found. Try another keyword.</p>`;
    return;
  }

  results.forEach(createResultCard);
  scrollBtn.classList.remove("d-none");
}

function fetchResults(query) {
  if (!query.trim()) {
    searchResults.innerHTML = `<p class="text-center text-white font-weight-bold">⚠️ Please enter a search term.</p>`;
    return;
  }

  spinner.classList.remove("d-none");
  searchResults.innerHTML = "";

  fetch(`https://apis.ccbp.in/wiki-search?search=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      displayResults(data.search_results);
    })
    .catch(() => {
      spinner.classList.add("d-none");
      searchResults.innerHTML = `<p class="text-center text-danger">Something went wrong. Try again later.</p>`;
    });
}

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchResults(searchInput.value);
  }
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchResults.innerHTML = "";
  scrollBtn.classList.add("d-none");
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
