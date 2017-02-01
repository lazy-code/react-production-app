import React, { Component } from 'react';
import { TodoForm, TodoList } from './components/todo';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      todos: [
        {id: 1, name: 'Learn JSX', isComplete:true},
        {id: 2, name: 'Build an awesome app', isComplete:false},
        {id: 3, name: 'Ship it', isComplete:false}
      ],
      currentTodo: ''
    };
  };

  handleInputChange = (ev) => {
    this.setState({
      currentTodo: ev.target.value
    });
  };

  render() {
    const { todos, currentTodo } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          <TodoForm currentTodo={currentTodo} handleInputChange={this.handleInputChange} />
          <TodoList todos={todos} />
        </div>
      </div>
    );
  };
}

export default App;