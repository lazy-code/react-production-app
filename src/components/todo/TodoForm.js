import React, { PropTypes } from 'react';

export const TodoForm = (props) => (

  <form onSubmit={props.handleSubmit}>
    <input type="text"
         value={props.currentTodo}
         onChange={props.handleInputChange}
    />
  </form>

);

TodoForm.propTypes = {
  // From App component
  currentTodo: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};