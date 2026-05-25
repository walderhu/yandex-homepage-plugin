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
const groupDialogEl = document.querySelector(".group-dialog");
const groupTitleEl = document.querySelector(".group-dialog-title");
const groupTilesEl = document.querySelector(".group-tiles");
const groupCloseButton = document.querySelector(".group-close");
const groupMenuEl = document.querySelector(".group-tile-menu");
const dialogEl = document.querySelector(".tile-dialog");
const formEl = document.querySelector(".tile-form");
const dialogTitleEl = document.querySelector("#tile-dialog-title");
const titleInput = document.querySelector(".tile-title-input");
const titleStatus = document.querySelector(".tile-title-status");
const urlInput = document.querySelector(".tile-url-input");
const imageInput = document.querySelector(".tile-image-input");
const previewImg = document.querySelector(".tile-preview-img");
const pasteToggle = document.querySelector(".tile-paste-toggle");
const fileButton = document.querySelector(".tile-file-button");
const cancelButton = document.querySelector(".tile-cancel");

let tiles = loadTiles();
let activeIndex = null;
let selectedImage = "";
let titleRequestController = null;
let titleRequestTimer = null;
let titleWasEnteredByUser = false;
let lastGeneratedTitle = "";
let draggedIndex = null;
let activeGroupIndex = null;
let draggedGroupTileIndex = null;
let activeGroupTileIndex = null;
let editingGroupIndex = null;
let editingGroupTileIndex = null;

renderTiles();

tilesEl.addEventListener("click", (event) => {
  const tileEl = event.target.closest(".tile");
  if (!tileEl) return;

  if (tileEl.classList.contains("placeholder")) {
    event.preventDefault();
    openTileDialog(null);
    return;
  }

  const index = Number(tileEl.dataset.index);
  const tile = tiles[index];
  if (tile?.type === "group") {
    event.preventDefault();
    openGroupDialog(index);
  }
});

tilesEl.addEventListener("dragstart", (event) => {
  const tileEl = event.target.closest(".tile[data-index]");
  const index = Number(tileEl?.dataset.index);
  if (!tileEl || !tiles[index]) {
    event.preventDefault();
    return;
  }

  draggedIndex = index;
  tileEl.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", String(index));
});

tilesEl.addEventListener("dragover", (event) => {
  const intent = getMainDropIntent(event);
  if (!intent) return;

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  clearDropTarget();
  intent.targetEl.classList.add(`is-${intent.mode}-target`);
});

tilesEl.addEventListener("dragleave", (event) => {
  const tileEl = event.target.closest(".tile");
  if (tileEl && !tileEl.contains(event.relatedTarget)) {
    clearDropClasses(tileEl);
  }
});

tilesEl.addEventListener("drop", (event) => {
  const intent = getMainDropIntent(event);
  clearDropTarget();
  if (!intent) return;

  event.preventDefault();
  if (intent.mode === "group") {
    createOrExtendGroup(draggedIndex, intent.targetIndex);
  } else {
    reorderTiles(draggedIndex, intent.targetIndex, intent.mode);
  }
});

tilesEl.addEventListener("dragend", () => {
  tilesEl.querySelector(".is-dragging")?.classList.remove("is-dragging");
  clearDropTarget();
  draggedIndex = null;
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
    if (tiles[tileIndex]?.type === "group") {
      openGroupDialog(tileIndex);
      groupTitleEl.focus();
      groupTitleEl.select();
    } else {
      openTileDialog(tileIndex);
    }
  }

  if (action === "delete") {
    if (tiles[tileIndex]?.type === "group"
      && !window.confirm("Удалить группу и все плитки внутри?")) {
      return;
    }

    tiles.splice(tileIndex, 1);
    saveTiles();
    renderTiles();
  }
});

document.addEventListener("click", (event) => {
  if (!menuEl.hidden && !event.target.closest(".tile-menu")) {
    hideMenu();
  }
  if (isGroupMenuOpen() && !event.target.closest(".group-tile-menu")) {
    hideGroupMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideMenu();
  }
});

dialogEl.addEventListener("paste", handleDialogPaste);
dialogEl.addEventListener("close", resetTitleLookup);
groupCloseButton.addEventListener("click", () => groupDialogEl.close());
groupTitleEl.addEventListener("change", saveGroupTitle);
groupTitleEl.addEventListener("blur", saveGroupTitle);
groupTitleEl.addEventListener("focus", () => groupTitleEl.select());
groupTitleEl.addEventListener("click", () => groupTitleEl.select());
groupTitleEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    groupTitleEl.blur();
  }
});
groupDialogEl.addEventListener("click", (event) => {
  if (event.target === groupDialogEl) groupDialogEl.close();
});
groupDialogEl.addEventListener("close", () => {
  hideGroupMenu();
  activeGroupIndex = null;
  draggedGroupTileIndex = null;
  groupDialogEl.classList.remove("is-extract-target");
});

groupTilesEl.addEventListener("contextmenu", (event) => {
  const tileEl = event.target.closest(".tile[data-group-index]");
  if (!tileEl) return;

  event.preventDefault();
  activeGroupTileIndex = Number(tileEl.dataset.groupIndex);
  showGroupMenu(event.clientX, event.clientY);
});

groupMenuEl.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  if (!action || activeGroupTileIndex === null) return;

  const groupIndex = activeGroupIndex;
  const tileIndex = activeGroupTileIndex;
  hideGroupMenu();

  if (action === "edit") {
    groupDialogEl.close();
    openGroupTileDialog(groupIndex, tileIndex);
  }

  if (action === "delete") {
    deleteTileFromGroup(groupIndex, tileIndex);
  }
});

groupTilesEl.addEventListener("dragstart", (event) => {
  const tileEl = event.target.closest(".tile[data-group-index]");
  if (!tileEl) return;

  draggedGroupTileIndex = Number(tileEl.dataset.groupIndex);
  tileEl.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", String(draggedGroupTileIndex));
});

groupTilesEl.addEventListener("dragover", (event) => {
  const targetEl = getGroupDropTarget(event.target);
  if (!targetEl) return;

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  clearGroupDropTarget();
  targetEl.classList.add("is-drop-target");
});

groupTilesEl.addEventListener("dragleave", (event) => {
  const tileEl = event.target.closest(".tile[data-group-index]");
  if (tileEl && !tileEl.contains(event.relatedTarget)) {
    tileEl.classList.remove("is-drop-target");
  }
});

groupTilesEl.addEventListener("drop", (event) => {
  const targetEl = getGroupDropTarget(event.target);
  clearGroupDropTarget();
  if (!targetEl) return;

  event.preventDefault();
  reorderGroupTiles(draggedGroupTileIndex, Number(targetEl.dataset.groupIndex));
});

groupDialogEl.addEventListener("dragover", (event) => {
  if (draggedGroupTileIndex === null || event.target.closest(".group-tiles")) return;

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  groupDialogEl.classList.add("is-extract-target");
});

groupDialogEl.addEventListener("dragleave", (event) => {
  if (!groupDialogEl.contains(event.relatedTarget)) {
    groupDialogEl.classList.remove("is-extract-target");
  }
});

groupDialogEl.addEventListener("drop", (event) => {
  if (draggedGroupTileIndex === null || event.target.closest(".group-tiles")) return;

  event.preventDefault();
  extractTileFromGroup(draggedGroupTileIndex);
});

groupTilesEl.addEventListener("dragend", () => {
  groupTilesEl.querySelector(".is-dragging")?.classList.remove("is-dragging");
  clearGroupDropTarget();
  groupDialogEl.classList.remove("is-extract-target");
  draggedGroupTileIndex = null;
});

cancelButton.addEventListener("click", () => {
  dialogEl.close();
});

urlInput.addEventListener("input", () => {
  if (!selectedImage) {
    updateImagePreview(faviconUrl(normalizeUrl(urlInput.value.trim())));
  }

  queueTitleLookup();
});

titleInput.addEventListener("input", () => {
  titleWasEnteredByUser = titleInput.value.trim() !== "" && titleInput.value !== lastGeneratedTitle;
  if (titleWasEnteredByUser) {
    resetTitleLookup();
    return;
  }

  if (!titleWasEnteredByUser && urlInput.value.trim()) {
    queueTitleLookup();
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

  const isEditingGroupTile = editingGroupTileIndex !== null;
  const isEditing = activeIndex !== null || isEditingGroupTile;

  const tile = {
    title: titleInput.value.trim(),
    url: normalizeUrl(urlInput.value.trim()),
    image: selectedImage,
  };

  if (isEditingGroupTile) {
    tiles[editingGroupIndex].tiles[editingGroupTileIndex] = tile;
  } else if (isEditing) {
    tiles[activeIndex] = tile;
  } else {
    tiles.push(tile);
  }

  saveTiles();
  renderTiles();
  editingGroupIndex = null;
  editingGroupTileIndex = null;
  dialogEl.close();
});

function loadTiles() {
  try {
    const savedTiles = JSON.parse(localStorage.getItem(TILE_STORAGE_KEY));
    if (Array.isArray(savedTiles)) {
      const cleanTiles = savedTiles.filter((tile) => tile && !isTestTile(tile));
      if (cleanTiles.length !== savedTiles.length) {
        localStorage.setItem(TILE_STORAGE_KEY, JSON.stringify(cleanTiles));
      }
      return cleanTiles;
    }
  } catch {
    localStorage.removeItem(TILE_STORAGE_KEY);
  }

  return defaultTiles;
}

function isTestTile(tile) {
  return tile.url?.startsWith("https://example.com/?test-tile=");
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
  if (tile.type === "group") {
    return renderGroupTile(tile, index);
  }

  return renderLinkTile(tile, index, true);
}

function renderLinkTile(tile, index, draggable, groupIndex = null) {
  const link = document.createElement("a");
  link.className = "tile";
  link.href = tile.url;
  link.draggable = draggable;
  if (index !== null) link.dataset.index = index;
  if (groupIndex !== null) link.dataset.groupIndex = groupIndex;

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

function renderGroupTile(group, index) {
  const button = document.createElement("button");
  button.className = "tile group";
  button.type = "button";
  button.draggable = true;
  button.dataset.index = index;

  const icon = document.createElement("span");
  icon.className = "icon group-photo";
  group.tiles.slice(0, 4).forEach((tile) => {
    const img = document.createElement("img");
    img.src = tile.image || faviconUrl(tile.url) || DEFAULT_PLACEHOLDER_IMAGE;
    img.alt = "";
    icon.append(img);
  });

  const caption = document.createElement("span");
  caption.className = "caption";
  caption.textContent = group.title;

  button.append(icon, caption);
  return button;
}

function renderPlaceholderTile() {
  const button = document.createElement("button");
  button.className = "tile placeholder";
  button.type = "button";
  button.setAttribute("aria-label", "Добавить плитку");
  return button;
}

function openTileDialog(index) {
  editingGroupIndex = null;
  editingGroupTileIndex = null;
  activeIndex = index;
  const tile = index === null ? {} : tiles[index] || {};

  dialogTitleEl.textContent = tile.url ? "Изменить плитку" : "Добавить плитку";
  titleInput.value = tile.title || "";
  titleWasEnteredByUser = Boolean(tile.title);
  lastGeneratedTitle = "";
  resetTitleLookup();
  urlInput.value = tile.url || "";
  imageInput.value = "";
  selectedImage = tile.image || "";
  updateImagePreview(selectedImage || faviconUrl(tile.url || ""));

  dialogEl.showModal();
  (tile.url ? titleInput : urlInput).focus();
}

function openGroupTileDialog(groupIndex, groupTileIndex) {
  const tile = tiles[groupIndex]?.tiles?.[groupTileIndex];
  if (!tile) return;

  activeIndex = null;
  editingGroupIndex = groupIndex;
  editingGroupTileIndex = groupTileIndex;
  dialogTitleEl.textContent = "Изменить плитку";
  titleInput.value = tile.title || "";
  titleWasEnteredByUser = Boolean(tile.title);
  lastGeneratedTitle = "";
  resetTitleLookup();
  urlInput.value = tile.url || "";
  imageInput.value = "";
  selectedImage = tile.image || "";
  updateImagePreview(selectedImage || faviconUrl(tile.url || ""));
  dialogEl.showModal();
  titleInput.focus();
}

function openGroupDialog(index) {
  const group = tiles[index];
  if (!group || group.type !== "group") return;

  activeGroupIndex = index;
  groupTitleEl.value = group.title;
  groupTilesEl.replaceChildren(
    ...group.tiles.map((tile, groupIndex) => renderLinkTile(tile, null, true, groupIndex)),
  );
  if (!groupDialogEl.open) groupDialogEl.showModal();
}

function saveGroupTitle() {
  const group = tiles[activeGroupIndex];
  if (!group || group.type !== "group") return;

  group.title = groupTitleEl.value.trim() || "Новая группа";
  groupTitleEl.value = group.title;
  saveTiles();
  renderTiles();
}

function getMainDropIntent(event) {
  const targetEl = event.target.closest(".tile[data-index]");
  if (!targetEl || draggedIndex === null) return null;

  const targetIndex = Number(targetEl.dataset.index);
  if (targetIndex === draggedIndex) return null;

  const bounds = targetEl.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const sourceCanJoinGroup = tiles[draggedIndex]?.type !== "group";
  const mode = sourceCanJoinGroup && x > 0.27 && x < 0.73
    ? "group"
    : x < 0.5 ? "move-before" : "move-after";

  return { targetEl, targetIndex, mode };
}

function clearDropTarget() {
  tilesEl.querySelectorAll(".is-group-target, .is-move-before-target, .is-move-after-target")
    .forEach(clearDropClasses);
}

function clearDropClasses(tileEl) {
  tileEl.classList.remove("is-group-target", "is-move-before-target", "is-move-after-target");
}

function getGroupDropTarget(element) {
  const targetEl = element.closest(".tile[data-group-index]");
  if (!targetEl || draggedGroupTileIndex === null) return null;

  const targetIndex = Number(targetEl.dataset.groupIndex);
  return targetIndex === draggedGroupTileIndex ? null : targetEl;
}

function clearGroupDropTarget() {
  groupTilesEl.querySelector(".is-drop-target")?.classList.remove("is-drop-target");
}

function createOrExtendGroup(sourceIndex, targetIndex) {
  const sourceTile = tiles[sourceIndex];
  const targetTile = tiles[targetIndex];
  if (!sourceTile || !targetTile || sourceTile.type === "group") return;

  if (targetTile.type === "group") {
    targetTile.tiles.push(sourceTile);
    tiles.splice(sourceIndex, 1);
  } else {
    const group = { type: "group", title: "Новая группа", tiles: [targetTile, sourceTile] };
    tiles.splice(sourceIndex, 1);
    const adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
    tiles[adjustedTargetIndex] = group;
  }

  saveTiles();
  renderTiles();
}

function reorderTiles(sourceIndex, targetIndex, mode) {
  const [tile] = tiles.splice(sourceIndex, 1);
  if (!tile) return;

  let insertAt = targetIndex - (sourceIndex < targetIndex ? 1 : 0);
  if (mode === "move-after") insertAt += 1;
  tiles.splice(insertAt, 0, tile);
  saveTiles();
  renderTiles();
}

function reorderGroupTiles(sourceIndex, targetIndex) {
  const group = tiles[activeGroupIndex];
  if (!group || group.type !== "group" || sourceIndex === targetIndex) return;

  const sourceTile = group.tiles[sourceIndex];
  const targetTile = group.tiles[targetIndex];
  if (!sourceTile || !targetTile) return;

  group.tiles[sourceIndex] = targetTile;
  group.tiles[targetIndex] = sourceTile;
  saveTiles();
  renderTiles();
  openGroupDialog(activeGroupIndex);
}

function extractTileFromGroup(groupTileIndex) {
  const group = tiles[activeGroupIndex];
  if (!group || group.type !== "group" || !group.tiles[groupTileIndex]) return;

  const [extractedTile] = group.tiles.splice(groupTileIndex, 1);
  if (group.tiles.length === 1) {
    const [remainingTile] = group.tiles;
    tiles.splice(activeGroupIndex, 1, remainingTile, extractedTile);
  } else {
    tiles.splice(activeGroupIndex + 1, 0, extractedTile);
  }

  saveTiles();
  renderTiles();
  groupDialogEl.close();
}

function deleteTileFromGroup(groupIndex, groupTileIndex) {
  const group = tiles[groupIndex];
  if (!group || group.type !== "group") return;

  group.tiles.splice(groupTileIndex, 1);
  if (group.tiles.length === 1) {
    tiles.splice(groupIndex, 1, group.tiles[0]);
    groupDialogEl.close();
  } else {
    openGroupDialog(groupIndex);
  }

  saveTiles();
  renderTiles();
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

function showGroupMenu(x, y) {
  groupMenuEl.style.left = `${x}px`;
  groupMenuEl.style.top = `${y}px`;
  groupMenuEl.showPopover();
}

function hideGroupMenu() {
  if (isGroupMenuOpen()) groupMenuEl.hidePopover();
  activeGroupTileIndex = null;
}

function isGroupMenuOpen() {
  return groupMenuEl.matches(":popover-open");
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
  if (event.target.closest("input")) return;

  const text = event.clipboardData.getData("text/plain").trim();
  if (validPageUrl(text)) {
    event.preventDefault();
    urlInput.value = text;
    urlInput.dispatchEvent(new Event("input", { bubbles: true }));
    urlInput.focus();
    return;
  }

  const imageFile = readPastedImage(event.clipboardData);
  if (!imageFile) return;

  event.preventDefault();
  selectedImage = await readFileAsDataUrl(imageFile);
  updateImagePreview(selectedImage);
}

function queueTitleLookup() {
  resetTitleLookup();

  if (titleWasEnteredByUser) return;

  const url = validPageUrl(urlInput.value.trim());
  if (!url) return;

  titleStatus.textContent = "Загрузка названия...";
  titleRequestTimer = window.setTimeout(() => fetchPageTitle(url), 300);
}

async function fetchPageTitle(url) {
  titleRequestController = new AbortController();

  try {
    const title = await window.AutoLinkTitle.fetchTitle(url, titleRequestController.signal);
    if (titleWasEnteredByUser) return;

    lastGeneratedTitle = title;
    titleInput.value = title;
    titleStatus.textContent = "Название подставлено";
  } catch (error) {
    if (error.name === "AbortError") return;

    if (!titleWasEnteredByUser) {
      const fallback = window.AutoLinkTitle.fallbackTitle(url);
      lastGeneratedTitle = fallback;
      titleInput.value = fallback;
      titleStatus.textContent = error.message || "Не удалось загрузить название";
      titleStatus.classList.add("is-error");
      console.warn("Не удалось загрузить название плитки:", error);
    }
  }
}

function resetTitleLookup() {
  window.clearTimeout(titleRequestTimer);
  titleRequestController?.abort();
  titleRequestController = null;
  titleStatus.textContent = "";
  titleStatus.classList.remove("is-error");
}

function validPageUrl(value) {
  try {
    const url = new URL(normalizeUrl(value));
    return /^https?:$/.test(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function readPastedImage(data) {
  for (const item of data.items) {
    if (item.type.startsWith("image/")) {
      return item.getAsFile();
    }
  }

  return null;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}
