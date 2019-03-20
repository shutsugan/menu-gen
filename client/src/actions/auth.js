import axios from 'axios';

import googlAuth from '../utils/google-config';
import { addToken, removeToken } from '../utils/token';
import { setException } from '../utils/exception';

import {
	AUTH_USER,
	RIG_USER,
	FETCH_USER,
	SET_ERROR,
	LOGOUT_USER,
	GOOGLE_AUTH,
	GOOGLE_RIG
} from './types';

export const authenticate = (email, password) => async dispatch => {
	try {
		const {data} = await axios.post('/api/auth', {email, password});
		addToken(AUTH_USER, data, dispatch, fetchUser);
	} catch ({response}) {
		setException(response.data.message, SET_ERROR, dispatch);
	}
};

export const register = (username, email, password) => async dispatch => {
	try {
		const {data} = await axios.post('/api/register', {username, email, password});
		addToken(RIG_USER, data, dispatch, fetchUser);
	} catch ({response}) {
		setException(response.data.message, SET_ERROR, dispatch);
	}
};

export const googleAuth = ({email, password}) => async dispatch => {
	try {
		const {data} = await axios.post('/api/auth', {email, password});
		addToken(GOOGLE_AUTH, data, dispatch, fetchUser);
	} catch ({response}) {
		setException(response.data.message, SET_ERROR, dispatch);
	}
};

export const googleRegister = user => async dispatch => {
	try {
		const {data} = await axios.post('/api/register', user);
		addToken(GOOGLE_RIG, data, dispatch, fetchUser);
	} catch ({response}) {
		setException(response.data.message, SET_ERROR, dispatch);
	}
};

export const fetchUser = _ => async dispatch => {
	const token = localStorage.getItem('token');
	if (!token || token === '') return;

	try {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		const {data} = await axios.get('/api/user');
		dispatch({type: FETCH_USER, payload: data});

		localStorage.setItem('token', token);
	} catch (err) {
		localStorage.removeItem('token');
	}
};

export const logout = _ => async dispatch => {
	removeToken(LOGOUT_USER, {token: null}, dispatch, _ => {
		if (window.gapi.auth2) window.gapi.auth2.getAuthInstance().signOut();
	});
};
