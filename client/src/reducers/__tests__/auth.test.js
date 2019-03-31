import reducer, { initState } from '../auth';
import * as actions from '../../actions/auth';
import * as types from '../../actions/types';

const addState = type => {
  const expectedReducer = reducer(initState, {
    type: types[type],
    payload: {token: 'token'}
  });

  expect(expectedReducer).toEqual({...initState, token: 'token'});
};

const replaceState = type => {
  const expectedReducer = reducer(initState, {
    type: types[type],
    payload: {user: {name: 'username'}}
  });

  expect(expectedReducer).toEqual({...initState, user: {name: 'username'}});
}

describe('handle auth reducer', () => {
  it ('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it ('should add payload to initState AUTH_USER', () => {
    addState('AUTH_USER');
    addState('RIG_USER');
    addState('GOOGLE_RIG');
  });

  it ('should replace initState with the payload AUTH_USER', () => {
    const state = {...initState, token: 'token'};
    const expectedReducer = reducer(state, {
      type: types.AUTH_USER,
      payload: {token: 'other token'}
    });

    expect(expectedReducer).toEqual({...initState, token: 'other token'});
  });

  it ('should replace initState with the payload LOGOUT_USER', () => {
    const state = {...initState, token: 'token'};
    const expectedReducer = reducer(state, {
      type: types.LOGOUT_USER,
      payload: {token: null}
    });

    expect(expectedReducer).toEqual(initState);
  });

  it ('should return the right state after getting FETCH_USER action', () => {
    replaceState('FETCH_USER');
  });

  it ('should return the right state after getting GOOGLE_AUTH action', () => {
    replaceState('GOOGLE_AUTH');
  });

  it ('should return the right state after getting SET_ERROR actoin', () => {
    const expectedReducer = reducer(initState, {
      type: types.SET_ERROR,
      payload: {error: 'error'}
    });

    expect(expectedReducer).toEqual({...initState, error: 'error'});
  });
});
