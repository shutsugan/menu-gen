import { mockStore, fetchMock } from '../test-config.js';
import * as actions from '../meals';
import * as types from '../types';

export const getErrorAction = (error, action, callback) => {
  fetchMock.onAny(/\/^api\/meals\/.*/).timeoutOnce();

  const store = mockStore();
  const expectedAction = [{type: types.SET_ERROR, payload: {error}}];

  store.dispatch(actions[action]()).then(_ => {
    expect(store.getActions()).toEqual(expectedAction);
  });

  fetchMock.reset();
};

describe('meals actions', () => {
  const meals = [{_id: 1, name: 'meal1'}, {_id: 2, name: 'meal2'}];
  const meal = {_id: 3, name: 'meal3'};

  it ('returns FETCH_MEALS action after calling fetchMeals', () => {
    fetchMock.onGet('/api/meals').reply(200, meals);

    const store = mockStore();
    const expectedAction = [{
      type: types.FETCH_MEALS,
      payload: meals
    }];

    return store.dispatch(actions.fetchMeals()).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns FETCH_MEALS_BY_USER action after calling fetchUserMeals', () => {
    fetchMock.onGet('/api/1/meals').reply(200, meals);

    const store = mockStore();
    const expectedAction = [{
      type: types.FETCH_MEALS_BY_USER,
      payload: meals
    }];

    return store.dispatch(actions.fetchUserMeals(1)).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns FETCH_MEALS_BY_CATEGORY action after calling fetchCategoryMeals', () => {
    fetchMock.onGet('/api/1/category_meals').reply(200, meals);

    const store = mockStore();
    const expectedAction = [{
      type: types.FETCH_MEALS_BY_CATEGORY,
      payload: meals
    }];

    return store.dispatch(actions.fetchCategoryMeals(1)).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('retuns SET_MEAL action after calling setMeal', () => {
    fetchMock.onPost('/api/meal').replyOnce(201, meal);

    const store = mockStore();
    const expectedAction = [
      {type: types.SET_MEAL, payload: meal},
      {type: types.SELECT_MEAL, payload: {meal: null}}
    ];

    return store.dispatch(actions.setMeal()).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns UPDATE_MEAL action after calling updateMeal', () => {
    fetchMock.onPut('/api/meal/1').replyOnce(201, meal);

    const store = mockStore();
    const expectedAction = [{
      type: types.UPDATE_MEAL,
      payload: meal
    }];

    return store.dispatch(actions.updateMeal(1)).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns REMOVE_MEAL action after calling removeMeal', () => {
    fetchMock.onAny('/api/meal/1').replyOnce(201);

    const store = mockStore();
    const expectedAction = [
      {type: types.REMOVE_MEAL, payload: {id: 1}},
      {type: types.SELECT_MEAL, payload: {meal: null}}
    ];

    return store.dispatch(actions.removeMeal(1)).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns SELECT_MEAL action after calling selectMeal', () => {
    const store = mockStore();
    const expectedAction = [{
      type: types.SELECT_MEAL,
      payload: {meal}
    }];

    return store.dispatch(actions.selectMeal(meal)).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('returns SET_ERROR action', () => {
  it ('should fail after calling fetchMeals', () => {
    getErrorAction('Enable to fetch meals', 'fetchMeals');
  });

  it ('should fail after calling fetchUserMeals', () => {
    getErrorAction('Enable to fetch meals by user', 'fetchUserMeals');
  });

  it ('should fail after calling fetchCategoryMeals', () => {
    getErrorAction('Enable to fetch meals by category', 'fetchCategoryMeals');
  });

  it ('should fail after calling setMeal', () => {
    getErrorAction('Enable to create a meal', 'setMeal');
  });

  it ('should fail after calling updateMeal', () => {
    getErrorAction('Enable to update the meal', 'updateMeal');
  });

  it ('should fail after calling removeMeal', () => {
    getErrorAction('Enable to remove the meal', 'removeMeal');
  });
});
