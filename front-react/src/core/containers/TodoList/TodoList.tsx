import  * as React  from 'react';
import './ToDoList.css';
import { Input, Dimmer, Loader, Segment, Message } from 'semantic-ui-react';
import { TodoListWrapper } from './Style';
import { AppState } from '../../store';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../../store/actions/todoActions';
import { connect } from 'react-redux';
import { TodoItem } from '../../components';
import { Todo } from '../../models/Todo';

interface IProps {
    todos: any[],
    loading: boolean,
    error: string,
    addTodo: typeof addTodo,
    fetchTodos: typeof fetchTodos,
    updateTodo: typeof updateTodo,
    deleteTodo: typeof deleteTodo,
}

class TodoList extends React.Component<IProps> {  

    private inputRef:  React.RefObject<Input>;

    constructor(props:IProps) {
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchTodos();
        this.inputRef.current!.focus(); 
    }

    handleClickAddButton = () => {

        const text = (this.inputRef.current! as any).inputRef.current.value;
        if (text) {
            this.props.addTodo(text);
            (this.inputRef.current! as any).inputRef.current.value = '';
        }
        
    };

    catchReturn = (e: React.KeyboardEvent) => {
        const text = (e.target as HTMLInputElement).value;
        if (e.key === 'Enter' &&  text !== '') {
            this.props.addTodo(text);
            (e.target as HTMLInputElement).value = '';
            e.preventDefault();
        }
    };

    handleUpdate = (todo: Todo) => {
        this.inputRef.current!.focus(); 
        return this.props.updateTodo(todo);
    }

    handleDelete = (id: number) => {
        this.inputRef.current!.focus(); 
        return this.props.deleteTodo(id);
    }

    render() {
        const {
            todos, loading, error,
        }: IProps = this.props;

        const sortedTodos = todos.sort((a, b) => a.text > b.text ? 1 : 0);
        const errorMessage = (
            <Message negative>
              <Message.Header>Something went wrong</Message.Header>
              <p>Please try again later</p>
            </Message>
        );

        return (
            <TodoListWrapper>
                <div className="todolist-title">Liste des todos</div>
                <Input
                    placeholder="Add Todos ..."
                    fluid
                    action={{
                        icon: 'add',
                        onClick: () => this.handleClickAddButton(),
                    }}
                    onKeyDown={this.catchReturn}
                    ref = {this.inputRef}
                />
                 {error ? (
                    errorMessage
                ) : (
                    <Segment>
                        <Dimmer active={loading} inverted>
                            <Loader>Loading</Loader>
                        </Dimmer>
                        {sortedTodos.map(todo => (
                            <TodoItem key={todo.id} todo={todo} updateTodo={this.handleUpdate} deleteTodo={this.handleDelete} />
                        ))}
                    </Segment>
                )}
            </TodoListWrapper>
        );
    }
};

const mapStateToProps = (state: AppState) => ({
    todos: state.todos.todos,
    loading: state.todos.loading,
    error: state.todos.error,
});

const mapDispatchToProps = {
    fetchTodos:fetchTodos,
    addTodo:addTodo,
    updateTodo:updateTodo,
    deleteTodo:deleteTodo,
};


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);