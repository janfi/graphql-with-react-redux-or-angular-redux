import { Todo } from "../models/todo";
import moment from 'moment';

let todos: Todo[] = [];

class TodosService {

    constructor () {

    }

    getTodos(): Promise<Todo[]> {
        return new Promise((resolve, reject) => { 
            resolve(todos);
        });
    }

    addTodo(text: string): Promise<Todo>   {

        return new Promise((resolve, reject) => { 
            const id = this.getId();

            const newTodo: Todo = new Todo() 
            newTodo.id = id;
            newTodo.text = text;
            newTodo.completed = false;
            newTodo.completedAt = '';

            todos.push(newTodo);

            resolve(newTodo);
        });

    }

    updateTodo(id: number): Promise<Todo> {
        
        return new Promise((resolve, reject) => { 
            
            const todoPos = todos.map(todo => todo.id).indexOf(id);
            const updatedTodo = todos[todoPos];
            updatedTodo.completed = !todos[todoPos].completed;
            updatedTodo.completedAt = todos[todoPos].completedAt ? '' : moment().calendar();

            todos.splice(todoPos, 1);
            todos.push(updatedTodo);

            resolve(updatedTodo);
        });
    }

    deleteTodo(id: number): Promise<Todo> {
        
        return new Promise((resolve, reject) => { 
            
            const todoPos = todos.map(todo => todo.id).indexOf(id);
            const todo = todos[todoPos];
            todos.splice(todoPos, 1);

            resolve(todo);
        });
    }

    getId() {

        const ids = todos.map(todo => todo.id);
        let id = 1;
        if (ids.length !== 0) {
            id = Math.max(...ids) + 1;
        }

        return id;

    }

}

let instance:TodosService = null
const getInstance = () => {
    if (instance === null) {
        instance = new TodosService();
    }
    return instance
}

export default getInstance();