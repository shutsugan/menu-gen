import axios from 'axios';

import {
  FETCH_CATEGORIES,
  SET_CATEGORY,
  SELECT_CATEGORY
} from './types';

export const fetchCategories = _ => async dispatch => {
  const {data} = await axios.get('/api/categories');
  dispatch({type: FETCH_CATEGORIES, payload: data});
};

export const setCategory = category => dispatch => {
  dispatch({type: SELECT_CATEGORY, payload: {category}});
};
