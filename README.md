# TODOアプリ バックエンド

Honoを使用したシンプルなTODOアプリのバックエンドAPIです。

## 機能

- TODOの作成、取得、更新、削除（CRUD操作）
- OpenAPIドキュメント（Swagger UI）
- メモリ上でのデータ保存
- RESTful API

## 技術スタック

- [Bun](https://bun.sh/) - JavaScriptランタイム
- [Hono](https://hono.dev/) - 軽量で高速なWebフレームワーク
- [Zod](https://zod.dev/) - TypeScriptファーストのスキーマバリデーションライブラリ
- [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi) - ZodスキーマからOpenAPIドキュメントを生成

## 始め方

### 前提条件

- [Bun](https://bun.sh/) がインストールされていること

### インストール

```bash
# 依存関係をインストール
bun install
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動（ファイル変更の監視なし）
bun run index.ts

# または、開発モードで起動（ファイル変更を監視して自動再起動）
bun run dev
```

サーバーは http://localhost:8080 で起動します。

## API エンドポイント

- `GET /todos` - すべてのTODOを取得
- `GET /todos/:id` - 特定のTODOを取得
- `POST /todos` - 新しいTODOを作成
- `PUT /todos/:id` - TODOを更新
- `DELETE /todos/:id` - TODOを削除

## API ドキュメント

OpenAPIドキュメントは以下のURLで確認できます：

- Swagger UI: http://localhost:8080/openapi
- OpenAPI JSON: http://localhost:8080/openapi.json

## ライセンス

MIT
