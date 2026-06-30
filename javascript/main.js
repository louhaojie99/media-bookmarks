import bookmarkData from "./data.js";

function renderBookmarks(data, searchQuery = "") {
  const container = document.getElementById("bookmark-container");
  container.innerHTML = "";

  const filteredData = data
    .map((category) => ({
      ...category,
      links: category.links.filter(
        (link) =>
          link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.url.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.links.length > 0);

  filteredData.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";

    if (category.category) {
      const headerDiv = document.createElement("div");
      headerDiv.className = "category-header px-3 mb-4";

      const title = document.createElement("h2");
      title.className = "text-xl font-semibold text-warm-text pl-4";
      title.textContent = category.category;

      headerDiv.appendChild(title);
      categoryDiv.appendChild(headerDiv);
    }

    const linksDiv = document.createElement("div");
    linksDiv.className = "space-y-3";

    category.links.forEach((link) => {
      const linkEl = document.createElement("a");
      linkEl.href = link.url;
      linkEl.target = "_blank";
      linkEl.className =
        "link-card flex items-center bg-warm-card rounded-xl p-4 border border-warm-border text-warm-text hover:border-warm-accent hover:bg-warm-bg";

      linkEl.innerHTML = `
        <div class="w-10 h-10 rounded-lg bg-warm-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
          <i class="fas fa-link text-warm-accent"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-medium truncate">${link.name}</div>
        </div>
        <i class="fas fa-external-link-alt text-warm-text-light text-sm flex-shrink-0"></i>
      `;

      linksDiv.appendChild(linkEl);
    });

    categoryDiv.appendChild(linksDiv);
    container.appendChild(categoryDiv);
  });

  if (filteredData.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <i class="fas fa-search text-warm-text-light text-4xl mb-4"></i>
        <p class="text-warm-text-light">未找到匹配的链接</p>
      </div>
    `;
  }
}

renderBookmarks(bookmarkData);

document.getElementById("search-input").addEventListener("input", (e) => {
  renderBookmarks(bookmarkData, e.target.value);
});
