import React from 'react';
import { connect } from 'react-redux';

import Transition from '../Transition';
import { SET_ERROR } from '../../actions/types';
import { getError } from '../../reducers/auth';

import './index.css';

export const Error = ({error, dispatch}) => {
  const clearError = _ => dispatch({type: SET_ERROR, payload: {error: ''}});

  return error
    ? (
      <Transition name="fade" appear={true} duration={150}>
        <div onClick={clearError} className="error absolute pd-16">
          {error}
        </div>
      </Transition>
    )
    : '';
};

const mapStateToProps = state => ({error: getError(state)});
export default connect(mapStateToProps)(Error);
