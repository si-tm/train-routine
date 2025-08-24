// 一時保存リスト（localStorageに保存）
function getTempMemos() {
  return JSON.parse(localStorage.getItem("tempMemos") || "[]");
}

function saveTempMemos(memos) {
  localStorage.setItem("tempMemos", JSON.stringify(memos));
}

// 単語クリックで一時保存
function addWordToMemo(word) {
  let memos = getTempMemos();
  memos.push(`- ${word}`); // Markdown形式
  saveTempMemos(memos);
  alert(`一時保存: ${word}`);
}

// メモ入力から追加（送信前に一時保存へ）
function addMemoFromInput() {
  const note = document.getElementById("memoInput").value.trim();
  if (!note) return;

  let memos = getTempMemos();
  memos.push(`- ${note}`);
  saveTempMemos(memos);

  document.getElementById("memoInput").value = "";
  alert("一時保存しました！");
}

// サーバへ送信
async function sendMemo() {
  const memos = getTempMemos();
  if (memos.length === 0) {
    alert("送信するメモがありません");
    return;
  }

  const markdownText = memos.join("\n");

  const res = await fetch("https://memo-worker.densha-routine.workers.dev", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note: markdownText })
  });

  if (res.ok) {
    alert("送信成功！");
    localStorage.removeItem("tempMemos"); // 成功したらクリア
  } else {
    const text = await res.text();
    console.error("送信失敗", text);
    alert("送信失敗: " + text);
  }
}
