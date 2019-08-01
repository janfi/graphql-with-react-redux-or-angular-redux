import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const SERVER_GRAPHQL = 'http://localhost:8080/graphql';

@Injectable({
  providedIn: 'root'
})
export class TodosService {



  constructor(
    private http: HttpClient
    ) { }

  public getTodos(): Observable<Todo[]> {
      const query = `{
          todos: getTodos {
              id
              text
              completed
              completedAt
          }
      }`;
      return this.http.post<any>(SERVER_GRAPHQL, {
        query
      }).pipe(
        map(result => result.data.todos)
      );
  }

  public addTodoServer(text: string): Observable<Todo> {

      const query = `mutation($text: String!){
          todo: addTodo(text: $text){
            id
            text
            completed
            completedAt
          }
      }`;
      return this.http.post<any>(SERVER_GRAPHQL, {
          query,
          variables: {
              text
          }
      }).pipe(
        map(result => result.data.todo)
      );
  }

  public updateTodoServer(todo: Todo): Observable<Todo> {

      const query = `mutation($todo: TodoRequest!){
          todo: updateTodo(todo: $todo){
            id
            text
            completed
            completedAt
          }
      }`;
      return this.http.post<any>(SERVER_GRAPHQL, {
          query,
          variables: {
              todo: {id: todo.id, text: todo.text, completed: todo.completed},
          }
      }).pipe(
        map(result => result.data.todo)
      );
  }

  public deleteTodoServer(id: number): Observable<number> {

      const query = `mutation($id: Float!){
          id: deleteTodo(id: $id) {
              id
          }
      }`;
      return this.http.post<any>(SERVER_GRAPHQL, {
          query,
          variables: {
            id
          }
      }).pipe(
        map(result => result.data.id.id)
      );
  }


}
