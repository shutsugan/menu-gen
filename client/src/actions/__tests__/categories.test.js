import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

import * as actions from '../categories';
import * as types from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fetchMock = new MockAdapter(axios);

const getErrorAction = (error, action, callback) => {
  fetchMock.onAny(/\/^api\/category\/.*/).timeoutOnce();

  const store = mockStore();
  const expectedAction = [{type: types.SET_ERROR, payload: {error}}];

  store.dispatch(actions[action]()).then(_ => {
    expect(store.getActions()).toEqual(expectedAction);
  });

  fetchMock.reset();
};

const data = {
  user_id: 'user_id',
  name: 'category',
  description: 'category',
  cover: 'category'
};

describe('categories actions', () => {
  it ('returns FETCH_CATEGORIES action after calling fetchCategories', () => {
    fetchMock.onGet('/api/categories').reply(200, data);

    const store = mockStore({categories: []})
    const expectedAction = [{
      type: types.FETCH_CATEGORIES, payload: data
    }];

    return store.dispatch(actions.fetchCategories()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns SET_CATEGORY action after calling setCategory', () => {
    fetchMock.onPost('/api/category').replyOnce(201, data);

    const store = mockStore();
    const expectedAction = [{
      type: types.SET_CATEGORY, payload: data
    }];

    return store.dispatch(actions.setCategory()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns REMOVE_CATEGORY & SELECT_CATEGORY action after calling removeCategory', () => {
    fetchMock.onAny('/api/category/1').replyOnce(201);

    const store = mockStore({category: {}});
    const expectedActions = [
      {type: types.REMOVE_CATEGORY, payload: {id: 1}},
      {type: types.SELECT_CATEGORY, payload: {category: null}}
    ];

    return store.dispatch(actions.removeCategory(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it ('returns UPDATE_CATEGORY action after calling updateCategory', () => {
    fetchMock.onAny('/api/category/1').replyOnce(204, data);

    const store = mockStore();
    const expectedAction = [{
      type: types.UPDATE_CATEGORY, payload: data
    }];

    return store.dispatch(actions.updateCategory(1, data)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns SELECT_CATEGORY action after calling selectCategory', () => {
    const store = mockStore();
    const expectedAction = [{
      type: types.SELECT_CATEGORY, payload: {category: data}
    }];

    return store.dispatch(actions.selectCategory(data)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('returns SET_ERROR action', () => {
  it ('if a fetchCategories failed', () => {
    getErrorAction('Unable to fetch categories', 'fetchCategories');
  });

  it ('if a setCategory failed', () => {
    getErrorAction('Unable to create the category', 'setCategory');
  });

  it ('if updateCategory failed', () => {
    getErrorAction('Unable to update the category', 'updateCategory');
  });

  it ('if removeCategory failed', () => {
    getErrorAction('Unable to remove the category', 'removeCategory');
  });
});
