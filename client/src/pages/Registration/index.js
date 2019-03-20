import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import RegistrationForm from './RegistrationForm';
import * as actions from '../../actions/auth';
import { getToken } from '../../reducers/auth';

import './index.css';

const Registration = ({token, register}) => {
  return !token
    ? <RegistrationForm register={register} />
    : <Redirect to="/" />
};

const mapStateToProps = state => ({token: getToken(state)});
export default connect(mapStateToProps, actions)(Registration);
