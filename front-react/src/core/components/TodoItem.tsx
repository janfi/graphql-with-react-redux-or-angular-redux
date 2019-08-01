import React from 'react';
import { TodoItemWrapper, Text, TimeStamp, ActionButton } from './style';
import { updateTodo, deleteTodo } from '../store/actions/todoActions';
import { Todo } from '../models/Todo';

  

interface IProps {
    todo: Todo,
    updateTodo: typeof updateTodo,
    deleteTodo: typeof deleteTodo,
}

const TodoItem = ({ todo, updateTodo, deleteTodo }: IProps) => {

  const {
    completed, id, text, completedAt,
  }: Todo  = todo;

  return (
    <TodoItemWrapper completed={completed}>
      <Text completed={completed}>{text}</Text>
      <TimeStamp>{completed && completedAt}</TimeStamp>
      <ActionButton
        color={completed ? 'purple' : 'green'}
        inverted
        onClick={() => updateTodo({ ...todo, completed: !completed })}
      >
        {completed ? 'UNDO' : 'DONE'}
      </ActionButton>
      <ActionButton color="red" inverted
       onClick={() => deleteTodo(id)}
       >
        DELETE
      </ActionButton>
    </TodoItemWrapper>
  );
};

export default TodoItem;