import { TodosActions } from '../actions';
import { Todo } from '../../models/Todo';

export interface State {
    todos: Todo[];
    loading: boolean;
    error: string;
}

export const initialState: State = {
    todos: [],
    loading: false,
    error: '',
};

export function reducer(
  state = initialState,
  action: TodosActions.Actions
): State {
  switch (action.type) {
    case TodosActions.requestStart.type:
      return {
        ...state,
        loading: true,
    };

    case TodosActions.fetchTodos.type:
      return {
        ...state,
        loading: true
    };

    case TodosActions.fetchTodosSuccess.type:
      return {
        ...state,
        loading: false,
        todos: state.todos.concat(action.todos),
    };

    case TodosActions.addTodoSuccess.type:
      return {
        ...state,
        loading: false,
        todos: [...state.todos, action.todo],
      };

    case TodosActions.updateTodoSuccess.type:
      return Object.assign({}, state, {
        loading: false,
        todos: state.todos.map((todo) => {
          if (todo.id === action.todo.id) {
            return Object.assign({}, todo, {
              ...action.todo,
            });
          }
          return todo;
        }),
      });
    case TodosActions.deleteTodoSuccess.type:
      return {
        ...state,
        loading: false,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    case TodosActions.requestFail.type:
      return {
        ...state,
        error: action.error,
      };

    default: {
      return state;
    }
  }
}

export const getTodos = (state: State) => state.todos;
export const isLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
