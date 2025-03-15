import { z } from 'zod';

// TODOのステータス
export const TodoStatus = z.enum(['未完了', '完了']);
export type TodoStatus = z.infer<typeof TodoStatus>;

// TODOのスキーマ
export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  description: z.string().optional(),
  status: TodoStatus,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Todo = z.infer<typeof TodoSchema>;

// TODOの作成リクエストスキーマ
export const CreateTodoSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  description: z.string().optional(),
});

export type CreateTodoRequest = z.infer<typeof CreateTodoSchema>;

// TODOの更新リクエストスキーマ
export const UpdateTodoSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }).optional(),
  description: z.string().optional(),
  status: TodoStatus.optional(),
});

export type UpdateTodoRequest = z.infer<typeof UpdateTodoSchema>;

// TODOのレスポンススキーマ
export const TodoResponseSchema = TodoSchema;
export type TodoResponse = z.infer<typeof TodoResponseSchema>;

// TODOリストのレスポンススキーマ
export const TodoListResponseSchema = z.array(TodoResponseSchema);
export type TodoListResponse = z.infer<typeof TodoListResponseSchema>; 