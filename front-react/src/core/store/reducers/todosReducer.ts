import { TodoState } from './types';
import * as TodoActions from '../actions/types';

const initialState : TodoState = {
  todos: [],
  loading: false,
  error: '',
};

const todosReducer = (state = initialState, action: TodoActions.TodoActionsTypes): TodoState  => {

  switch (action.type) {
    
    case TodoActions.REQUEST_START:
      return {
        ...state,
        loading: true,
    };
    
    case TodoActions.FETCH_TODOS:
      return {
        ...state,
        loading: true
    };

    case TodoActions.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.concat(action.payload.todos),
    };
    
    case TodoActions.ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: [...state.todos, action.payload.todo],
      };

    case TodoActions.UPDATE_TODO_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.todo.id) {
            return Object.assign({}, todo, {
              ...action.payload.todo,
            });
          }
          return todo;
        }),
      });
    case TodoActions.DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };

    case TodoActions.REQUEST_FAIL:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default todosReducer;