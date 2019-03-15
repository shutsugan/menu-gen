import {
  FETCH_MEALS,
  FETCH_MEALS_BY_CATEGORY,
  FETCH_MEALS_BY_USER,
  SET_MEAL,
  UPDATE_MEAL,
  REMOVE_MEAL,
  SELECT_MEAL
} from '../actions/types';

const initState = {
  meals: [],
  meal: null,
};

export default (state = initState, {type, payload}) => {
  switch(type) {
    case FETCH_MEALS:
    case FETCH_MEALS_BY_CATEGORY:
    case FETCH_MEALS_BY_USER:
      return {...state, meals: payload.meals};
    case SET_MEAL:
      return {...state, meals: [...state.meals, payload.meal]};
    case UPDATE_MEAL:
      const meals_updated = state.meals.map(meal => {
        if (meal._id === payload.meal._id) return payload.meal;
        else return meal;
      });

      return {...state, meals: meals_updated};
    case REMOVE_MEAL:
      const meals_removed = state.meals.filter(meal => {
        if (meal.id !== payload.id) return meal;
      });

      return {...state, meals: meals_removed};
    case SELECT_MEAL:
      return {...state, meal: payload.meal};
    default: return state;
  };
};
