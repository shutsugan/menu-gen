import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from './index.js';

Enzyme.configure({adapter: new Adapter()});

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
