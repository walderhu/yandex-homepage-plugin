const TILE_STORAGE_KEY = "homepage.tiles.v1";
const TILE_COUNT = 4;

const defaultTiles = [
  {
    title: "ALL in ONE 2.4GHz Gadg...",
    url: "https://www.youtube.com/",
  },
  {
    title: "Настройка панели задач",
    url: "https://chatgpt.com/",
  },
  {
    title: "Extensions",
    url: "browser://extensions/",
  },
  null,
];

const tilesEl = document.querySelector(".tiles");
const menuEl = document.querySelector(".tile-menu");
const dialogEl = document.querySelector(".tile-dialog");
const formEl = document.querySelector(".tile-form");
const dialogTitleEl = document.querySelector("#tile-dialog-title");
const titleInput = document.querySelector(".tile-title-input");
const urlInput = document.querySelector(".tile-url-input");
const imageInput = document.querySelector(".tile-image-input");
const cancelButton = document.querySelector(".tile-cancel");

let tiles = loadTiles();
let activeIndex = null;

renderTiles();

tilesEl.addEventListener("click", (event) => {
  const tileEl = event.target.closest(".tile");
  if (!tileEl) return;

  const index = Number(tileEl.dataset.index);
  const tile = tiles[index];

  if (!tile) {
    event.preventDefault();
    openTileDialog(index);
  }
});

tilesEl.addEventListener("contextmenu", (event) => {
  const tileEl = event.target.closest(".tile");
  if (!tileEl) return;

  const index = Number(tileEl.dataset.index);
  if (!tiles[index]) return;

  event.preventDefault();
  activeIndex = index;
  showMenu(event.clientX, event.clientY);
});

menuEl.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  if (!action || activeIndex === null) return;

  const tileIndex = activeIndex;
  hideMenu();

  if (action === "edit") {
    openTileDialog(tileIndex);
  }

  if (action === "delete") {
    tiles[tileIndex] = null;
    saveTiles();
    renderTiles();
  }
});

document.addEventListener("click", (event) => {
  if (!menuEl.hidden && !event.target.closest(".tile-menu")) {
    hideMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideMenu();
  }
});

cancelButton.addEventListener("click", () => {
  dialogEl.close();
});

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (activeIndex === null) return;

  const existingTile = tiles[activeIndex] || {};
  const image = imageInput.files[0]
    ? await readFileAsDataUrl(imageInput.files[0])
    : existingTile.image || "";

  tiles[activeIndex] = {
    title: titleInput.value.trim(),
    url: normalizeUrl(urlInput.value.trim()),
    image,
  };

  saveTiles();
  renderTiles();
  dialogEl.close();
});

function loadTiles() {
  try {
    const savedTiles = JSON.parse(localStorage.getItem(TILE_STORAGE_KEY));
    if (Array.isArray(savedTiles)) {
      return [...savedTiles, ...Array(TILE_COUNT).fill(null)].slice(0, TILE_COUNT);
    }
  } catch {
    localStorage.removeItem(TILE_STORAGE_KEY);
  }

  return defaultTiles;
}

function saveTiles() {
  localStorage.setItem(TILE_STORAGE_KEY, JSON.stringify(tiles));
}

function renderTiles() {
  tilesEl.replaceChildren(...tiles.map(renderTile));
}

function renderTile(tile, index) {
  if (!tile) {
    const button = document.createElement("button");
    button.className = "tile placeholder";
    button.type = "button";
    button.dataset.index = index;
    button.setAttribute("aria-label", "Добавить плитку");
    return button;
  }

  const link = document.createElement("a");
  link.className = "tile";
  link.href = tile.url;
  link.dataset.index = index;

  const icon = document.createElement("span");
  icon.className = "icon tile-photo";

  const imageUrl = tile.image || faviconUrl(tile.url);
  if (imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "";
    img.loading = "lazy";
    icon.append(img);
  } else {
    icon.textContent = tile.title.trim().slice(0, 1).toUpperCase();
  }

  const caption = document.createElement("span");
  caption.className = "caption";
  caption.textContent = tile.title;

  link.append(icon, caption);
  return link;
}

function openTileDialog(index) {
  activeIndex = index;
  const tile = tiles[index] || {};

  dialogTitleEl.textContent = tile.url ? "Изменить плитку" : "Добавить плитку";
  titleInput.value = tile.title || "";
  urlInput.value = tile.url || "";
  imageInput.value = "";

  dialogEl.showModal();
  titleInput.focus();
}

function showMenu(x, y) {
  menuEl.hidden = false;
  menuEl.style.left = `${x}px`;
  menuEl.style.top = `${y}px`;
}

function hideMenu() {
  menuEl.hidden = true;
  activeIndex = null;
}

function normalizeUrl(value) {
  if (/^[a-z][a-z\d+.-]*:/i.test(value)) {
    return value;
  }

  return `https://${value}`;
}

function faviconUrl(value) {
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol)) return "";
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url.hostname)}&sz=64`;
  } catch {
    return "";
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}
