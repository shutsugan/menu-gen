import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Transition = ({children, name, appear, duration}) => (
  <ReactCSSTransitionGroup
    transitionName={name}
    transitionAppear={appear}
    transitionAppearTimeout={duration}
    transitionEnterTimeout={duration}
    transitionLeaveTimeout={duration}>
    {children}
  </ReactCSSTransitionGroup>
);

export default Transition;
