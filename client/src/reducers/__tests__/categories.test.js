import reducer, { initState } from '../categories';
import * as actions from '../../actions/categories';
import * as types from '../../actions/types';

describe('handle FETCH_CATEGORIES categories reducer', () => {
  it ('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it ('should add payload to initState', () => {
    const expectedReducer = reducer(initState, {
      type: types.FETCH_CATEGORIES,
      payload: {categories: [{name: 'categories'}]}
    });

    expect(expectedReducer)
      .toEqual({categories: [{ name: 'categories' }], category: null});
  });

  it ('should replace the initState with the payload state', () => {
    const state = { categories: [ { name: 'categories' } ], category: null};
    const exprectedReducer = reducer(state, {
      type: types.FETCH_CATEGORIES,
      payload: {categories: [{name: 'other categories'}]}
    });

    expect(exprectedReducer)
      .toEqual({categories: [{name: 'other categories'}], category: null});
  });
});

describe('handle SET_CATEGORY categories reducer', () => {
  it ('should append payload data to the state', () => {
    const state = {categories: [ {name: 'categories'}], category: null };
    const exprectedReducer = reducer(state, {
      type: types.SET_CATEGORY,
      payload: {category: {name: 'category'}}
    });

    expect(exprectedReducer)
      .toEqual({
        categories: [{ name: 'categories' }, {name: 'category'}],
        category: null
      });
  });
});

describe('handle UPDATE_CATEGORY categories reducer', () => {
  it ('should update the passed payload data', () => {
    const state = {categories: [{_id: 1, name: 'categories'}], category: null};
    const exprectedReducer = reducer(state, {
      type: types.UPDATE_CATEGORY,
      payload: {category: {_id: 1, name: 'category'}}
    });

    expect(exprectedReducer)
      .toEqual({
        categories: [{_id: 1, name: 'category'}],
        category: null
      });
  });
});

describe('handle REMOVE_CATEGORY categories reducer', () => {
  it ('should remove the category that matches with the passed id', () => {
    const state = {categories: [{_id: 1, name: 'categories'}], category: null};
    const exprectedReducer = reducer(state, {
      type: types.REMOVE_CATEGORY,
      payload: {category: {_id: 1, name: 'categories'}}
    });

    expect(exprectedReducer)
      .toEqual({
        categories: [],
        category: null
      })
  });
});

describe('handle SELECT_CATEGORY categories reducer', () => {
  it ('should select the passed category', () => {
    const state = {categories: [{name: 'category'}], category: null};
    const exprectedReducer = reducer(state, {
      type: types.SELECT_CATEGORY,
      payload: {category: {name: 'category'}}
    });

    expect(exprectedReducer)
      .toEqual({
        categories: [{name: 'category'}],
        category: {name: 'category'}
      });
  });
});
