import {
	AUTH_USER,
	RIG_USER,
	FETCH_USER,
	SET_ERROR,
	LOGOUT_USER,
	GOOGLE_AUTH,
	GOOGLE_LOGOUT
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
		case GOOGLE_AUTH:
		case GOOGLE_LOGOUT:
			return {...state, user: payload.user};
		default: return state;
	}
}
