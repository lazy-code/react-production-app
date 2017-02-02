import React, { PropTypes } from 'react';
import { partial } from '../../lib/utils';

export const TodoItem = (props) => {

  const handleToggle = partial(props.handleToggle, props.id);

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