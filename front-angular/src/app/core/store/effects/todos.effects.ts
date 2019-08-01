import { TodosService } from './../../services/todos.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
    TodosActions
} from '../actions';

@Injectable()
export class TodosEffects {


  @Effect()
  fetch$ = this.actions$.pipe(
    ofType(TodosActions.fetchTodos),
    exhaustMap(() => {
      return this.todosApi.getTodos().pipe(
        map((todos) => TodosActions.fetchTodosSuccess({todos})),
        catchError(error => of(TodosActions.requestFail({ error })))
      );
    })
  );

  @Effect()
  add$ = this.actions$.pipe(
    ofType(TodosActions.addTodo),
    map(action => ({text: action.text})),
    exhaustMap(({text}) => {
      return this.todosApi.addTodoServer(text).pipe(
        map((todo) => TodosActions.addTodoSuccess({todo})),
        catchError(error => of(TodosActions.requestFail({ error })))
      );
    })
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType(TodosActions.updateTodo),
    map(action => ({todo: action.todo})),
    exhaustMap(({todo}) => {
      return this.todosApi.updateTodoServer(todo).pipe(
        map((result) => TodosActions.updateTodoSuccess({todo: result})),
        catchError(error => of(TodosActions.requestFail({ error })))
      );
    })
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType(TodosActions.deleteTodo),
    map(action => ({id: action.id})),
    exhaustMap(({id}) => {
      return this.todosApi.deleteTodoServer(id).pipe(
        map((result) => TodosActions.deleteTodoSuccess({id: result})),
        catchError(error => of(TodosActions.requestFail({ error })))
      );
    })
  );

  constructor(
    private actions$: Actions<TodosActions.Actions>,
    private todosApi: TodosService
  ) {}
}
