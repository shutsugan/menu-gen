import {
	AUTH_USER,
	RIG_USER,
	FETCH_USER,
	SET_ERROR,
	LOGOUT_USER
} from '../actions/types';

const initState = {
	user: null,
	token: null,
	error: null
};

export default (state = initState, {type, payload}) => {
	switch(type) {
		case AUTH_USER: return {...state, token: payload.token};
		case LOGOUT_USER: return {...state, token: payload.token};
		case RIG_USER: return {...state, token: payload.token};
		case FETCH_USER: return {...state, user: payload.user};
		case SET_ERROR: return {...state, error: payload.error};
		default: return state;
	}
}
