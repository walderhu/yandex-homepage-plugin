const BOOKMARK_QUEUE_STORAGE_KEY = "homepage.bookmarkQueue.v1";
const NEW_TAB_REDIRECT_URL = chrome.runtime.getURL("index.html");

chrome.bookmarks?.onCreated?.addListener((id, bookmark) => {
  enqueueBookmark(bookmark).catch((error) => {
    console.error("Не удалось сохранить закладку для новой вкладки:", error);
  });
});

chrome.action?.onClicked?.addListener(() => {
  chrome.tabs.create({
    url: NEW_TAB_REDIRECT_URL,
  });
});

chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
  if (removeInfo.isWindowClosing) return;
  const remaining = await chrome.tabs.query({ windowId: removeInfo.windowId });
  if (remaining.length === 0) {
    chrome.tabs.create({ windowId: removeInfo.windowId, url: NEW_TAB_REDIRECT_URL });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "request-youtube-title") {
    requestYouTubeTitle(message.url)
      .then((title) => sendResponse({ ok: true, title }))
      .catch((error) => sendResponse({ ok: false, error: error.message }));

    return true;
  }

  if (message?.type === "request-habr-title") {
    requestHabrTitle(message.kind, message.id)
      .then((titleHtml) => sendResponse({ ok: true, titleHtml }))
      .catch((error) => sendResponse({ ok: false, error: error.message }));

    return true;
  }

  if (message?.type !== "request-url") return false;

  requestUrl(message.url)
    .then((value) => sendResponse({ ok: true, value }))
    .catch((error) => sendResponse({ ok: false, error: error.message }));

  return true;
});

async function enqueueBookmark(bookmark) {
  if (!isBookmarkTile(bookmark)) return;

  const saved = await chrome.storage.local.get(BOOKMARK_QUEUE_STORAGE_KEY);
  const queue = Array.isArray(saved[BOOKMARK_QUEUE_STORAGE_KEY])
    ? saved[BOOKMARK_QUEUE_STORAGE_KEY]
    : [];

  const nextBookmark = {
    id: bookmark.id,
    title: bookmark.title || "",
    url: bookmark.url,
  };

  const nextQueue = [
    ...queue.filter((item) => item?.id !== bookmark.id && item?.url !== bookmark.url),
    nextBookmark,
  ].slice(-100);

  await chrome.storage.local.set({ [BOOKMARK_QUEUE_STORAGE_KEY]: nextQueue });
}

function isBookmarkTile(bookmark) {
  if (!bookmark?.url) return false;

  try {
    const url = new URL(bookmark.url);
    return /^https?:$/.test(url.protocol);
  } catch {
    return false;
  }
}

async function requestYouTubeTitle(url) {
  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`YouTube ответил HTTP ${response.status}`);
  }

  const data = await response.json();
  if (typeof data.title !== "string" || !data.title.trim()) {
    throw new Error("YouTube не вернул название видео");
  }

  return `${data.title.trim()} - YouTube`;
}

async function requestHabrTitle(kind, id) {
  const endpoint = `https://habr.com/kek/v2/${kind}/${id}/`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Habr ответил HTTP ${response.status}`);
  }

  const data = await response.json();
  if (typeof data.titleHtml !== "string" || !data.titleHtml.trim()) {
    throw new Error("Habr не вернул название публикации");
  }

  return data.titleHtml;
}

// Browser-extension equivalent of Obsidian's requestUrl(url).
async function requestUrl(url) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Сайт ответил HTTP ${response.status}`);
  }

  const headers = {};
  response.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  return {
    headers,
    text: await response.text(),
  };
}
