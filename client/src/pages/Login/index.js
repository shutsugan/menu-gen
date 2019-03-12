import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import { authenticate } from '../../actions/auth';

import './index.css';

const Login = ({auth, authenticate}) => {
	return !auth.token
		? <LoginForm authenticate={authenticate} />
		: <Redirect to="/" />
};

const mapStateToProps = ({auth}) => ({auth});
export default connect(mapStateToProps, {authenticate})(Login);
