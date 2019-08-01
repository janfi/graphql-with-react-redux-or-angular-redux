import React from 'react';
import './App.css';
import TodoList from '../TodoList/TodoList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        TODO LIST
      </header>
      <TodoList></TodoList>
    </div>
  );
}

export default App;
