import { Query, Mutation, SchemaRoot } from 'typegql';
import { Todo } from '../../models/todo'
import TodosService from '../../services/todos.service';
import { TodoRequest } from './types';

@SchemaRoot()
export class SchemaV1 {

  @Query({ type: [Todo] })
  async getTodos(): Promise<Todo[]> {
    return TodosService.getTodos();
  }

  @Mutation({ type: Todo })
  async addTodo(text: string): Promise<Todo> {

    const newTodo: Todo = await TodosService.addTodo(text);

    return newTodo;
  }

  @Mutation({ type: Todo })
  async updateTodo(todo: TodoRequest): Promise<Todo> {

    const updateTodo: Todo = await TodosService.updateTodo(todo.id);

    return updateTodo;
  }

  @Mutation({ type: Todo })
  async deleteTodo(id: number): Promise<Todo> {

    const deletedTodo: Todo = await TodosService.deleteTodo(id);

    return deletedTodo;
  }

}