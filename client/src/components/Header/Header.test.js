import React from 'react';
import {mount, expect as chaiExpect} from '../../utils/test-config';
import { Header } from './index.js';

const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }

  return next(action)
}

const setup = _ => {
  let user = {username: 'name', avatar: 'avatar'};
  const logout = jest.fn();

  const wrapper = mount(<Header user={user} logout={_ => logout(user)} />);

  return {wrapper, user, logout};
};

describe('Header component', () => {
  const {wrapper, user, logout} = setup();

  it ('should render self', () => {
      chaiExpect(wrapper.find('.header').exists()).to.equal(true);
      chaiExpect(wrapper.find('.header').children()).to.have.lengthOf(3);
  });

  it ('should render the right text in the children', () => {
    chaiExpect(wrapper.find('.header__logout').text()).to.equal('Logout');
    chaiExpect(wrapper.find('.header__name').text()).to.equal(user.username);
    chaiExpect(wrapper.find('.header__img').props().alt).to.equal(user.username);
    chaiExpect(wrapper.find('.header__img').props().src).to.equal(user.avatar);
  });

  it ('shoudl render the right state after click event', () => {
    wrapper.find('.header__logout').simulate('click');
    expect(logout).toHaveBeenCalled();
  });
});
