import React from 'react';
import {shallow, expect} from '../../utils/test-config';
import Logo from './index.js';

const setup = _ => {
  const wrapper = shallow(<Logo name="MENU" sub="GN" />);

  return {wrapper};
};

describe('Logo component', () => {
  const {wrapper} = setup();

  it ('should render self', () => {
    expect(wrapper.find('.logo').exists()).to.equal(true);
    expect(wrapper.find('.logo').children()).to.have.lengthOf(2);
    expect(wrapper.find('.logo__box-top').children()).to.have.lengthOf(4);
    expect(wrapper.find('.logo__box-bottom').children()).to.have.lengthOf(2);
  });
});
