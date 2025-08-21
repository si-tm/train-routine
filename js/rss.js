const RSS_FEEDS = {
  it: "https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml",
  security: "https://rss.itmedia.co.jp/rss/2.0/security.xml",
  bbc: "https://feeds.bbci.co.uk/news/technology/rss.xml",
  sre: "https://arxiv.org/rss/cs.SE"
};

// 別のCORSプロキシ
const CORS_PROXY = "https://corsproxy.io/?";

async function fetchAndDisplay(feedUrl, ulId, maxArticles=2) {
  try {
    const response = await fetch(CORS_PROXY + encodeURIComponent(feedUrl));
    const text = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    let items = [];
    if (xml.getElementsByTagName("item").length > 0) {
      items = Array.from(xml.getElementsByTagName("item")); // RSS
    } else {
      items = Array.from(xml.getElementsByTagName("entry")); // Atom
    }

    if (items.length === 0) {
      console.warn("記事が見つかりません:", feedUrl);
      return;
    }

    // シャッフル
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    const ul = document.getElementById(ulId);
    items.slice(0, maxArticles).forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");

      // RSSとAtom両対応
      let link = item.querySelector("link");
      const linkAtom = item.querySelector('link[rel="alternate"]');
      let aHref = "#";
      if (linkAtom) {
        aHref = linkAtom.getAttribute("href");
      } else if (link) {
        aHref = link.getAttribute("href") || link.textContent;
      }

      a.href = aHref;
      a.textContent = item.querySelector("title")?.textContent || "No title";
      a.target = "_blank";
      li.appendChild(a);
      ul.appendChild(li);
    });
  } catch (err) {
    console.log("RSS取得エラー:", feedUrl, err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplay(RSS_FEEDS.it, "it-articles", 1);
  fetchAndDisplay(RSS_FEEDS.security, "security-articles", 1);
  fetchAndDisplay(RSS_FEEDS.bbc, "bbc-articles", 1);
  fetchAndDisplay(RSS_FEEDS.sre, "sre-articles", 1);
});
