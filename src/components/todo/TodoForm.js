import React, { PropTypes } from 'react';

export const TodoForm = (props) => (
    <form>
        <input type="text"
               value={props.currentTodo}
               onChange={props.handleInputChange}
        />
    </form>
);

TodoForm.propTypes = {
    currentTodo: PropTypes.string,
    handleInputChange: PropTypes.func
};