import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
  } from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import * as fromTodos from './todos.reducer';

export interface State {
    todos: fromTodos.State;
}

export const reducers: ActionReducerMap<State> = {
    todos: fromTodos.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return (state, action) => {
      const result = reducer(state, action);
      console.groupCollapsed(action.type);
      console.log('prev state', state);
      console.log('action', action);
      console.log('next state', result);
      console.groupEnd();

      return result;
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger]
    : [];

/**
 * Reducers
 */
export const getTodosState = createFeatureSelector<State, fromTodos.State>('todos');


/**
 * Layout
 */
export const getTodos = createSelector(getTodosState, fromTodos.getTodos);

export const isLoading = createSelector(getTodosState, fromTodos.isLoading);

export const getError = createSelector(getTodosState, fromTodos.getError);
