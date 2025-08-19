const RSS_FEEDS = {
  it: "https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml",
  security: "https://rss.itmedia.co.jp/rss/2.0/security.xml"
};
const CORS_PROXY = "https://api.allorigins.win/get?url=";

async function fetchAndDisplay(feedUrl, ulId, maxArticles=3) {
  try {
    const response = await fetch(CORS_PROXY + encodeURIComponent(feedUrl));
    const data = await response.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "application/xml");
    const items = Array.from(xml.querySelectorAll("item"));

    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    const ul = document.getElementById(ulId);
    items.slice(0, maxArticles).forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.querySelector("link").textContent;
      a.textContent = item.querySelector("title").textContent;
      a.target = "_blank";
      li.appendChild(a);
      ul.appendChild(li);
    });
  } catch (err) {
    console.log("RSS取得エラー:", err);
  }
}

fetchAndDisplay(RSS_FEEDS.it, "it-articles", 3);
fetchAndDisplay(RSS_FEEDS.security, "security-articles", 3);
