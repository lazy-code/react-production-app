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
import {
  loadTodos,
  createTodo,
  saveTodo,
  destroyTodo
} from './lib/todoService';

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

    createTodo(newTodo)
      .then(() => this.showTempMessage('Todo added successfully'));
  };

  handleEmptySubmit = (ev) => {
    ev.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    });
  };

  handleToggle = (id) => {
    // find todo by id, toggle complete property
    const getToggledTodo = pipe(findById, toggleTodo);
    // get toggled todo
    const updated = getToggledTodo(id, this.state.todos);
    // bind to get proper value
    const getUpdatedTodos = partial(updateTodo, this.state.todos);
    // create updated todos object
    const updatedTodos = getUpdatedTodos(updated);

    this.setState({
      todos: updatedTodos
    });

    saveTodo(updated)
      .then(() => this.showTempMessage('Todo updated'));
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

    destroyTodo(id)
      .then(() => this.showTempMessage('Todo removed'));
  };

  showTempMessage = (msg) => {
    this.setState({message: msg});
    setTimeout(() => {
      this.setState({message: ''});
    }, 2000);
  };

  render() {
    const { todos, currentTodo, errorMessage, message } = this.state;
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
          {message && <span className="success">{message}</span>}
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