async function sendMemo() {
  const note = document.getElementById("memoInput").value;

  const res = await fetch("https://memo-worker.densha-routine.workers.dev", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note })
  });

  if (res.ok) {
    alert("送信成功！");
  } else {
    const text = await res.text();
    console.error("送信失敗", text);
    alert("送信失敗: " + text);
  }
}
