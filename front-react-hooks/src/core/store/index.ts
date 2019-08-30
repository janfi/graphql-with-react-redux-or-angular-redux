
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga'

import todosReducer from './reducers/todosReducer';
import todosSaga from './sagas/todosSagas';

const rootReducer = combineReducers({
  todos: todosReducer
})

export type AppState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    const middlewares = [sagaMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);
  
    const store = createStore(
      rootReducer,
      composeWithDevTools(middleWareEnhancer)
    );

    sagaMiddleware.run(todosSaga)
  
    return store;
}