import React from 'react';
import {shallow, expect} from '../../../utils/test-config';
import { MealList } from '../index.js';

const setup = _ => {
  const meals = [
    {_id: 1, name: 'name 1'},
    {_id: 2, name: 'name2'},
    {_id: 3, name: 'name3'}
  ];

  const wrapper = shallow(<MealList meals={[]} />);
  const wrapperWithMeals = shallow(<MealList meals={meals} />);

  return {wrapper, wrapperWithMeals, meals};
};

describe('meallist component', () => {
  const {wrapper, wrapperWithMeals, meals} = setup();

  it ('should render self', () => {
    expect(wrapperWithMeals.find('.meal-list').exists()).to.equal(true);
    expect(wrapperWithMeals.find('.meal-list').children())
      .to.have.lengthOf(meals.length);
  });

  it ('should render without children', () => {
    expect(wrapper.find('.meal-list').children()).to.have.lengthOf(0);
  });
});
