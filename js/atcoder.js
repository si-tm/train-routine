window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("https://kenkoooo.com/atcoder/resources/problems.json");
    const problems = await response.json();

    if (!problems.length) throw new Error("AtCoder問題が取得できませんでした");

    const randomProblem = problems[Math.floor(Math.random() * problems.length)];

    const ul = document.getElementById("atcoder-articles");
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = `https://atcoder.jp/contests/${randomProblem.contest_id}/tasks/${randomProblem.id}`;
    a.textContent = `[${randomProblem.contest_id}] ${randomProblem.title}`;
    a.target = "_blank";

    li.appendChild(a);
    ul.appendChild(li);
  } catch (err) {
    console.log("AtCoder取得エラー:", err);
  }
});
