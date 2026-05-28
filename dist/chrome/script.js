const TILE_STORAGE_KEY = "homepage.tiles.v1";
const BOOKMARK_QUEUE_STORAGE_KEY = "homepage.bookmarkQueue.v1";
const BOOKMARK_REMOVAL_QUEUE_STORAGE_KEY = "homepage.bookmarkRemovalQueue.v1";
const DEFAULT_PLACEHOLDER_IMAGE = "assets/icon.png";
const NESTED_GROUP_TEST_ID = "nested-groups-v1";
const YANDEX_IMAGE_UPLOAD_URL = "https://yandex.ru/images-apphost/image-download";
const YANDEX_IMAGE_RESULT_URL = "https://yandex.ru/images/search?rpt=imageview&url=";

const bookmarkTile = (title, url) => ({
  title: title?.trim() || bookmarkTitleFromUrl(url),
  url,
});

const bookmarkGroup = (title, tiles) => ({
  type: "group",
  title,
  tiles,
});

const defaultTiles = [
  bookmarkGroup("Главное", [
    bookmarkGroup("Каждый день", [
      bookmarkTile("YouTube", "https://www.youtube.com/"),
      bookmarkTile("Яндекс Переводчик", "https://translate.yandex.ru/"),
      bookmarkTile("Pinterest", "https://ru.pinterest.com/"),
    ]),
    bookmarkGroup("Учёба и инструменты", [
      bookmarkTile("Sci-Hub", "https://www.sci-hub.ru/"),
      bookmarkTile("diagrams.net", "https://app.diagrams.net/?utm_source=chatgpt.com"),
      bookmarkTile("ComfyVPN - Выбор сервера", "https://comfyvpn.pro/test-nodes.php"),
    ]),
    bookmarkGroup("Электроника", [
      bookmarkTile("ESP32-S3 Camera", "http://192.168.4.1/"),
      bookmarkTile("Tutorial ESP32-C3 Super Mini", "https://github.com/sidharthmohannair/Tutorial-ESP32-C3-Super-Mini"),
      bookmarkTile("OLED-дисплей 128x64", "https://fastbox.su/pl-1/product/8080862722"),
    ]),
    bookmarkGroup("Видео и покупки", [
      bookmarkTile("RuTube video", "https://rutube.ru/video/0932ff48acc7a9523dffb2d0c9181f22/"),
      bookmarkTile("VK Video", "https://vk.com/video-87355422_456239153"),
      bookmarkTile("Gamma Ultra", "https://ggsel.net/catalog/product/gamma-pro-1-mesiac-podpiski-4-0000-kreditov-akkaunt-102266203"),
    ]),
  ]),
  bookmarkGroup("Школа 21", [
    bookmarkTile("rocketchat-student.21-school.ru/home", "https://rocketchat-student.21-school.ru/home"),
    bookmarkTile("https://platform.21-school.ru/", "https://platform.21-school.ru/"),
  ]),
  bookmarkGroup("Разработка", [
    bookmarkTile("https://github.com/walderhu", "https://github.com/walderhu"),
    bookmarkGroup("Linux, Git и ESP32", [
      bookmarkTile("https://wokwi.com/esp32", "https://wokwi.com/esp32"),
      bookmarkTile("https://ru.console-linux.com/?p=16738", "https://ru.console-linux.com/?p=16738"),
      bookmarkTile("https://git-scm.com/docs/githooks", "https://git-scm.com/docs/githooks"),
      bookmarkTile("https://wiki.archlinux.org/title/Core_utilities#Essentials", "https://wiki.archlinux.org/title/Core_utilities#Essentials"),
      bookmarkTile("https://ru.linux-terminal.com/?p=398", "https://ru.linux-terminal.com/?p=398"),
      bookmarkTile("https://r4ven.me/automation/kak-nauchitsya-pisat-bash-skripty-rekomenduemye-materialy/#%D1%88%D0%B0%D0%B3-0-%D0%BF%D1%80%D0%BE-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%83-%D0%B2-%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%BD%D0%BE%D0%B9-%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B5", "https://r4ven.me/automation/kak-nauchitsya-pisat-bash-skripty-rekomenduemye-materialy/#%D1%88%D0%B0%D0%B3-0-%D0%BF%D1%80%D0%BE-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%83-%D0%B2-%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%BD%D0%BE%D0%B9-%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B5"),
    ]),
  ]),
  bookmarkGroup("Инструменты", [
    bookmarkTile("https://webcammictest.com/ru/", "https://webcammictest.com/ru/"),
    bookmarkTile("https://geotree.ru/karta-region?lat=55.17353&lon=48.28186&z=6&c=", "https://geotree.ru/karta-region?lat=55.17353&lon=48.28186&z=6&c="),
  ]),
  bookmarkGroup("Медиа", [
    bookmarkGroup("видеохостинги", [
      bookmarkTile("", "https://www.youtube.com/"),
      bookmarkTile("", "https://www.youtube.com/watch?v=l6fyiqeytaA&list=LL&index=1&t=6399s"),
      bookmarkTile("#11. L2-регуляризатор. Математическое обоснование и пример работы | Машинное обучение - смотреть видео онлайн от «SelfEdu - мир знаний с Сергеем Балакиревым» в хорошем качестве, опубликованное 3 сентября 2024 года в 9:37:31.", "https://rutube.ru/video/b9cf1d16200316f223a31e4b61a5fa47/?playlist=539289"),
      bookmarkTile("", "https://inoriginal.net/series/1164-shameless-2011.html"),
      bookmarkTile("torrent-films.cc", "https://torrent-films.cc/besstyzhie-serial-2011/"),
      bookmarkTile("Видеохостинг RUTUBE. Смотрите видео онлайн, бесплатно.", "https://rutube.ru/"),
      bookmarkTile("Американский Папаша 6 сезон 11 серия - смотреть видео онлайн от «Сериал Американский Папаша» в хорошем качестве, опубликованное 3 декабря 2023 года в 11:47:32.", "https://rutube.ru/video/4dfa891c8acceca253c5a09d3e1628d6/"),
    ]),
  ]),
  bookmarkGroup("Старые плитки", [
    bookmarkTile("ALL in ONE 2.4GHz Gadg...", "https://www.youtube.com/"),
    bookmarkTile("Настройка панели задач", "https://chatgpt.com/"),
    bookmarkTile("Extensions", "chrome://extensions/"),
  ]),
];

const tilesEl = document.querySelector(".tiles");
const pageEl = document.querySelector(".new-tab");
const smartboxEl = document.querySelector(".smartbox");
const smartboxInput = document.querySelector(".smartbox-input");
const smartboxImageInput = document.querySelector(".smartbox-image-input");
const smartboxImageStatus = document.querySelector(".smartbox-image-status");
const smartboxImagePreview = document.querySelector(".smartbox-image-preview");
const smartboxImageStatusText = document.querySelector(".smartbox-image-status-text");
const scanButton = document.querySelector(".scan");
const menuEl = document.querySelector(".tile-menu");
const groupDialogEl = document.querySelector(".group-dialog");
const groupTitleEl = document.querySelector(".group-dialog-title");
const groupTilesEl = document.querySelector(".group-tiles");
const groupBackButton = document.querySelector(".group-back");
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
let activeGroupPath = [];
let draggedGroupTileIndex = null;
let activeGroupTileIndex = null;
let editingGroupPath = null;
let editingGroupTileIndex = null;
let creatingGroupPath = null;
let isImageSearchRunning = false;
let smartboxImagePreviewUrl = "";

renderTiles();
syncQueuedBookmarks();
syncRemovedBookmarks();
watchBrowserBookmarks();

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    syncQueuedBookmarks();
    syncRemovedBookmarks();
  }
});

requestAnimationFrame(() => {
  smartboxInput?.focus();
});

smartboxEl.addEventListener("paste", handleSmartboxPaste);

smartboxEl.addEventListener("click", (event) => {
  if (event.target.closest("button")) return;
  smartboxInput.focus();
});

scanButton.addEventListener("click", () => {
  smartboxImageInput.click();
});

smartboxImageInput.addEventListener("change", async () => {
  const file = smartboxImageInput.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    smartboxImageInput.value = "";
    return;
  }

  await searchByImage(file);
});

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
    openGroupDialog([index]);
    return;
  }

  if (tile?.url?.startsWith("chrome://") || tile?.url?.startsWith("thorium://")) {
    event.preventDefault();
    globalThis.chrome?.tabs?.create({ url: tile.url });
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
    if (draggedGroupTileIndex !== null) {
      moveGroupTileToMain(draggedGroupTileIndex, intent);
    } else {
      createOrExtendGroup(draggedIndex, intent.targetIndex);
    }
  } else {
    if (draggedGroupTileIndex !== null) {
      moveGroupTileToMain(draggedGroupTileIndex, intent);
    } else {
      reorderTiles(draggedIndex, intent.targetIndex, intent.mode);
    }
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
      openGroupDialog([tileIndex]);
    } else {
      openTileDialog(tileIndex);
    }
  }

  if (action === "delete") {
    const tile = tiles[tileIndex];
    if (tile?.type === "group"
      && !window.confirm("Удалить группу и все плитки внутри?")) {
      return;
    }

    if (tile?.type === "group") {
      collectTileUrls(tile).forEach(removeBookmarkForUrl);
    } else if (tile?.url) {
      removeBookmarkForUrl(tile.url);
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
  if (groupDialogEl.open
    && !event.target.closest(".group-dialog")
    && !event.target.closest(".group")) {
    groupDialogEl.close();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideMenu();
    if (groupDialogEl.open) {
      event.preventDefault();
      closeGroupLevel();
    }
    return;
  }

  if (shouldCaptureSmartboxText(event)) {
    event.preventDefault();
    insertTextIntoSmartbox(event.key);
  }
});

dialogEl.addEventListener("paste", handleDialogPaste);
dialogEl.addEventListener("close", resetTitleLookup);
groupBackButton.addEventListener("click", () => {
  closeGroupLevel();
});
groupCloseButton.addEventListener("click", () => groupDialogEl.close());
groupTitleEl.addEventListener("change", saveGroupTitle);
groupTitleEl.addEventListener("blur", saveGroupTitle);
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
  pageEl.classList.remove("is-group-open");
  activeGroupPath = [];
  draggedGroupTileIndex = null;
  groupDialogEl.classList.remove("is-extract-target");
  creatingGroupPath = null;
});

groupTilesEl.addEventListener("click", (event) => {
  const tileEl = event.target.closest(".tile[data-group-index]");
  const groupTileIndex = Number(tileEl?.dataset.groupIndex);
  const tile = getActiveGroup()?.tiles[groupTileIndex];
  if (!tileEl || tile?.type !== "group") return;

  event.preventDefault();
  openGroupDialog([...activeGroupPath, groupTileIndex]);
});

groupTilesEl.addEventListener("click", (event) => {
  const addTile = event.target.closest(".group-add-tile");
  if (!addTile) return;

  event.preventDefault();
  event.stopPropagation();
  creatingGroupPath = [...activeGroupPath];
  openTileDialog(null);
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

  const groupPath = [...activeGroupPath];
  const tileIndex = activeGroupTileIndex;
  hideGroupMenu();

  if (action === "edit") {
    if (getGroupAtPath(groupPath)?.tiles[tileIndex]?.type === "group") {
      openGroupDialog([...groupPath, tileIndex]);
    } else {
      groupDialogEl.close();
      openGroupTileDialog(groupPath, tileIndex);
    }
  }

  if (action === "delete") {
    const groupTile = getGroupAtPath(groupPath)?.tiles[tileIndex];
    if (groupTile?.type === "group") {
      collectTileUrls(groupTile).forEach(removeBookmarkForUrl);
    } else if (groupTile?.url) {
      removeBookmarkForUrl(groupTile.url);
    }
    deleteTileFromGroup(groupPath, tileIndex);
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
  const intent = getGroupDropIntent(event);
  if (!intent) return;

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  clearGroupDropTarget();
  intent.targetEl.classList.add(`is-${intent.mode}-target`);
});

groupTilesEl.addEventListener("dragleave", (event) => {
  const tileEl = event.target.closest(".tile[data-group-index]");
  if (tileEl && !tileEl.contains(event.relatedTarget)) {
    clearDropClasses(tileEl);
  }
});

groupTilesEl.addEventListener("drop", (event) => {
  const intent = getGroupDropIntent(event);
  clearGroupDropTarget();
  if (!intent) return;

  event.preventDefault();
  if (intent.mode === "group") {
    createOrExtendActiveGroup(draggedGroupTileIndex, intent.targetIndex);
  } else {
    reorderGroupTiles(draggedGroupTileIndex, intent.targetIndex, intent.mode);
  }
});

groupDialogEl.addEventListener("dragover", (event) => {
  if (draggedGroupTileIndex === null) return;

  groupDialogEl.classList.remove("is-extract-target");
  if (!event.target.closest(".tile[data-group-index]")) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "none";
  }
});

groupDialogEl.addEventListener("drop", (event) => {
  if (draggedGroupTileIndex === null) return;

  event.preventDefault();
  event.stopPropagation();
});

pageEl.addEventListener("dragover", (event) => {
  if (draggedGroupTileIndex === null
    || event.target.closest(".group-dialog")
    || !hasLeftGroupDialog(event)) {
    return;
  }

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  groupDialogEl.classList.add("is-extract-target");
});

pageEl.addEventListener("drop", (event) => {
  if (draggedGroupTileIndex === null
    || event.target.closest(".group-dialog")
    || !hasLeftGroupDialog(event)
    || (activeGroupPath.length === 1 && event.target.closest(".tile[data-index]"))) {
    return;
  }

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
  const isCreatingInGroup = !isEditing && Array.isArray(creatingGroupPath) && creatingGroupPath.length > 0;

  const tile = {
    title: titleInput.value.trim(),
    url: normalizeUrl(urlInput.value.trim()),
    image: selectedImage,
  };

  if (isEditingGroupTile) {
    getGroupAtPath(editingGroupPath).tiles[editingGroupTileIndex] = tile;
  } else if (isEditing) {
    tiles[activeIndex] = tile;
  } else if (isCreatingInGroup) {
    getGroupAtPath(creatingGroupPath).tiles.push(tile);
  } else {
    tiles.push(tile);
  }

  saveTiles();
  renderTiles();
  editingGroupPath = null;
  editingGroupTileIndex = null;
  creatingGroupPath = null;
  dialogEl.close();
});

function migrateTileUrls(items) {
  return items.map((tile) => {
    if (!tile) return tile;
    if (tile.type === "group") {
      return { ...tile, tiles: migrateTileUrls(tile.tiles || []) };
    }
    return tile.url?.startsWith("browser://")
      ? { ...tile, url: tile.url.replace("browser://", "chrome://") }
      : tile;
  });
}

function loadTiles() {
  try {
    const savedTiles = JSON.parse(localStorage.getItem(TILE_STORAGE_KEY));
    if (Array.isArray(savedTiles)) {
      return mergeTiles(
        migrateTileUrls(savedTiles.filter((tile) => tile && !isTestTile(tile))),
        defaultTiles,
      );
    }
  } catch {
    localStorage.removeItem(TILE_STORAGE_KEY);
  }

  return [...defaultTiles];
}

function mergeTiles(savedTiles, defaults) {
  let merged = cloneTiles(savedTiles);

  for (const tile of defaults) {
    merged = mergeTileInto(merged, tile);
  }

  return merged;
}

function mergeTileInto(items, tile) {
  if (!tile) return items;

  if (tile.type === "group") {
    const groupIndex = items.findIndex((item) => item?.type === "group" && item.title === tile.title);
    if (groupIndex === -1) {
      return [...items, cloneTile(tile)];
    }

    const nextItems = [...items];
    nextItems[groupIndex] = {
      ...nextItems[groupIndex],
      tiles: mergeTiles(nextItems[groupIndex].tiles || [], tile.tiles || []),
    };
    return nextItems;
  }

  const url = normalizeTileUrl(tile.url);
  if (!url) return items;
  if (items.some((item) => item?.type !== "group" && normalizeTileUrl(item?.url) === url)) {
    return items;
  }

  return [...items, cloneTile(tile)];
}

function cloneTiles(items) {
  return (items || []).map(cloneTile);
}

function cloneTile(tile) {
  if (!tile) return tile;
  if (tile.type === "group") {
    return {
      type: "group",
      title: tile.title,
      tiles: cloneTiles(tile.tiles || []),
    };
  }

  return {
    title: tile.title,
    url: tile.url,
  };
}

function normalizeTileUrl(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isTestTile(tile) {
  return tile.url?.startsWith("https://example.com/?test-tile=");
}

function hasNestedTestGroup(items) {
  return items.some((tile) => tile.testFixture === NESTED_GROUP_TEST_ID
    || (tile.type === "group" && hasNestedTestGroup(tile.tiles)));
}

function createNestedTestGroup() {
  return {
    type: "group",
    testFixture: NESTED_GROUP_TEST_ID,
    title: "Тест: уровень 1",
    tiles: [
      { title: "На первом", url: "https://ya.ru/" },
      {
        type: "group",
        testFixture: NESTED_GROUP_TEST_ID,
        title: "Тест: уровень 2",
        tiles: [
          { title: "На втором", url: "https://habr.com/" },
          {
            type: "group",
            testFixture: NESTED_GROUP_TEST_ID,
            title: "Тест: уровень 3",
            tiles: [
              { title: "На третьем", url: "https://youtube.com/" },
              {
                type: "group",
                testFixture: NESTED_GROUP_TEST_ID,
                title: "Тест: уровень 4",
                tiles: [
                  { title: "Глубина A", url: "https://github.com/" },
                  { title: "Глубина B", url: "https://developer.mozilla.org/" },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

function saveTiles() {
  localStorage.setItem(TILE_STORAGE_KEY, JSON.stringify(tiles.filter(Boolean)));
}

async function syncQueuedBookmarks() {
  if (!globalThis.chrome?.storage?.local) return;

  try {
    const saved = await globalThis.chrome.storage.local.get(BOOKMARK_QUEUE_STORAGE_KEY);
    const bookmarks = saved[BOOKMARK_QUEUE_STORAGE_KEY];
    if (!Array.isArray(bookmarks) || bookmarks.length === 0) return;

    let changed = false;
    for (const bookmark of bookmarks) {
      changed = addBookmarkTile(bookmark) || changed;
    }

    await globalThis.chrome.storage.local.remove(BOOKMARK_QUEUE_STORAGE_KEY);

    if (changed) {
      saveTiles();
      renderTiles();
    }
  } catch (error) {
    console.error("Не удалось загрузить новые закладки:", error);
  }
}

async function syncRemovedBookmarks() {
  if (!globalThis.chrome?.storage?.local) return;

  try {
    const saved = await globalThis.chrome.storage.local.get(BOOKMARK_REMOVAL_QUEUE_STORAGE_KEY);
    const removed = saved[BOOKMARK_REMOVAL_QUEUE_STORAGE_KEY];
    if (!Array.isArray(removed) || removed.length === 0) return;

    let changed = false;
    for (const bookmark of removed) {
      const url = validBookmarkUrl(bookmark?.url);
      if (url) changed = removeTilesForUrl(url) || changed;
    }

    await globalThis.chrome.storage.local.remove(BOOKMARK_REMOVAL_QUEUE_STORAGE_KEY);

    if (changed) {
      saveTiles();
      renderTiles();
      if (groupDialogEl.open) {
        groupDialogEl.close();
      }
    }
  } catch (error) {
    console.error("Не удалось удалить плитки удаленных закладок:", error);
  }
}

function watchBrowserBookmarks() {
  if (globalThis.chrome?.storage?.onChanged) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== "local") return;
      if (changes[BOOKMARK_QUEUE_STORAGE_KEY]?.newValue) syncQueuedBookmarks();
      if (changes[BOOKMARK_REMOVAL_QUEUE_STORAGE_KEY]?.newValue) syncRemovedBookmarks();
    });
  }

  if (!globalThis.chrome?.bookmarks?.onCreated) return;

  globalThis.chrome.bookmarks.onCreated.addListener((id, bookmark) => {
    if (!addBookmarkTile(bookmark)) return;

    saveTiles();
    renderTiles();
    window.setTimeout(() => discardQueuedBookmark(bookmark), 250);
  });
}

function addBookmarkTile(bookmark) {
  const url = validBookmarkUrl(bookmark?.url);
  if (!url || hasTileUrl(tiles, url)) return false;

  tiles.push({
    title: bookmark.title?.trim() || bookmarkTitleFromUrl(url),
    url,
  });

  return true;
}

function hasTileUrl(items, url) {
  return items.some((tile) => {
    if (tile?.type === "group") {
      return hasTileUrl(tile.tiles || [], url);
    }

    return validBookmarkUrl(tile?.url) === url;
  });
}

function removeTilesForUrl(url) {
  const previous = tiles;
  tiles = removeUrlFromTileContainer(tiles, url);
  return tiles !== previous;
}

function removeUrlFromTileContainer(items, url) {
  let changed = false;
  const nextItems = [];

  for (const tile of items) {
    if (tile?.type !== "group") {
      if (validBookmarkUrl(tile?.url) === url) {
        changed = true;
      } else {
        nextItems.push(tile);
      }
      continue;
    }

    const children = removeUrlFromTileContainer(tile.tiles || [], url);
    if (children !== tile.tiles) changed = true;
    if (children.length === 0) {
      changed = true;
      continue;
    }
    if (children.length === 1) {
      changed = true;
      nextItems.push(children[0]);
      continue;
    }

    nextItems.push(children === tile.tiles ? tile : { ...tile, tiles: children });
  }

  return changed ? nextItems : items;
}

function validBookmarkUrl(value) {
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function bookmarkTitleFromUrl(value) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "Новая закладка";
  }
}

async function discardQueuedBookmark(bookmark) {
  if (!globalThis.chrome?.storage?.local || !bookmark?.url) return;

  try {
    const saved = await globalThis.chrome.storage.local.get(BOOKMARK_QUEUE_STORAGE_KEY);
    const queue = saved[BOOKMARK_QUEUE_STORAGE_KEY];
    if (!Array.isArray(queue) || queue.length === 0) return;

    const nextQueue = queue.filter((item) => item?.id !== bookmark.id && item?.url !== bookmark.url);
    if (nextQueue.length === queue.length) return;

    if (nextQueue.length === 0) {
      await globalThis.chrome.storage.local.remove(BOOKMARK_QUEUE_STORAGE_KEY);
      return;
    }

    await globalThis.chrome.storage.local.set({ [BOOKMARK_QUEUE_STORAGE_KEY]: nextQueue });
  } catch (error) {
    console.error("Не удалось очистить очередь закладок:", error);
  }
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
  img.addEventListener("load", () => { icon.style.background = "#ffffff"; });
  icon.append(img);

  const caption = document.createElement("span");
  caption.className = "caption";
  caption.textContent = tile.title;

  link.append(icon, caption);
  return link;
}

function renderGroupTile(group, index, groupIndex = null) {
  const button = document.createElement("button");
  button.className = "tile group";
  button.type = "button";
  button.draggable = true;
  if (index !== null) button.dataset.index = index;
  if (groupIndex !== null) button.dataset.groupIndex = groupIndex;

  const icon = document.createElement("span");
  icon.className = "icon group-photo";
  group.tiles.slice(0, 4).forEach((tile) => {
    const img = document.createElement("img");
    img.src = getTilePreviewImage(tile);
    img.alt = "";
    icon.append(img);
  });

  const caption = document.createElement("span");
  caption.className = "caption";
  caption.textContent = group.title;

  button.append(icon, caption);
  return button;
}

function renderGroupChildTile(tile, groupIndex) {
  if (tile.type === "group") {
    return renderGroupTile(tile, null, groupIndex);
  }

  return renderLinkTile(tile, null, true, groupIndex);
}

function renderGroupAddTile() {
  const button = document.createElement("button");
  button.className = "tile placeholder group-add-tile";
  button.type = "button";
  button.setAttribute("aria-label", "Добавить плитку в группу");
  button.title = "Добавить плитку в эту группу";
  return button;
}

function getTilePreviewImage(tile) {
  if (tile.type === "group") {
    return getTilePreviewImage(tile.tiles[0] || {});
  }

  return tile.image || faviconUrl(tile.url) || DEFAULT_PLACEHOLDER_IMAGE;
}

function renderPlaceholderTile() {
  const button = document.createElement("button");
  button.className = "tile placeholder";
  button.type = "button";
  button.setAttribute("aria-label", "Добавить плитку");
  return button;
}

function openTileDialog(index) {
  creatingGroupPath = null;
  editingGroupPath = null;
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

function openGroupTileDialog(groupPath, groupTileIndex) {
  const tile = getGroupAtPath(groupPath)?.tiles?.[groupTileIndex];
  if (!tile) return;

  creatingGroupPath = null;
  activeIndex = null;
  editingGroupPath = [...groupPath];
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

function openGroupDialog(path) {
  const group = getGroupAtPath(path);
  if (!group || group.type !== "group") return;

  activeGroupPath = [...path];
  groupBackButton.hidden = path.length === 1;
  groupTitleEl.value = group.title;
  groupTilesEl.replaceChildren(
    ...group.tiles.map(renderGroupChildTile),
    renderGroupAddTile(),
  );
  pageEl.classList.add("is-group-open");
  if (!groupDialogEl.open) groupDialogEl.show();
  groupDialogEl.focus({ preventScroll: true });
}

function closeGroupLevel() {
  if (activeGroupPath.length > 1) {
    openGroupDialog(activeGroupPath.slice(0, -1));
    return;
  }

  groupDialogEl.close();
}

function saveGroupTitle() {
  const group = getActiveGroup();
  if (!group || group.type !== "group") return;

  group.title = groupTitleEl.value.trim() || "Новая группа";
  groupTitleEl.value = group.title;
  saveTiles();
  renderTiles();
}

function getActiveGroup() {
  return getGroupAtPath(activeGroupPath);
}

function getGroupAtPath(path) {
  let group = tiles[path?.[0]];
  for (const index of path?.slice(1) || []) {
    group = group?.tiles?.[index];
  }

  return group?.type === "group" ? group : null;
}

function getParentTiles(path) {
  if (!path?.length) return null;
  if (path.length === 1) return tiles;
  return getGroupAtPath(path.slice(0, -1))?.tiles || null;
}

function getMainDropIntent(event) {
  const targetEl = event.target.closest(".tile[data-index]");
  if (!targetEl || (draggedIndex === null && draggedGroupTileIndex === null)) return null;
  if (draggedGroupTileIndex !== null
    && (activeGroupPath.length !== 1 || !hasLeftGroupDialog(event))) {
    return null;
  }

  const targetIndex = Number(targetEl.dataset.index);
  if (targetIndex === draggedIndex
    || (draggedGroupTileIndex !== null && targetIndex === activeGroupPath[0])) {
    return null;
  }

  const bounds = targetEl.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const mode = x > 0.27 && x < 0.73
    ? "group"
    : x < 0.5 ? "move-before" : "move-after";

  return { targetEl, targetIndex, mode };
}

function hasLeftGroupDialog(event) {
  const bounds = groupDialogEl.getBoundingClientRect();
  const margin = 12;
  return event.clientX < bounds.left - margin
    || event.clientX > bounds.right + margin
    || event.clientY < bounds.top - margin
    || event.clientY > bounds.bottom + margin;
}

function clearDropTarget() {
  tilesEl.querySelectorAll(".is-group-target, .is-move-before-target, .is-move-after-target")
    .forEach(clearDropClasses);
}

function clearDropClasses(tileEl) {
  tileEl.classList.remove("is-group-target", "is-move-before-target", "is-move-after-target");
}

function getGroupDropIntent(event) {
  const targetEl = event.target.closest(".tile[data-group-index]");
  if (!targetEl || draggedGroupTileIndex === null) return null;

  const targetIndex = Number(targetEl.dataset.groupIndex);
  if (targetIndex === draggedGroupTileIndex) return null;

  const bounds = targetEl.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const mode = x > 0.27 && x < 0.73
    ? "group"
    : x < 0.5 ? "move-before" : "move-after";
  return { targetEl, targetIndex, mode };
}

function clearGroupDropTarget() {
  groupTilesEl.querySelectorAll(".is-group-target, .is-move-before-target, .is-move-after-target")
    .forEach(clearDropClasses);
}

function createOrExtendGroup(sourceIndex, targetIndex) {
  nestItemInContainer(tiles, sourceIndex, targetIndex);
  saveTiles();
  renderTiles();
}

function createOrExtendActiveGroup(sourceIndex, targetIndex) {
  const path = [...activeGroupPath];
  const group = getActiveGroup();
  if (!group) return;

  nestItemInContainer(group.tiles, sourceIndex, targetIndex);
  if (group.tiles.length === 1) {
    getParentTiles(path).splice(path[path.length - 1], 1, group.tiles[0]);
    saveTiles();
    renderTiles();
    if (path.length === 1) {
      groupDialogEl.close();
    } else {
      openGroupDialog(path.slice(0, -1));
    }
    return;
  }

  saveTiles();
  renderTiles();
  openGroupDialog(path);
}

function nestItemInContainer(container, sourceIndex, targetIndex) {
  const sourceTile = container[sourceIndex];
  const targetTile = container[targetIndex];
  if (!sourceTile || !targetTile || sourceIndex === targetIndex) return;

  if (targetTile.type === "group") {
    targetTile.tiles.push(sourceTile);
    container.splice(sourceIndex, 1);
    return;
  }

  const group = { type: "group", title: "Новая группа", tiles: [targetTile, sourceTile] };
  container.splice(sourceIndex, 1);
  const adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
  container[adjustedTargetIndex] = group;
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

function reorderGroupTiles(sourceIndex, targetIndex, mode) {
  const group = getActiveGroup();
  if (!group || group.type !== "group" || sourceIndex === targetIndex) return;

  const [tile] = group.tiles.splice(sourceIndex, 1);
  if (!tile) return;

  let insertAt = targetIndex - (sourceIndex < targetIndex ? 1 : 0);
  if (mode === "move-after") insertAt += 1;
  group.tiles.splice(insertAt, 0, tile);
  saveTiles();
  renderTiles();
  openGroupDialog(activeGroupPath);
}

function moveGroupTileToMain(groupTileIndex, intent) {
  const group = getActiveGroup();
  const targetTile = tiles[intent.targetIndex];
  if (activeGroupPath.length !== 1
    || !group
    || !group.tiles[groupTileIndex]
    || !targetTile) {
    return;
  }

  const [extractedTile] = group.tiles.splice(groupTileIndex, 1);
  if (group.tiles.length === 1) {
    tiles.splice(activeGroupPath[0], 1, group.tiles[0]);
  }

  const targetIndex = tiles.indexOf(targetTile);
  if (targetIndex < 0) return;

  if (intent.mode === "group") {
    if (targetTile.type === "group") {
      targetTile.tiles.push(extractedTile);
    } else {
      tiles[targetIndex] = { type: "group", title: "Новая группа", tiles: [targetTile, extractedTile] };
    }
  } else {
    const insertAt = intent.mode === "move-before" ? targetIndex : targetIndex + 1;
    tiles.splice(insertAt, 0, extractedTile);
  }

  saveTiles();
  renderTiles();
  groupDialogEl.close();
}

function extractTileFromGroup(groupTileIndex) {
  const path = [...activeGroupPath];
  const group = getGroupAtPath(path);
  const parentTiles = getParentTiles(path);
  const groupIndex = path[path.length - 1];
  if (!group || !parentTiles || !group.tiles[groupTileIndex]) return;

  const [extractedTile] = group.tiles.splice(groupTileIndex, 1);
  if (group.tiles.length === 0) {
    parentTiles.splice(groupIndex, 1);
    if (path.length === 1) {
      groupDialogEl.close();
    } else {
      openGroupDialog(path.slice(0, -1));
    }
  } else if (group.tiles.length === 1) {
    const [remainingTile] = group.tiles;
    parentTiles.splice(groupIndex, 1, remainingTile, extractedTile);
  } else {
    parentTiles.splice(groupIndex + 1, 0, extractedTile);
  }

  saveTiles();
  renderTiles();
  if (path.length === 1) {
    groupDialogEl.close();
  } else {
    openGroupDialog(path.slice(0, -1));
  }
}

function deleteTileFromGroup(groupPath, groupTileIndex) {
  const group = getGroupAtPath(groupPath);
  const tile = group?.tiles[groupTileIndex];
  if (!group || !tile) return;
  if (tile.type === "group" && !window.confirm("Удалить группу и все плитки внутри?")) return;

  group.tiles.splice(groupTileIndex, 1);
  if (group.tiles.length === 0) {
    const parentTiles = getParentTiles(groupPath);
    parentTiles.splice(groupPath[groupPath.length - 1], 1);
    if (groupPath.length === 1) {
      groupDialogEl.close();
    } else {
      openGroupDialog(groupPath.slice(0, -1));
    }
  } else if (group.tiles.length === 1) {
    const parentTiles = getParentTiles(groupPath);
    parentTiles.splice(groupPath[groupPath.length - 1], 1, group.tiles[0]);
    if (groupPath.length === 1) {
      groupDialogEl.close();
    } else {
      openGroupDialog(groupPath.slice(0, -1));
    }
  } else {
    openGroupDialog(groupPath);
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

async function handleSmartboxPaste(event) {
  const imageFile = readPastedImage(event.clipboardData);
  if (!imageFile) return;

  event.preventDefault();
  await searchByImage(imageFile);
}

function shouldCaptureSmartboxText(event) {
  if (event.defaultPrevented
    || event.ctrlKey
    || event.altKey
    || event.metaKey
    || event.isComposing
    || event.key.length !== 1
    || dialogEl.open
    || groupDialogEl.open) {
    return false;
  }

  return !isTextEntryTarget(event.target);
}

function isTextEntryTarget(target) {
  return Boolean(target?.closest?.("input, textarea, select, [contenteditable=''], [contenteditable='true']"));
}

function insertTextIntoSmartbox(text) {
  smartboxInput.focus();

  const selectionStart = smartboxInput.selectionStart ?? smartboxInput.value.length;
  const selectionEnd = smartboxInput.selectionEnd ?? selectionStart;
  smartboxInput.setRangeText(text, selectionStart, selectionEnd, "end");
  smartboxInput.dispatchEvent(new Event("input", { bubbles: true }));
}

async function searchByImage(file) {
  if (isImageSearchRunning) return;

  isImageSearchRunning = true;
  scanButton.disabled = true;
  showImageSearchStatus(file, "Готовлю фото...");

  try {
    const jpegBlob = await normalizeSearchImage(file);
    setImageSearchStatus("Загружаю фото в Яндекс...");
    const imageUrl = await uploadImageToYandex(jpegBlob);
    setImageSearchStatus("Открываю поиск по фото...");
    window.location.href = YANDEX_IMAGE_RESULT_URL + encodeURIComponent(imageUrl);
  } catch (error) {
    console.error(error);
    alert(error.message || "Не удалось выполнить поиск по фото.");
    hideImageSearchStatus();
  } finally {
    smartboxImageInput.value = "";
    scanButton.disabled = false;
    isImageSearchRunning = false;
  }
}

function showImageSearchStatus(file, message) {
  if (smartboxImagePreviewUrl) {
    URL.revokeObjectURL(smartboxImagePreviewUrl);
  }

  smartboxImagePreviewUrl = URL.createObjectURL(file);
  smartboxImagePreview.src = smartboxImagePreviewUrl;
  smartboxImageStatus.hidden = false;
  smartboxEl.classList.add("is-image-searching");
  setImageSearchStatus(message);
}

function setImageSearchStatus(message) {
  smartboxImageStatusText.textContent = message;
}

function hideImageSearchStatus() {
  smartboxEl.classList.remove("is-image-searching");
  smartboxImageStatus.hidden = true;
  smartboxImagePreview.removeAttribute("src");

  if (smartboxImagePreviewUrl) {
    URL.revokeObjectURL(smartboxImagePreviewUrl);
    smartboxImagePreviewUrl = "";
  }
}

async function normalizeSearchImage(blob) {
  const bitmap = await createImageBitmap(blob);
  const limit = 1600;
  const scale = Math.min(1, limit / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  if (canvas.convertToBlob) {
    return canvas.convertToBlob({
      type: "image/jpeg",
      quality: 0.88,
    });
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => result ? resolve(result) : reject(new Error("Не удалось подготовить фото.")),
      "image/jpeg",
      0.88,
    );
  });
}

function createCanvas(width, height) {
  if (window.OffscreenCanvas) {
    return new OffscreenCanvas(width, height);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

async function uploadImageToYandex(blob) {
  const response = await fetch(YANDEX_IMAGE_UPLOAD_URL, {
    method: "POST",
    headers: {
      accept: "*/*",
      "content-type": "image/jpeg",
    },
    body: await blob.arrayBuffer(),
  });

  if (!response.ok) {
    throw new Error(`Yandex upload failed: HTTP ${response.status}.`);
  }

  const payload = await response.json();
  if (!payload?.url) {
    throw new Error("Yandex did not return an image URL.");
  }

  return payload.url;
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

// -- Voice search ---------------------------------------------------------------

const micButton = document.querySelector(".microphone");
const voiceCaptureEl = document.querySelector(".voice-capture");
const voiceStatusEl = document.querySelector(".voice-status");
const waveBarsEl = document.querySelector(".wave-bars");
const voiceCancelButton = document.querySelector(".voice-cancel");
const voiceSubmitButton = document.querySelector(".voice-submit");
const VOICE_TRANSCRIPTION_URL = "http://127.0.0.1:8765/transcribe";
const WHISPER_MODEL = "whisper-large-v3-turbo";
const VOICE_BAR_COUNT = 82;
const VOICE_SILENCE_THRESHOLD = 0.018;
const VOICE_SILENCE_STOP_MS = 3000;
const VOICE_NOISE_MARGIN = 0.012;
const VOICE_CALIBRATION_MS = 300;

let voiceMediaRecorder = null;
let voiceMediaStream = null;
let voiceAudioChunks = [];
let voiceAudioContext = null;
let voiceAnalyser = null;
let voiceAnimationId = null;
let voiceIsRecording = false;
let voiceIsProcessing = false;
let voiceWaveSamples = [];
let voiceHeardSpeech = false;
let voiceLastSpeechAt = 0;
let voiceNoiseFloor = 0;
let voiceCalibrationEndsAt = 0;
let voiceWasCancelled = false;

createVoiceBars();

micButton.addEventListener("click", async () => {
  if (voiceIsProcessing) return;

  if (voiceIsRecording) {
    stopVoiceSearch();
    return;
  }

  await startVoiceSearch();
});

voiceCancelButton.addEventListener("click", cancelVoiceSearch);
voiceSubmitButton.addEventListener("click", stopVoiceSearch);

async function startVoiceSearch() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    alert("В этом браузере запись с микрофона не поддерживается.");
    return;
  }

  try {
    voiceMediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: false,
      },
    });
    const mimeType = getSupportedVoiceMimeType();
    voiceMediaRecorder = mimeType
      ? new MediaRecorder(voiceMediaStream, { mimeType })
      : new MediaRecorder(voiceMediaStream);
    voiceAudioChunks = [];
    voiceWasCancelled = false;

    voiceAudioContext = new AudioContext();
    voiceAnalyser = voiceAudioContext.createAnalyser();
    voiceAnalyser.fftSize = 512;
    voiceAnalyser.smoothingTimeConstant = 0.72;
    voiceAudioContext.createMediaStreamSource(voiceMediaStream).connect(voiceAnalyser);

    voiceMediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size) voiceAudioChunks.push(event.data);
    });
    voiceMediaRecorder.addEventListener("stop", handleVoiceRecordingComplete, { once: true });
    voiceMediaRecorder.start(120);

    voiceIsRecording = true;
    voiceWaveSamples = Array(VOICE_BAR_COUNT).fill(0);
    voiceHeardSpeech = false;
    voiceLastSpeechAt = 0;
    voiceNoiseFloor = 0;
    voiceCalibrationEndsAt = Date.now() + VOICE_CALIBRATION_MS;
    renderVoiceWave();
    showVoiceCapture("Говорите...");
    micButton.classList.add("is-recording");
    micButton.setAttribute("aria-label", "Остановить запись и искать");
    animateVoiceWave();
  } catch (error) {
    releaseVoiceResources();
    console.error("Microphone access error:", error);
    alert("Не удалось получить доступ к микрофону.");
  }
}

function stopVoiceSearch() {
  if (!voiceIsRecording) return;

  voiceIsRecording = false;
  window.cancelAnimationFrame(voiceAnimationId);
  setFlatVoiceWave();
  voiceStatusEl.textContent = "Распознаю...";
  smartboxEl.classList.add("is-voice-processing");
  micButton.classList.remove("is-recording");
  micButton.classList.add("is-processing");
  micButton.disabled = true;
  voiceIsProcessing = true;

  if (voiceMediaRecorder?.state !== "inactive") {
    voiceMediaRecorder.stop();
  }
}

function cancelVoiceSearch() {
  if (!voiceIsRecording) return;

  voiceWasCancelled = true;
  voiceIsRecording = false;
  window.cancelAnimationFrame(voiceAnimationId);
  micButton.classList.remove("is-recording");
  micButton.setAttribute("aria-label", "Голосовой поиск");
  hideVoiceCapture();
  smartboxInput.focus();

  if (voiceMediaRecorder?.state !== "inactive") {
    voiceMediaRecorder.stop();
    return;
  }

  releaseVoiceResources();
}

async function handleVoiceRecordingComplete() {
  const mimeType = voiceMediaRecorder?.mimeType || "audio/webm";
  const extension = mimeType.includes("ogg") ? "ogg" : "webm";
  const audioBlob = new Blob(voiceAudioChunks, { type: mimeType });
  releaseVoiceResources();

  if (voiceWasCancelled) {
    voiceAudioChunks = [];
    return;
  }

  try {
    if (audioBlob.size < 1000) throw new Error("Запись слишком короткая.");
    const text = await transcribeVoice(audioBlob, extension);
    if (!text) throw new Error("Речь не распознана.");

    smartboxInput.value = text;
    hideVoiceCapture();
    smartboxEl.requestSubmit();
  } catch (error) {
    console.error("Voice transcription error:", error);
    hideVoiceCapture();
    smartboxInput.focus();
    alert(error.message || "Не удалось распознать голосовой запрос.");
  } finally {
    voiceIsProcessing = false;
    smartboxEl.classList.remove("is-voice-processing");
    micButton.disabled = false;
    micButton.classList.remove("is-processing");
    micButton.setAttribute("aria-label", "Голосовой поиск");
  }
}

function createVoiceBars() {
  for (let index = 0; index < VOICE_BAR_COUNT; index += 1) {
    const bar = document.createElement("span");
    bar.className = "wave-bar";
    waveBarsEl.append(bar);
  }
}

function showVoiceCapture(message) {
  voiceStatusEl.textContent = message;
  smartboxEl.classList.add("is-voice-active");
  voiceCaptureEl.hidden = false;
}

function hideVoiceCapture() {
  smartboxEl.classList.remove("is-voice-active");
  voiceCaptureEl.hidden = true;
  setFlatVoiceWave();
}

function animateVoiceWave() {
  if (!voiceIsRecording || !voiceAnalyser) return;

  const data = new Uint8Array(voiceAnalyser.fftSize);
  voiceAnalyser.getByteTimeDomainData(data);
  let sumSquares = 0;
  data.forEach((sample) => {
    const value = (sample - 128) / 128;
    sumSquares += value * value;
  });

  const rawLevel = Math.sqrt(sumSquares / data.length);
  const now = Date.now();
  if (now < voiceCalibrationEndsAt || !voiceNoiseFloor) {
    voiceNoiseFloor = voiceNoiseFloor
      ? voiceNoiseFloor * 0.94 + rawLevel * 0.06
      : rawLevel;
  } else if (rawLevel < voiceNoiseFloor + VOICE_NOISE_MARGIN) {
    voiceNoiseFloor = voiceNoiseFloor * 0.98 + rawLevel * 0.02;
  }

  const speechThreshold = Math.max(
    VOICE_SILENCE_THRESHOLD,
    voiceNoiseFloor + VOICE_NOISE_MARGIN,
  );
  if (now >= voiceCalibrationEndsAt && rawLevel >= speechThreshold) {
    voiceHeardSpeech = true;
    voiceLastSpeechAt = now;
  } else if (voiceHeardSpeech && now - voiceLastSpeechAt >= VOICE_SILENCE_STOP_MS) {
    stopVoiceSearch();
    return;
  }

  const level = rawLevel < speechThreshold
    ? 0
    : Math.min(1, (rawLevel - speechThreshold) * 10);
  voiceWaveSamples.shift();
  voiceWaveSamples.push(level);
  renderVoiceWave();

  voiceAnimationId = window.requestAnimationFrame(animateVoiceWave);
}

function renderVoiceWave() {
  const bars = waveBarsEl.querySelectorAll(".wave-bar");
  bars.forEach((bar, index) => {
    const sample = voiceWaveSamples[index] || 0;
    const height = sample ? 5 + sample * 43 : 5;
    bar.style.height = `${height.toFixed(1)}px`;
    bar.style.opacity = sample ? String(0.72 + sample * 0.24) : "0.48";
  });
}

function setFlatVoiceWave() {
  voiceWaveSamples = Array(VOICE_BAR_COUNT).fill(0);
  renderVoiceWave();
}

function releaseVoiceResources() {
  voiceMediaStream?.getTracks().forEach((track) => track.stop());
  voiceMediaStream = null;
  voiceAudioContext?.close();
  voiceAudioContext = null;
  voiceAnalyser = null;
}

function getSupportedVoiceMimeType() {
  return ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus"]
    .find((mimeType) => MediaRecorder.isTypeSupported(mimeType)) || "";
}

async function transcribeVoice(blob, extension) {
  const formData = new FormData();
  formData.append("file", new File([blob], `voice.${extension}`, { type: blob.type }));
  formData.append("model", WHISPER_MODEL);

  let response;
  try {
    response = await postVoiceRecording(formData);
  } catch {
    voiceStatusEl.textContent = "Подключаю распознавание...";
    await new Promise((resolve) => window.setTimeout(resolve, 1200));
    try {
      response = await postVoiceRecording(formData);
    } catch {
      throw new Error("Сервис распознавания временно недоступен.");
    }
  }

  if (!response.ok) {
    let message = `Ошибка распознавания: HTTP ${response.status}.`;
    try {
      const error = await response.json();
      if (error.message) message = error.message;
    } catch {
      // Keep the HTTP fallback when the helper cannot provide JSON.
    }
    throw new Error(message);
  }

  const result = await response.json();
  return typeof result.text === "string" ? result.text.trim() : "";
}

function postVoiceRecording(formData) {
  return fetch(VOICE_TRANSCRIPTION_URL, {
    method: "POST",
    body: formData,
  });
}

// -- End voice search -----------------------------------------------------------

function collectTileUrls(tile) {
  if (tile?.type === "group") {
    return (tile.tiles || []).flatMap(collectTileUrls);
  }
  return tile?.url ? [tile.url] : [];
}

async function removeBookmarkForUrl(url) {
  if (!globalThis.chrome?.bookmarks?.search) return;
  try {
    const results = await chrome.bookmarks.search({ url });
    for (const bookmark of results) {
      await chrome.bookmarks.remove(bookmark.id);
    }
  } catch (error) {
    console.error("Не удалось удалить закладку:", error);
  }
}
