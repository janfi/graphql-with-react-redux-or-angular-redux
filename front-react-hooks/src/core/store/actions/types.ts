import { Todo } from '../../models/Todo';

export const REQUEST_START = 'REQUEST_START'
export const REQUEST_FAIL = 'REQUEST_FAIL'
export const FETCH_TODOS = 'FETCH_TODOS'
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
export const UPDATE_TODO = 'UPDATE_TODO'
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'
export const DELETE_TODO = 'DELETE_TODO'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
export const ADD_TODO = 'ADD_TODO'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'


export interface requestStart {
    type: typeof REQUEST_START
}

export interface requestFail {
    type: typeof REQUEST_FAIL
    error: any,
}

export interface fetchTodos {
    type: typeof FETCH_TODOS
}

export interface fetchTodosSuccess {
    type: typeof FETCH_TODOS_SUCCESS
    payload: {
        todos: Todo[],
    }
}

export interface addTodo {
    type: typeof ADD_TODO
    payload: {
        text: string,
    }
}

export interface addTodoSuccess {
    type: typeof ADD_TODO_SUCCESS
    payload: {
        todo: Todo,
    }
}

export interface updateTodo {
    type: typeof UPDATE_TODO
    payload: {
        todo: Todo,
    }
}

export interface updateTodoSuccess {
    type: typeof UPDATE_TODO_SUCCESS
    payload: {
        todo: Todo,
    }
}

export interface deleteTodo {
    type: typeof DELETE_TODO
    payload: {
        id: number,
    }
}

export interface deleteTodoSuccess {
    type: typeof DELETE_TODO_SUCCESS
    payload: {
        id: number,
    }
}
export type TodoActionsTypes = requestStart | requestFail | fetchTodos | fetchTodosSuccess | addTodo | addTodoSuccess | updateTodo | updateTodoSuccess | deleteTodo | deleteTodoSuccess
