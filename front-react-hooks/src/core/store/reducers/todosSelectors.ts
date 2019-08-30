import { createSelector } from 'reselect'
import { TodoState } from '../../store/reducers/types';
import { Todo } from '../../models/Todo';
import { AppState } from '../../store';

export const todosSelector = createSelector<AppState, TodoState, Todo[]>(
    state => state.todos,
    todosState => todosState.todos
)

export const loadingSelector = createSelector<AppState, TodoState, boolean>(
    state => state.todos,
    todosState => todosState.loading
)

export const errorSelector = createSelector<AppState, TodoState, string>(
    state => state.todos,
    todosState => todosState.error
)