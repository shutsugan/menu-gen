import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Banner from './index.js';

Enzyme.configure({adapter: new Adapter()});

const setup = _ => {
  const wrapper = shallow(<Banner />);
  return {wrapper};
};

describe('component App', () => {
  const { wrapper } = setup();

  it ('should render self', () => {
    expect(wrapper.find('div').hasClass('logo__banner'));
  })

  it ('should contain Logo component', () => {
    expect(wrapper.find('div').hasClass('logo'));
  })
});
