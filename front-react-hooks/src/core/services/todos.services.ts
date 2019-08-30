import Axios from 'axios';
import { Todo } from '../models/Todo';

const SERVER_GRAPHQL: string  = 'http://localhost:8080/graphql';

export default class TodosService {

    public static async getTodos(): Promise<Todo[]> {
        const query = `{
            todos: getTodos {
                id
                text
                completed
                completedAt
            }
        }`;
        return Axios.post(SERVER_GRAPHQL,{
            query
        })
        .then((result) => {
            return result.data.data.todos;
        });
    }

    public static async addTodoServer(text: string): Promise<Todo> {
        
        const query = `mutation($text: String!){
            todo: addTodo(text: $text){
              id
              text
              completed
              completedAt
            }
        }`;
        return Axios.post(SERVER_GRAPHQL,{
            query,
            variables: { 
                text
            }
        })
        .then((result) => {
            return result.data.data.todo;
        });
    }

    public static async updateTodoServer(todo: Todo): Promise<Todo> {
        
        const query = `mutation($todo: TodoRequest!){
            todo: updateTodo(todo: $todo){
              id
              text
              completed
              completedAt
            }
        }`;
        return Axios.post(SERVER_GRAPHQL,{
            query,
            variables: {
                todo: {id: todo.id, text: todo.text, completed: todo.completed},
            }
        })
        .then((result) => {
            return result.data.data.todo;
        });
    }

    public static async deleteTodoServer(id: number): Promise<number> {
        
        const query = `mutation($id: Float!){
            id: deleteTodo(id: $id) {
                id
            }
        }`;
        return Axios.post(SERVER_GRAPHQL,{
            query,
            variables: {
              id
            }
        })
        .then((result) => {
            return result.data.data.id;
        });
    }
}