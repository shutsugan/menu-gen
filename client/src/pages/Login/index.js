import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import { authenticate } from '../../actions/auth';
import { getToken } from '../../reducers/auth';

import './index.css';

const Login = ({token, authenticate}) => {
	return !token
		? <LoginForm authenticate={authenticate} />
		: <Redirect to="/" />
};

const mapStateToProps = state => ({token: getToken(state)});
export default connect(mapStateToProps, {authenticate})(Login);
