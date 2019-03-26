import React from 'react';
import {shallow, expect} from '../../utils/test-config';
import FormHead from './index.js';

const setup = _ => {
  const wrapper = shallow(<FormHead title="head" slug="slug" />);

  return {wrapper};
};

describe('FromHead component', () => {
  const {wrapper} = setup();

  it ('should render self', () => {
    expect(wrapper.find('.title').exists()).to.equal(true);
    expect(wrapper.find('.title').text()).to.equal('head');

    expect(wrapper.find('.sub-title').exists()).to.equal(true);
    expect(wrapper.find('.sub-title').text()).to.equal('slug');
  });
});
