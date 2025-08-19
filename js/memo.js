async function sendMemo() {
  const text = document.getElementById("memo-input").value.trim();
  const key = document.getElementById("memo-key").value.trim();

  if (!text) { alert("メモを入力してください"); return; }
  if (!key) { alert("送信キーを入力してください"); return; }

  try {
    const res = await fetch("https://api.github.com/repos/si-tm/train-routine/dispatches", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/vnd.github+json",
        "Authorization": `token ${key}` // キーをここで使う
      },
      body: JSON.stringify({
        event_type: "append_memo",
        client_payload: { memo: text }
      })
    });

    if (res.ok) {
      alert("メモ送信しました！");
      document.getElementById("memo-input").value = "";
      document.getElementById("memo-key").value = "";
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
