import { createSelector } from 'reselect';

import {
  FETCH_CATEGORIES,
  SET_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  SELECT_CATEGORY
} from '../actions/types';

const initState = {
  categories: [],
  category: null,
};

const categories = state => state.categories.categories;
const category = state => state.categories.category;

export const getCategories = createSelector([categories], categories => categories);
export const getCategory = createSelector([category], category => category);

export default (state = initState, {type, payload}) => {
  switch(type) {
    case FETCH_CATEGORIES:
      return {...state, categories: payload.categories};
    case SET_CATEGORY:
      return {...state, categories: [...state.categories, payload.category]};
    case UPDATE_CATEGORY:
      const categories_updated = state.categories.map(category => {
        if (category._id === payload.category._id) return payload.category;
        else return category;
      });

      return {...state, categories: categories_updated};
    case REMOVE_CATEGORY:
      const categories_deleted = state.categories.filter(category => {
        if (category.id !== payload.id) return category;
      });

      return {...state, categories: categories_deleted};
    case SELECT_CATEGORY:
      return {...state, category: payload.category};
    default: return state;
  };
};
