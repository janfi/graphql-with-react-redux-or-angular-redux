import { createAction, union, props } from '@ngrx/store';
import { Todo } from '../../models/Todo';

export const requestStart = createAction('[Request] Start');
export const requestFail = createAction('[Request] Fail', props<{ error: any }>());

export const fetchTodos = createAction('[Todo] fetch');
export const fetchTodosSuccess = createAction('[Todo] fetch success', props<{ todos: Todo[] }>());


export const addTodo = createAction('[Todo] add', props<{ text: string }>());
export const addTodoSuccess = createAction('[Todo] add success', props<{ todo: Todo }>());

export const updateTodo = createAction('[Todo] update', props<{ todo: Todo }>());
export const updateTodoSuccess = createAction('[Todo] update success', props<{ todo: Todo }>());

export const deleteTodo = createAction('[Todo] delete', props<{ id: number }>());
export const deleteTodoSuccess = createAction('[Todo] delete success', props<{ id: number }>());

const all = union({
    requestStart, requestFail,
    fetchTodos, fetchTodosSuccess,
    addTodo, addTodoSuccess,
    updateTodo, updateTodoSuccess,
    deleteTodo, deleteTodoSuccess
 });
export type Actions = typeof all;
