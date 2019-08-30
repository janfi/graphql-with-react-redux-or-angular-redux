import { FETCH_TODOS, ADD_TODO, addTodo, TodoActionsTypes, FETCH_TODOS_SUCCESS, REQUEST_FAIL, ADD_TODO_SUCCESS, updateTodo, deleteTodo, DELETE_TODO_SUCCESS, UPDATE_TODO_SUCCESS, DELETE_TODO, UPDATE_TODO } from './../actions/types';
import { call, put, takeLatest  } from 'redux-saga/effects' //takeEvery
import TodosService from '../../services/todos.services';

function* _fetchTodos(action: TodoActionsTypes) {
    try {
       const todos = yield call(TodosService.getTodos);
       console.log(todos)
       yield put({type: FETCH_TODOS_SUCCESS, payload: {todos:todos}});
    } catch (e) {
       yield put({type: REQUEST_FAIL, error: e.message});
    }
 }

 function* _addTodo(action: addTodo) {
    try {
       const todo = yield call(TodosService.addTodoServer, action.payload.text)
       yield put({type: ADD_TODO_SUCCESS, payload: {todo:todo}});
    } catch (e) {
       yield put({type: REQUEST_FAIL, error: e.message});
    }
 }

function* _updateTodo(action: updateTodo) {
   try {
      const todo = yield call(TodosService.updateTodoServer, action.payload.todo)
      yield put({type: UPDATE_TODO_SUCCESS, payload: {todo:todo}});
   } catch (e) {
      yield put({type: REQUEST_FAIL, error: e.message});
   }
}

function* _deleteTodo(action: deleteTodo) {
   try {
      const todo = yield call(TodosService.deleteTodoServer, action.payload.id);
      yield put({type: DELETE_TODO_SUCCESS, payload: {id:todo.id}});
   } catch (e) {
      yield put({type: REQUEST_FAIL, error: e.message});
   }
}



function* todosSaga() {
    yield takeLatest(FETCH_TODOS, _fetchTodos);
    yield takeLatest(ADD_TODO, _addTodo);
    yield takeLatest(UPDATE_TODO, _updateTodo);
    yield takeLatest(DELETE_TODO, _deleteTodo);
}


export default todosSaga;