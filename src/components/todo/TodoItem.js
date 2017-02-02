import React, { PropTypes } from 'react';

export const TodoItem = (props) => {

  const handleToggle = props.handleToggle.bind(null, props.id);

  return (
    <li>
      <input type="checkbox"
             checked={props.isComplete}
             onChange={handleToggle}
      />
      {props.name}
    </li>
  );
};

TodoItem.propTypes = {
  name: PropTypes.string,
  isComplete: PropTypes.bool,
  id: PropTypes.number,
  handleToggle: PropTypes.func.isRequired
};