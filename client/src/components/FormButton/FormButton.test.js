import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import FormButton from './index.js';

Enzyme.configure({adapter: new Adapter()});

const setup = _ => {
  const wrapper = shallow(<FormButton type="submit" label="button" />);

  return {wrapper};
};

describe('component FormButton', () => {
  const {wrapper} = setup();

  it ('should render self', () => {
    expect(wrapper.find('.button').exists()).to.equal(true);
    expect(wrapper.find('.button').props().type).to.equal('submit');
    expect(wrapper.find('.button').text()).to.equal('button');
  });
});
