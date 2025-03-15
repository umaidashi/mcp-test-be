import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { swaggerUI } from '@hono/swagger-ui';
import todoRouter from './src/routes/todo';

// メインのHonoアプリケーションを作成
const app = new Hono();

// ミドルウェアを追加
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', cors());

// OpenAPIドキュメントとSwagger UIを設定
app.get('/openapi.json', (c) => {
  return c.json(todoRouter.getOpenAPIDocument({
    openapi: '3.0.0',
    info: {
      title: 'TODO API',
      version: '1.0.0',
      description: 'シンプルなTODO管理API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'ローカル開発サーバー',
      },
    ],
  }));
});

app.get('/openapi', swaggerUI({ url: '/openapi.json' }));

// TODOルーターをマウント
app.route('/todos', todoRouter);

// ルートパスのハンドラー
app.get('/', (c) => {
  return c.json({
    message: 'TODO APIへようこそ！',
    documentation: '/openapi',
    endpoints: {
      todos: '/todos',
    },
  });
});

// サーバーを起動
const port = Number.parseInt(process.env.PORT || '3000', 10);
console.log(`サーバーを起動しています: http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};