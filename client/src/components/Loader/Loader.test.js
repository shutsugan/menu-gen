import React from 'react';
import {shallow, expect} from '../../utils/test-config';
import Loader from './index.js';

const setup = _ => {
  const wrapper = shallow(<Loader />);

  return {wrapper};
};

describe('Loader component', () => {
  const {wrapper} = setup();

  it ('it should render self', () => {
      expect(wrapper.find('.loader').exists()).to.equal(true);
      expect(wrapper.find('.loader').children()).to.have.lengthOf(1);
  });
});
