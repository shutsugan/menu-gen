import React from 'react';
import {shallow, expect} from '../../../utils/test-config';
import { CategoryList } from '../index.js';

const setup = _ => {
  const user = {name: 'user'};
  const category = {
    _id: 1,
    cover: 'cover.jpg',
    name: 'category',
    description: 'description'
  };

  const wrapper = shallow(<CategoryList categories={[category]} />);
  const wrapperUser = shallow(<CategoryList categories={[]} user={user} />);
  const wrapperwithProps = shallow(
    <CategoryList category={category} user={user} categories={[category]} />
  );

  return {wrapperwithProps, wrapperUser, wrapper};
};

describe('component CategoryList', () => {
  const {wrapperwithProps, wrapperUser, wrapper} = setup();

  const expectations = (wrapper, user, category, categories, children) => {
    expect(wrapper.find('.category-list').exists()).to.equal(true);
    expect(wrapper.find('.category-list__title').exists()).to.equal(true);
    expect(wrapper.find('.cancel-button').exists()).to.equal(!!category);
    expect(wrapper.find('.banner-button').children()).to.have.lengthOf(children);
    expect(wrapper.find('.category-list__list').children())
      .to.have.lengthOf(categories);
  }

  it ('should render self with props', () => {
    expectations(wrapperwithProps, true, true, 1, 2);
  });

  it ('should render self without props', () => {
    expectations(wrapper, false, false, 1, 0);
  });

  it ('should render self with user prop', () => {
    expectations(wrapperUser, true, false, 0, 1);
  });

  it ('should contain title text', () => {
    expect(wrapper.find('.category-list__title').children()).to.have.lengthOf(1);
  });
});
