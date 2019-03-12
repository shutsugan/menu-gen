import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import RegistrationForm from './RegistrationForm';
import { register } from '../../actions/auth';

import './index.css';

const Registration = ({auth, register}) => {
  return !auth.token
    ? <RegistrationForm register={register} />
    : <Redirect to="/" />
};

const mapStateToProps = ({auth}) => ({auth});
export default connect(mapStateToProps, {register})(Registration);
