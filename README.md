# train-routine

## memo

```sh
cd routine-site/worker
wrangler login
wrangler secret put GITHUB_TOKEN   # ここに PAT を登録（repo + workflow 権限）
wrangler deploy
```

Personal Access Token (PAT) を作成
GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
必要な権限：
repo → repo:status, repo_deployment, public_repo など
workflow → workflow 権限（repository_dispatch を使う場合）
