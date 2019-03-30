import React from 'react';
import { shallow, expect } from '../../utils/test-config';
import Transition from './index.js';

const setup = _ => {
  const wrapper = shallow(
    <Transition
      name="transition"
      appear={true}
      duration={150}>
      <div>child</div>
    </Transition>
  );

  return {wrapper};
};

describe('Transition component', () => {
  const {wrapper} = setup();

  it ('should render self', () => {
    expect(wrapper.find('.wd-auto').exists()).to.equal(true);
  });

  it ('should render with children', () => {
    expect(wrapper.find('.wd-auto').children()).to.have.lengthOf(1);
    expect(wrapper.find('div').text()).to.equal('child');
  });
});
