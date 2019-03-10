import React from 'react';
import { connect } from 'react-redux';

import Transition from '../Transition';
import { SET_ERROR } from '../../actions/types';

import './index.css';

const Error = ({auth, dispatch}) => {
  const clearError = _ => dispatch({type: SET_ERROR, payload: {error: ''}});

  return auth.error
    ? (
      <Transition name="fade" appear={true} duration={150}>
        <div onClick={clearError} className="error absolute pd-16">
          {auth.error}
        </div>
      </Transition>
    )
    : '';
};

const mapStateToProps = ({auth}) => ({auth})
export default connect(mapStateToProps)(Error);
