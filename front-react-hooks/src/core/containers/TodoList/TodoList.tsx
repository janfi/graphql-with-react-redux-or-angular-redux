import  * as React  from 'react';
import './ToDoList.css';
import { Input, Dimmer, Loader, Segment, Message } from 'semantic-ui-react';
import { TodoListWrapper } from './Style';
import { AppState } from '../../store';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../../store/actions/todoActions';
import { useSelector, useDispatch } from 'react-redux';
import { TodoItem } from '../../components';
import { Todo } from '../../models/Todo';
import { todosSelector, loadingSelector, errorSelector } from '../../store/reducers/todosSelectors';

const TodoList = () => {


    const inputRef = React.useRef<Input>(null);
    const dispatch = useDispatch();
    const todos = useSelector<AppState, Todo[]>(todosSelector);
    const loading = useSelector<AppState, boolean>(loadingSelector);
    const error = useSelector<AppState, string>(errorSelector);

    React.useEffect(() => {
        fetchTodos();
        inputRef.current!.focus(); 
    }, []);

    const handleClickAddButton = () => {

        const text = (inputRef.current! as any).inputRef.current.value;
        if (text) {
            addTodo(text);
            (inputRef.current! as any).inputRef.current.value = '';
        }
        
    };

    const catchReturn = (e: React.KeyboardEvent) => {
        const text = (e.target as HTMLInputElement).value;
        if (e.key === 'Enter' &&  text !== '') {
            dispatch(addTodo(text));
            (e.target as HTMLInputElement).value = '';
            e.preventDefault();
        }
    };

    const handleUpdate = (todo: Todo) => {
        inputRef.current!.focus(); 
        return dispatch(updateTodo(todo));
    }

    const handleDelete = (id: number) => {
        inputRef.current!.focus(); 
        return dispatch(deleteTodo(id));
    }

    const sortedTodos = todos.sort((a, b) => a.text > b.text ? 1 : 0);
    const errorMessage = (
        <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>Please try again later</p>
        </Message>
    );

    return (
        <TodoListWrapper>
            <div className="todolist-title">Liste des todos - hooks</div>
            <Input
                placeholder="Add Todos ..."
                fluid
                action={{
                    icon: 'add',
                    onClick: () => handleClickAddButton(),
                }}
                onKeyDown={catchReturn}
                ref = {inputRef}
            />
                {error ? (
                errorMessage
            ) : (
                <Segment>
                    <Dimmer active={loading} inverted>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    {sortedTodos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} updateTodo={handleUpdate} deleteTodo={handleDelete} />
                    ))}
                </Segment>
            )}
        </TodoListWrapper>
    );
    
};

export default TodoList;