import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { CategoryDetails } from './index.js';

Enzyme.configure({adapter: new Adapter()});

const setup = _ => {
  const category = {
    cover: 'cover.jpg',
    name: 'category',
    description: 'description'
  };

  const wrapper = shallow(<CategoryDetails category={category} />);
  return {wrapper};
};

describe('component CategoryDetails', () => {
  const { wrapper } = setup();

  it ('should render self', () => {
    expect(wrapper.find('.category-details').exists()).to.equal(true);
    expect(wrapper.find('.category-details__img').exists()).to.equal(true);
    expect(wrapper.find('.category-details__name').exists()).to.equal(true);
    expect(wrapper.find('.category-details__text').exists()).to.equal(true);
  });

  it ('should have one element', () => {
    expect(wrapper.find('.category-details').children())
      .to.have.lengthOf(1);
  });

  it ('should have the img props', () => {
    expect(wrapper.find('img').props().src).to.equal('cover.jpg');
    expect(wrapper.find('img').props().alt).to.equal('category');
  });

  it ('should have the name prop', () => {
    expect(wrapper.find('.category-details__name').text()).to.equal('category');
  });

  it ('should have the description prop', () => {
    expect(wrapper.find('.category-details__text').text()).to.equal('description');
  });
});
