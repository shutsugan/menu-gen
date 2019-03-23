import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { CategoryItem } from '../CategoryItem';

Enzyme.configure({adapter: new Adapter()});

const setup = _ => {
  const user = {name: 'user'};
  const category = {
    cover: 'cover.jpg',
    name: 'category',
    description: 'description'
  };

  const wrapperUser = shallow(<CategoryItem category={category} user={user} />);
  const wrapper = shallow(<CategoryItem category={category} />);

  return {wrapperUser, wrapper};
};

describe('component CategoryItem', () => {
  const { wrapperUser, wrapper } = setup();

  const expectations = (wrapper, user_exist, childer_length) => {
    expect(wrapper.find('.list__item').exists()).to.equal(true);
    expect(wrapper.find('.list__img').exists()).to.equal(true);
    expect(wrapper.find('.list__title').exists()).to.equal(true);
    expect(wrapper.find('.list__remove').exists()).to.equal(user_exist);
    expect(wrapper.find('.list__item').children()).to.have.lengthOf(childer_length);
  }

  it ('should render self without user props', () => {
    expectations(wrapper, false, 1);
  });

  it ('should render self with user props', () => {
    expectations(wrapperUser, true, 2);
  });

  it ('should have the img props', () => {
    expect(wrapperUser.find('img').props().src).to.equal('cover.jpg');
    expect(wrapperUser.find('img').props().alt).to.equal('category');
  });

  it ('should have the name prop', () => {
    expect(wrapperUser.find('.list__title').text()).to.equal('category');
  });
});
