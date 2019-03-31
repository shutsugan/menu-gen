import { mockStore, fetchMock } from '../test-config.js';
import * as actions from '../auth';
import * as types from '../types';

export const getErrorAction = (error, action, callback) => {
  fetchMock.onAny(/\/^api\/user\/.*/).timeoutOnce();

  const store = mockStore();
  const expectedAction = [{type: types.SET_ERROR, payload: {error}}];

  store.dispatch(actions[action]()).then(_ => {
    expect(store.getActions()).toEqual(expectedAction);
  });

  fetchMock.reset();
};

const data = {
  username: 'username',
  email: 'email@email.com',
  password: 'password'
};

describe('auth actions', () => {
  it ('returns AUTH_USER after calling authenticate', () => {
    fetchMock.onPost('/api/auth').replyOnce(201, data);

    const store = mockStore();
    const expectedAction = [{
      type: types.AUTH_USER, payload: data
    }];

    return store.dispatch(actions.authenticate()).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns RIG_USER after calling register', () => {
    fetchMock.onPost('/api/register').replyOnce(201, data);

    const store = mockStore();
    const expectedAction = [{
      type: types.RIG_USER, payload: data
    }];

    return store.dispatch(actions.register()).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns GOOGLE_AUTH after calling googleAuth', () => {
    fetchMock.onPost('/api/auth').replyOnce(201, data);

    const store = mockStore();
    const expectedAction = [{
      type: types.GOOGLE_AUTH, payload: data
    }];

    return store.dispatch(actions.googleAuth(data)).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns GOOGLE_RIG after calling googleRegister', () => {
    fetchMock.onPost('/api/register').replyOnce(201, data);

    const store = mockStore();
    const expectedAction = [{
      type: types.GOOGLE_RIG, payload: data
    }];

    return store.dispatch(actions.googleRegister(data)).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns FETCH_USER after calling fetchUser', () => {
    localStorage.setItem('token', 'token');
    fetchMock.onGet('/api/user').reply(200, data);

    const store = mockStore();
    const expectedAction = [{
      type: types.FETCH_USER, payload: data
    }];

    return store.dispatch(actions.fetchUser()).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it ('returns LOGOUT_USER after calling logout', () => {
    window.gapi = jest.fn();
    const store = mockStore();
    const expectedAction = [{
      type: types.LOGOUT_USER, payload: {token: null}
    }];

    return store.dispatch(actions.logout()).then(_ => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('returns SET_ERROR action', () => {
  it ('should fail after calling authenticate', () => {
    getErrorAction('Enable to authenticate', 'authenticate');
  });

  it ('should fail after calling register', () => {
    getErrorAction('Enable to register', 'register');
  });

  it ('should fail after calling googleRegister', () => {
    getErrorAction('Enable to authenticate with google auth', 'googleRegister');
  });

  it ('should fail afte calling fetchUser', () => {
    localStorage.setItem('token', 'token');
    getErrorAction('Enable to fetch user', 'fetchUser');
  })
});
