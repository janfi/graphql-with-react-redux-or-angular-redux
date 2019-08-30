import { Todo } from '../../models/Todo';

export interface TodoState {
    todos: Todo[],
    loading: boolean,
    error: string,
}