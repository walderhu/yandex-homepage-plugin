/*
 * Extracted from obsidian-auto-link-title. The only browser-extension
 * adaptation is requestUrl(), which replaces Obsidian's requestUrl API.
 */
(function () {
  function blank(text) {
    return text === undefined || text === null || text === "";
  }

  function notBlank(text) {
    return !blank(text);
  }

  async function scrape(url, signal) {
    const response = await requestUrl(url, signal);
    const contentType = response.headers["content-type"] || "";
    if (!contentType.includes("text/html")) {
      return getUrlFinalSegment(url);
    }

    const doc = new DOMParser().parseFromString(response.text, "text/html");
    const title = doc.querySelector("title");
    const titleText = title?.textContent;
    if (blank(titleText)) {
      const noTitle = title?.getAttribute("no-title");
      if (notBlank(noTitle)) {
        return noTitle;
      }

      return url;
    }

    return titleText;
  }

  function getUrlFinalSegment(url) {
    try {
      const segments = new URL(url).pathname.split("/");
      return segments.pop() || segments.pop();
    } catch {
      return "File";
    }
  }

  async function getPageTitle(url, signal) {
    if (!(url.startsWith("http") || url.startsWith("https"))) {
      url = `https://${url}`;
    }

    return scrape(url, signal);
  }

  function fallbackTitle(url) {
    return new URL(url).hostname.replace(/^www\./i, "");
  }

  async function fetchTitle(url, signal) {
    if (isYouTubeVideo(url)) {
      const youtubeTitle = await fetchYouTubeTitle(url, signal);
      if (youtubeTitle) return youtubeTitle;
    }

    const habrPublication = getHabrPublication(url);
    if (habrPublication) {
      const habrTitle = await fetchHabrTitle(habrPublication, signal);
      if (habrTitle) return habrTitle;
    }

    const title = await getPageTitle(url, signal);
    return title.replace(/(\r\n|\n|\r)/gm, "").trim() || "Title Unavailable | Site Unreachable";
  }

  function isYouTubeVideo(value) {
    try {
      const url = new URL(value);
      const hostname = url.hostname.replace(/^www\./i, "");
      return (hostname === "youtube.com" && url.pathname === "/watch" && url.searchParams.has("v"))
        || (hostname === "youtu.be" && url.pathname.length > 1);
    } catch {
      return false;
    }
  }

  async function fetchYouTubeTitle(url, signal) {
    if (typeof chrome === "undefined" || !chrome.runtime?.sendMessage) {
      const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
      const response = await fetch(endpoint, { signal });
      if (!response.ok) return "";

      const data = await response.json();
      return data.title ? `${data.title.trim()} - YouTube` : "";
    }

    return new Promise((resolve, reject) => {
      const onAbort = () => reject(new DOMException("Aborted", "AbortError"));
      signal?.addEventListener("abort", onAbort, { once: true });

      chrome.runtime.sendMessage({ type: "request-youtube-title", url }, (response) => {
        signal?.removeEventListener("abort", onAbort);
        if (signal?.aborted) return;

        const runtimeError = chrome.runtime.lastError;
        if (runtimeError) {
          reject(new Error(runtimeError.message));
          return;
        }

        resolve(response?.ok ? response.title : "");
      });
    });
  }

  function getHabrPublication(value) {
    try {
      const url = new URL(value);
      if (url.hostname.replace(/^www\./i, "") !== "habr.com") return null;

      const match = url.pathname.match(/\/(articles|news)\/(\d+)(?:\/|$)/i);
      return match ? { kind: match[1].toLowerCase(), id: match[2] } : null;
    } catch {
      return null;
    }
  }

  async function fetchHabrTitle(publication, signal) {
    let titleHtml = "";
    if (typeof chrome === "undefined" || !chrome.runtime?.sendMessage) {
      const endpoint = `https://habr.com/kek/v2/${publication.kind}/${publication.id}/`;
      const response = await fetch(endpoint, { signal });
      if (!response.ok) return "";

      const data = await response.json();
      titleHtml = data.titleHtml || "";
    } else {
      const response = await requestMessage("request-habr-title", publication, signal);
      titleHtml = response?.ok ? response.titleHtml : "";
    }

    if (!titleHtml) return "";

    const doc = new DOMParser().parseFromString(titleHtml, "text/html");
    return `${doc.documentElement.textContent.trim()} / Хабр`;
  }

  function requestMessage(type, payload, signal) {
    return new Promise((resolve, reject) => {
      const onAbort = () => reject(new DOMException("Aborted", "AbortError"));
      signal?.addEventListener("abort", onAbort, { once: true });

      chrome.runtime.sendMessage({ type, ...payload }, (response) => {
        signal?.removeEventListener("abort", onAbort);
        if (signal?.aborted) return;

        const runtimeError = chrome.runtime.lastError;
        if (runtimeError) {
          reject(new Error(runtimeError.message));
          return;
        }

        resolve(response);
      });
    });
  }

  function requestUrl(url, signal) {
    if (typeof chrome === "undefined" || !chrome.runtime?.sendMessage) {
      return fetch(url, { signal }).then(async (response) => {
        if (!response.ok) {
          throw new Error(`Сайт ответил HTTP ${response.status}`);
        }

        return {
          headers: { "content-type": response.headers.get("content-type") || "" },
          text: await response.text(),
        };
      });
    }

    return new Promise((resolve, reject) => {
      const onAbort = () => reject(new DOMException("Aborted", "AbortError"));
      signal?.addEventListener("abort", onAbort, { once: true });

      chrome.runtime.sendMessage({ type: "request-url", url }, (response) => {
        signal?.removeEventListener("abort", onAbort);
        if (signal?.aborted) return;

        const runtimeError = chrome.runtime.lastError;
        if (runtimeError) {
          reject(new Error(runtimeError.message));
          return;
        }

        if (!response?.ok) {
          reject(new Error(response?.error || "requestUrl не получил ответ"));
          return;
        }

        resolve(response.value);
      });
    });
  }

  window.AutoLinkTitle = { fetchTitle, fallbackTitle };
})();
