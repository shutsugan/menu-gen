import React from 'react';
import {shallow, expect} from '../../utils/test-config';
import { Error } from './index.js';

const setup = _ => {
  const wrapperWithError = shallow(<Error error="error" />);
  const wrapperWithoutError = shallow(<Error />);

  return {wrapperWithError, wrapperWithoutError};
};

describe('component Error', () => {
  const {wrapperWithoutError, wrapperWithError} = setup();

  it ('should render self with error prop', () => {
    expect(wrapperWithError.find('.error').exists()).to.equal(true);
    expect(wrapperWithError.find('.error').children()).to.have.lengthOf(1);
    expect(wrapperWithError.find('.error').text()).to.equal('error');
  });

  it ('should render self without error prop', () => {
    expect(wrapperWithoutError.find('.error').exists()).to.equal(false);
  });
});
