import React from 'react';
import {shallow, expect} from '../../utils/test-config';
import { App } from './index.js';

const setup = _ => {
  const wrapper = shallow(<App />);
  return {wrapper};
};

describe('component App', () => {
  const { wrapper } = setup();

  it ('should render self', () => {
    expect(wrapper.find('div').hasClass('app'));
  })

  it ('should contain Error component', () => {
    expect(wrapper.find('div').hasClass('error'));
  })
});
