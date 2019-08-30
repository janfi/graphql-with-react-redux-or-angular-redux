import { TodoActionsTypes, REQUEST_START, REQUEST_FAIL, FETCH_TODOS_SUCCESS, ADD_TODO_SUCCESS, UPDATE_TODO_SUCCESS, DELETE_TODO_SUCCESS, FETCH_TODOS, UPDATE_TODO, DELETE_TODO, ADD_TODO } from './types';
import { Todo } from '../../models/Todo';

export function requestStart(): TodoActionsTypes {
    return {
      type: REQUEST_START
    }
}

export function requestFail(error: any): TodoActionsTypes {
    return {
        type: REQUEST_FAIL,
        error
    }
}

export function addTodo(text: string): TodoActionsTypes {
    return {
        type: ADD_TODO,
        payload: {
            text,
        }
    }
}

export function addTodoSuccess(todo: Todo): TodoActionsTypes {
    return {
        type: ADD_TODO_SUCCESS,
        payload: {
            todo,
        }
    }
}

export function fetchTodos(): TodoActionsTypes {
    return {
        type: FETCH_TODOS,
    }
}

export function fetchTodosSuccess(todos: Todo[]): TodoActionsTypes {
    return {
        type: FETCH_TODOS_SUCCESS,
        payload: {
            todos,
        }
    }
}

export function updateTodo(todo: Todo): TodoActionsTypes {
    return {
        type: UPDATE_TODO,
        payload: {
            todo,
        }
    }
}

export function updateTodoSuccess(todo: Todo): TodoActionsTypes {
    return {
        type: UPDATE_TODO_SUCCESS,
        payload: {
            todo,
        }
    }
}

export function deleteTodo(id: number): TodoActionsTypes {
    return {
        type: DELETE_TODO,
        payload: {
            id,
        }
    }
}

export function deleteTodoSuccess(id: number): TodoActionsTypes {
    return {
        type: DELETE_TODO_SUCCESS,
        payload: {
            id,
        }
    }
}