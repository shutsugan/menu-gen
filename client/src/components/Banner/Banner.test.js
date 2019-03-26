import React from 'react';
import {shallow, expect} from '../../utils/test-config';
import Banner from './index.js';

const setup = _ => {
  const wrapper = shallow(<Banner />);
  return {wrapper};
};

describe('component Banner', () => {
  const { wrapper } = setup();

  it ('should render self', () => {
    expect(wrapper.find('div').hasClass('logo__banner'));
  })

  it ('should contain Logo component', () => {
    expect(wrapper.find('div').hasClass('logo'));
  })
});
