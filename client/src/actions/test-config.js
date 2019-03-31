import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

import * as actions from './categories';
import * as types from './types';

const middlewares = [thunk];
export const mockStore = configureMockStore(middlewares);
export const fetchMock = new MockAdapter(axios);  
