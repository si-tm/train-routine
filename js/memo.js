async function sendMemo() {
  const text = document.getElementById("memo-input").value.trim();
  if (!text) { alert("メモを入力してください"); return; }

  try {
    const res = await fetch("/.netlify/functions/append-memo", { // サーバー側で安全に処理
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memo: text })
    });

    if (res.ok) {
      alert("メモ送信しました！");
      document.getElementById("memo-input").value = "";
    } else {
      const err = await res.json();
      console.error(err);
      alert("送信失敗");
    }
  } catch(e) {
    console.error(e);
    alert("エラーが発生しました");
  }
}
