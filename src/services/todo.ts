import type { CreateTodoRequest, Todo, TodoStatus, UpdateTodoRequest } from '../models/todo';

// メモリ上にTODOデータを保存するクラス
export class TodoService {
  private todos: Map<string, Todo> = new Map();

  // すべてのTODOを取得
  getAllTodos(): Todo[] {
    return Array.from(this.todos.values());
  }

  // IDでTODOを取得
  getTodoById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  // 新しいTODOを作成
  createTodo(todoData: CreateTodoRequest): Todo {
    const now = new Date();
    const id = crypto.randomUUID();
    
    const newTodo: Todo = {
      id,
      title: todoData.title,
      description: todoData.description || '',
      status: '未完了' as TodoStatus,
      createdAt: now,
      updatedAt: now,
    };
    
    this.todos.set(id, newTodo);
    return newTodo;
  }

  // TODOを更新
  updateTodo(id: string, todoData: UpdateTodoRequest): Todo | undefined {
    const todo = this.todos.get(id);
    
    if (!todo) {
      return undefined;
    }
    
    const updatedTodo: Todo = {
      ...todo,
      title: todoData.title !== undefined ? todoData.title : todo.title,
      description: todoData.description !== undefined ? todoData.description : todo.description,
      status: todoData.status !== undefined ? todoData.status : todo.status,
      updatedAt: new Date(),
    };
    
    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  // TODOを削除
  deleteTodo(id: string): boolean {
    if (!this.todos.has(id)) {
      return false;
    }
    
    return this.todos.delete(id);
  }
}

// シングルトンインスタンスを作成
export const todoService = new TodoService(); 