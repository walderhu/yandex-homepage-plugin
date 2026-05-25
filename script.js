const TILE_STORAGE_KEY = "homepage.tiles.v1";
const DEFAULT_PLACEHOLDER_IMAGE = "assets/icon.png";

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
];

const tilesEl = document.querySelector(".tiles");
const menuEl = document.querySelector(".tile-menu");
const dialogEl = document.querySelector(".tile-dialog");
const formEl = document.querySelector(".tile-form");
const dialogTitleEl = document.querySelector("#tile-dialog-title");
const titleInput = document.querySelector(".tile-title-input");
const urlInput = document.querySelector(".tile-url-input");
const imageInput = document.querySelector(".tile-image-input");
const previewImg = document.querySelector(".tile-preview-img");
const pasteToggle = document.querySelector(".tile-paste-toggle");
const fileButton = document.querySelector(".tile-file-button");
const cancelButton = document.querySelector(".tile-cancel");

let tiles = loadTiles();
let activeIndex = null;
let selectedImage = "";

renderTiles();

tilesEl.addEventListener("click", (event) => {
  const tileEl = event.target.closest(".tile");
  if (!tileEl) return;

  if (tileEl.classList.contains("placeholder")) {
    event.preventDefault();
    openTileDialog(null);
  }
});

tilesEl.addEventListener("contextmenu", (event) => {
  const tileEl = event.target.closest(".tile");
  if (!tileEl) return;

  const index = Number(tileEl.dataset.index);
  if (tileEl.classList.contains("placeholder") || !tiles[index]) return;

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
    tiles.splice(tileIndex, 1);
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

dialogEl.addEventListener("paste", handleDialogPaste);

cancelButton.addEventListener("click", () => {
  dialogEl.close();
});

urlInput.addEventListener("input", () => {
  if (!selectedImage) {
    updateImagePreview(faviconUrl(normalizeUrl(urlInput.value.trim())));
  }
});

pasteToggle.addEventListener("click", () => {
  readImageFromClipboard();
  dialogEl.focus();
});

fileButton.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", async () => {
  const file = imageInput.files?.[0];
  if (!file || !file.type.startsWith("image/")) return;

  selectedImage = await readFileAsDataUrl(file);
  updateImagePreview(selectedImage);
});

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const isEditing = activeIndex !== null;

  const tile = {
    title: titleInput.value.trim(),
    url: normalizeUrl(urlInput.value.trim()),
    image: selectedImage,
  };

  if (isEditing) {
    tiles[activeIndex] = tile;
  } else {
    tiles.push(tile);
  }

  saveTiles();
  renderTiles();
  dialogEl.close();
});

function loadTiles() {
  try {
    const savedTiles = JSON.parse(localStorage.getItem(TILE_STORAGE_KEY));
    if (Array.isArray(savedTiles)) {
      return savedTiles.filter(Boolean);
    }
  } catch {
    localStorage.removeItem(TILE_STORAGE_KEY);
  }

  return defaultTiles;
}

function saveTiles() {
  localStorage.setItem(TILE_STORAGE_KEY, JSON.stringify(tiles.filter(Boolean)));
}

function renderTiles() {
  const renderedTiles = tiles.map(renderTile);
  renderedTiles.push(renderPlaceholderTile());
  tilesEl.replaceChildren(...renderedTiles);
}

function renderTile(tile, index) {
  const link = document.createElement("a");
  link.className = "tile";
  link.href = tile.url;
  link.dataset.index = index;

  const icon = document.createElement("span");
  icon.className = "icon tile-photo";

  const img = document.createElement("img");
  img.src = tile.image || faviconUrl(tile.url) || DEFAULT_PLACEHOLDER_IMAGE;
  img.alt = "";
  img.loading = "lazy";
  icon.append(img);

  const caption = document.createElement("span");
  caption.className = "caption";
  caption.textContent = tile.title;

  link.append(icon, caption);
  return link;
}

function renderPlaceholderTile() {
  const button = document.createElement("button");
  button.className = "tile placeholder";
  button.type = "button";
  button.setAttribute("aria-label", "Добавить плитку");
  return button;
}

function openTileDialog(index) {
  activeIndex = index;
  const tile = index === null ? {} : tiles[index] || {};

  dialogTitleEl.textContent = tile.url ? "Изменить плитку" : "Добавить плитку";
  titleInput.value = tile.title || "";
  urlInput.value = tile.url || "";
  imageInput.value = "";
  selectedImage = tile.image || "";
  updateImagePreview(selectedImage || faviconUrl(tile.url || ""));

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

function updateImagePreview(src) {
  const isPlaceholder = !src;
  previewImg.src = isPlaceholder ? DEFAULT_PLACEHOLDER_IMAGE : src;
  previewImg.classList.toggle("is-placeholder", isPlaceholder);
  previewImg.hidden = false;
}

async function readImageFromClipboard() {
  try {
    if (navigator.clipboard?.read) {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const imageType = item.types.find((type) => type.startsWith("image/"));
        if (!imageType) continue;

        const blob = await item.getType(imageType);
        selectedImage = await readFileAsDataUrl(blob);
        updateImagePreview(selectedImage);
        return;
      }
    }

    if (navigator.clipboard?.readText) {
      const text = (await navigator.clipboard.readText()).trim();
      if (text) {
        selectedImage = text;
        updateImagePreview(selectedImage);
        return;
      }
    }
  } catch (error) {
    console.error(error);
  }

  alert("Не удалось прочитать фото или ссылку из буфера.");
}

async function handleDialogPaste(event) {
  const item = readPastedData(event.clipboardData);
  if (!item) return;

  event.preventDefault();
  await applyClipboardItem(item);
}

function readPastedData(data) {
  let imageFile = null;

  for (const item of data.items) {
    if (item.type.startsWith("image/")) {
      imageFile = item.getAsFile();
    }
  }

  if (imageFile) {
    return { type: "image", file: imageFile };
  }

  const text = data.getData("text/plain").trim();
  return text ? { type: "text", text } : null;
}

async function applyClipboardItem(item) {
  if (item.type === "image") {
    selectedImage = await readFileAsDataUrl(item.file);
  } else {
    selectedImage = item.text;
  }

  updateImagePreview(selectedImage);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}
