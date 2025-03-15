import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { 
  CreateTodoSchema, 
  TodoResponseSchema, 
  TodoListResponseSchema, 
  UpdateTodoSchema 
} from '../models/todo';
import { todoService } from '../services/todo';
import { z } from 'zod';

// OpenAPIHonoインスタンスを作成
const todoRouter = new OpenAPIHono();

// GET /todos - すべてのTODOを取得
const getAllTodosRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['todos'],
  summary: 'すべてのTODOを取得',
  description: 'すべてのTODOリストを取得します',
  responses: {
    200: {
      description: 'TODOリストの取得に成功',
      content: {
        'application/json': {
          schema: TodoListResponseSchema,
        },
      },
    },
  },
});

todoRouter.openapi(getAllTodosRoute, (c) => {
  const todos = todoService.getAllTodos();
  return c.json(todos);
});

// GET /todos/:id - 特定のTODOを取得
const getTodoByIdRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['todos'],
  summary: '特定のTODOを取得',
  description: 'IDを指定して特定のTODOを取得します',
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: 'TODOの取得に成功',
      content: {
        'application/json': {
          schema: TodoResponseSchema,
        },
      },
    },
    404: {
      description: '指定されたIDのTODOが見つかりません',
    },
  },
});

todoRouter.openapi(getTodoByIdRoute, (c) => {
  const { id } = c.req.valid('param');
  const todo = todoService.getTodoById(id);
  
  if (!todo) {
    return c.json({ message: '指定されたIDのTODOが見つかりません' }, 404);
  }
  
  return c.json(todo);
});

// POST /todos - 新しいTODOを作成
const createTodoRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['todos'],
  summary: '新しいTODOを作成',
  description: '新しいTODOを作成します',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateTodoSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'TODOの作成に成功',
      content: {
        'application/json': {
          schema: TodoResponseSchema,
        },
      },
    },
    400: {
      description: 'リクエストデータが不正です',
    },
  },
});

todoRouter.openapi(createTodoRoute, (c) => {
  const data = c.req.valid('json');
  const newTodo = todoService.createTodo(data);
  return c.json(newTodo, 201);
});

// PUT /todos/:id - TODOを更新
const updateTodoRoute = createRoute({
  method: 'put',
  path: '/{id}',
  tags: ['todos'],
  summary: 'TODOを更新',
  description: '指定されたIDのTODOを更新します',
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        'application/json': {
          schema: UpdateTodoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'TODOの更新に成功',
      content: {
        'application/json': {
          schema: TodoResponseSchema,
        },
      },
    },
    404: {
      description: '指定されたIDのTODOが見つかりません',
    },
    400: {
      description: 'リクエストデータが不正です',
    },
  },
});

todoRouter.openapi(updateTodoRoute, (c) => {
  const { id } = c.req.valid('param');
  const data = c.req.valid('json');
  
  const updatedTodo = todoService.updateTodo(id, data);
  
  if (!updatedTodo) {
    return c.json({ message: '指定されたIDのTODOが見つかりません' }, 404);
  }
  
  return c.json(updatedTodo);
});

// DELETE /todos/:id - TODOを削除
const deleteTodoRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: ['todos'],
  summary: 'TODOを削除',
  description: '指定されたIDのTODOを削除します',
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    204: {
      description: 'TODOの削除に成功',
    },
    404: {
      description: '指定されたIDのTODOが見つかりません',
    },
  },
});

todoRouter.openapi(deleteTodoRoute, (c) => {
  const { id } = c.req.valid('param');
  const deleted = todoService.deleteTodo(id);
  
  if (!deleted) {
    return c.json({ message: '指定されたIDのTODOが見つかりません' }, 404);
  }
  
  return c.body(null, 204);
});

export default todoRouter; 