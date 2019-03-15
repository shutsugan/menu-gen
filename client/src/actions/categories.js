import axios from 'axios';

import {
  FETCH_CATEGORIES,
  SET_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  SELECT_CATEGORY,
  SET_ERROR
} from './types';

export const fetchCategories = _ => async dispatch => {
  const {data} = await axios.get('/api/categories');
  dispatch({type: FETCH_CATEGORIES, payload: data});
};

export const setCategory = category => async dispatch => {
  try {
    const {data} = await axios.post('/api/category', category);
    dispatch({type: SET_CATEGORY, payload: data});
  } catch ({response}) {
    const error = response.data.message;
    dispatch({type: SET_ERROR, payload: {error}});
  }
  window.history.back();
};

export const updateCategory = (id, category) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/category/${id}`, category);
    dispatch({type: UPDATE_CATEGORY, payload: data});
  } catch ({response}) {
    const error = response.data.message;
    dispatch({type: SET_ERROR, payload: {error}});
  }
  window.history.back();
};

export const removeCategory = id => async dispatch => {
  try {
    await axios.delete(`/api/category/${id}`);
    dispatch({type: REMOVE_CATEGORY, payload: {id}});
    dispatch({type: SELECT_CATEGORY, payload: {category: null}});
  } catch ({response}) {
    const error = response.data.message;
    dispatch({type: SET_ERROR, payload: {error}});
  }
};

export const selectCategory = category => dispatch => {
  dispatch({type: SELECT_CATEGORY, payload: {category}});
};
