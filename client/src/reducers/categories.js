import {
  FETCH_CATEGORIES,
  SET_CATEGORY,
  SELECT_CATEGORY
} from '../actions/types';

const initState = {
  categories: [],
  category: null,
};

export default (state = initState, {type, payload}) => {
  switch(type) {
    case FETCH_CATEGORIES:
      return {...state, categories: payload.categories};
    case SET_CATEGORY:
      return {...state, categories: [...state.categories, payload.category]};
    case SELECT_CATEGORY:
      console.log(payload.category)
      return {...state, category: payload.category}
    default: return state;
  }
};
