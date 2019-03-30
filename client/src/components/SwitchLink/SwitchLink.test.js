import React from 'react';
import { shallow, expect } from '../../utils/test-config';
import SwitchLink from './index.js';

const setup = _ => {
  const wrapper = shallow(<SwitchLink to="/" label="label" text="text" />);

  return {wrapper};
};

describe('SwitchLink component', () => {
  const {wrapper} = setup();

  it('should render self', () => {
    expect(wrapper.find('.switch-link').exists()).to.equal(true);
    expect(wrapper.find('.switch-link').children()).to.have.lengthOf(2);
  });

  it ('should render with the right props', () => {
    expect(wrapper.find('.sub-text').text()).to.equal('text');
    expect(wrapper.find('.link').props().to).to.equal('/');
  });
});
