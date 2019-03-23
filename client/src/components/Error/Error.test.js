import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Error } from './index.js';

Enzyme.configure({adapter: new Adapter()});

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
