import React, { Component } from 'react';
import { TodoForm, TodoList } from './components/todo';
import { addTodo, generateId }from './lib/TodoHelpers';

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

  handleSubmit = (ev) => {
    ev.preventDefault();

    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete:false};
    const updatedTodos = addTodo(this.state.todos, newTodo);

    this.setState({
      todos: updatedTodos,
      currentTodo: ''
    });

  };

  handleEmptySubmit = (ev) => {
    ev.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    });
  };

  handleInputChange = (ev) => {
    this.setState({
      currentTodo: ev.target.value,
      errorMessage: ''
    });
  };

  render() {
    const { todos, currentTodo, errorMessage } = this.state;
    const submitHandler = currentTodo ? this.handleSubmit : this.handleEmptySubmit;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {errorMessage && <span className="error">{errorMessage}</span>}
          <TodoForm currentTodo={currentTodo}
                    handleInputChange={this.handleInputChange}
                    handleSubmit={submitHandler}
          />
          <TodoList todos={todos} />
        </div>
      </div>
    );
  };
}

export default App;