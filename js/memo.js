async function sendMemo() {
  const text = document.getElementById("memo-input").value.trim();
  if (!text) return alert("メモを入力してください");

  const res = await fetch("https://api.github.com/repos/si-tm/train-routine/dispatches", {
    method: "POST",
    headers: {
      "Accept": "application/vnd.github+json",
      "Content-Type": "application/json"
      // ★ Authorization ヘッダ不要（完全公開にするなら）
    },
    body: JSON.stringify({
      event_type: "add-memo",
      client_payload: { text: text }
    })
  });

  if (res.ok) {
    alert("メモを送信しました！（Actionsが保存します）");
    document.getElementById("memo-input").value = "";
  } else {
    const err = await res.json();
    console.error("送信失敗", err);
    alert("送信失敗");
  }
}