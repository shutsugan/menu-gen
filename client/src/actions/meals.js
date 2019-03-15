import axios from 'axios';
import {
  FETCH_MEALS,
  FETCH_MEALS_BY_CATEGORY,
  FETCH_MEALS_BY_USER,
  SET_MEAL,
  UPDATE_MEAL,
  REMOVE_MEAL,
  SELECT_MEAL,
  SET_ERROR
} from './types';

export const fetchMeals = _ => async dispatch => {
  const {data} = await axios.get('/api/meals');
  dispatch({type: FETCH_MEALS, payload: data});
};

export const fetchUserMeals = user_id => async dispatch => {
  const {data} = await axios.get(`/api/${user_id}/meals`);
  dispatch({type: FETCH_MEALS_BY_USER, payload: data});
};

export const fetchCategoryMeals = category_id => async dispatch => {
  const {data} = await axios.get(`/api/${category_id}/category_meals`);
  dispatch({type: FETCH_MEALS_BY_CATEGORY, payload: data});
};

export const setMeal = meal => async dispatch => {
  try {
    const {data} = await axios.post('/api/meal', meal);
    dispatch({type: SET_MEAL, payload: data});
    dispatch({type: SELECT_MEAL, payload: {meal: null}});
  } catch ({response}) {
    const error = response.data.message;
    dispatch({type: SET_ERROR, payload: {error}});
  }
  window.history.back();
};

export const updateMeal = (id, meal) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/meal/${id}`, meal);
    dispatch({type: UPDATE_MEAL, payload: data});
  } catch ({response}) {
    const error = response.data.message;
    dispatch({type: SET_ERROR, payload: {error}});
  }
  window.history.back();
};

export const removeMeal = id => async dispatch => {
  try {
    await axios.delete(`/api/meal/${id}`);
    dispatch({type: REMOVE_MEAL, payload: {id}});
    dispatch({type: SELECT_MEAL, payload: {meal: null}});
  } catch ({response}) {
    const error = response.data.message;
    dispatch({type: SET_ERROR, payload: {error}});
  }
};

export const selectMeal = meal => dispatch => {
  dispatch({type: SELECT_MEAL, payload: {meal}});
}
