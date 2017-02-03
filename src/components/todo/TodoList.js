import React, { PropTypes } from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = (props) => {

    const todoList = props.todos.map(todo => <TodoItem key={todo.id} {...todo}
                                                       handleToggle={props.handleToggle}
                                                       handleRemove={props.handleRemove}
                                              />);

    return (
        <div className="Todo-List">
            <ul>
                {todoList}
            </ul>
        </div>
    );
};

TodoList.propTypes = {
  // From App component
  todos: PropTypes.array.isRequired
};