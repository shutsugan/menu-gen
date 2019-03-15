import { combineReducers } from 'redux';

import auth from './auth';
import categories from './categories';
import meals from './meals';

export default combineReducers({
	auth,
	categories,
	meals
});
