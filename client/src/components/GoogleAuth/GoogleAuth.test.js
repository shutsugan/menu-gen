import React from 'react';
import {mount, expect as chaiExpect} from '../../utils/test-config';
import GoogleAuthRender from './GoogleAuthRender';

const setup = _ => {
  const googleLogin = jest.fn();
  const renderButtontext = signup => signup
    ? 'Google Sign Up'
    : 'Google Sign In';

  const wrapperSignup = mount(
    <GoogleAuthRender
      googleLogin={googleLogin}
      renderButtontext={_ => renderButtontext(true)}
    />
  );

  const wrapperSigin = mount(
    <GoogleAuthRender
      googleLogin={googleLogin}
      renderButtontext={_ => renderButtontext(false)}
    />
  );

  return {wrapperSignup, wrapperSigin, googleLogin};
};

describe('GoogleAuth component', () => {
  const {wrapperSignup, wrapperSigin, googleLogin} = setup();

  const renderSelf = wrapper => {
    chaiExpect(wrapperSignup.find('.google-auth').exists()).to.equal(true);
    chaiExpect(wrapperSignup.find('.google-auth').children()).to.have.lengthOf(1);
  };

  const renderButton = (wrapper, text) => {
    chaiExpect(wrapper.find('.button').children()).to.have.lengthOf(1);
    chaiExpect(wrapper.find('.button').text()).to.equal(text);
  };

  const callLogin = wrapper => {
    wrapper.find('.button').simulate('click');
    expect(googleLogin).toHaveBeenCalled();
  };

  it ('should render self', () => {
    renderSelf(wrapperSignup);
    renderSelf(wrapperSigin);
  });

  it ('should render the right button text in signup mode', () => {
    renderButton(wrapperSignup, 'Google Sign Up');
    renderButton(wrapperSigin, 'Google Sign In');
  });

  it ('should call googleLogin after a click event', () => {
    callLogin(wrapperSignup);
    callLogin(wrapperSigin);
  });
});
