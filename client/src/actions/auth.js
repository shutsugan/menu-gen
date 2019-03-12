import axios from 'axios';

import { AUTH_USER, RIG_USER, FETCH_USER, SET_ERROR } from './types';

export const authenticate = (email, password) => async dispatch => {
	try {
		const {data} = await axios.post('/api/auth', {email, password});
		dispatch({type: AUTH_USER, payload: data});

		localStorage.setItem('token', data.token);
	} catch ({response}) {
		const error = response.data.message
		dispatch({type: SET_ERROR, payload: {error}})
	}
};

export const register = (username, email, password) => async dispatch => {
	try {
		const {data} = await axios.post('/api/register', {username, email, password});
		dispatch({type: RIG_USER, payload: data});

		localStorage.setItem('token', data.token);
	} catch ({response}) {
		const error = response.data.message;
		dispatch({type: SET_ERROR, payload: {error}});
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
		dispatch({type: SET_ERROR, payload: {error: 'Wrong data'}});
		localStorage.removeItem('token');
	}
};
