import { AUTH_USER, RIG_USER, FETCH_USER, SET_ERROR } from '../actions/types';

const initState = {
	user: null,
	token: null,
	error: null
};

export default (state = initState, {type, payload}) => {
	switch(type) {
		case AUTH_USER: return payload;
		case RIG_USER: return payload;
		case FETCH_USER: return payload;
		case SET_ERROR: return payload;
		default: return state;
	}
}
