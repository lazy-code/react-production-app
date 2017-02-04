import React, { Component, PropTypes } from 'react';
import { TodoForm, TodoList, Footer } from './components/todo';
import {
  addTodo,
  generateId,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
  filterTodos
}from './lib/TodoHelpers';
import { partial, pipe } from './lib/utils';
import { loadTodos } from './lib/todoService';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    todos: [],
    currentTodo: ''
  };

  // From Route
  static contextTypes = {
    route: PropTypes.string
  };

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
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

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    const updatedTodos = getUpdatedTodos(id, this.state.todos);

    this.setState({
      todos: updatedTodos
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

  handleRemove = (id, ev) => {
    ev.preventDefault();

    const updatedTodos = removeTodo(this.state.todos, id);

    this.setState({
      todos: updatedTodos
    });
  };

  render() {
    const { todos, currentTodo, errorMessage } = this.state;
    const submitHandler = currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    const displayTodos = filterTodos(todos, this.context.route);

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
          <TodoList todos={displayTodos}
                    handleToggle={this.handleToggle}
                    handleRemove={this.handleRemove}
          />
          <Footer />
        </div>
      </div>
    );
  };
}

export default App;