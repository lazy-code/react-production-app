import React, { Component, PropTypes } from 'react';

export class Link extends Component {

  handleClick = (ev) => {
    ev.preventDefault();

    // Browser"s history
    history.pushState(null, '', this.props.to);
  };

  render() {
    return (
      <a href="#" onClick={this.handleClick}>{this.props.children}</a>
    );
  }
}

Link.propTypes = {
  to: PropTypes.string.isRequired
};