import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {mount, expect} from '../../../utils/test-config';
import { MealDetails } from '../MealDetails.js';

const setup = _ => {
  const user = {name: 'user'};
  const meal = {_id: 1, name: 'meal', image: 'img', price: 12, description: 'dd'};

  window.confirm = jest.fn();
  const handleRemove = jest.fn();

  const wrapperWithoutUser = mount(<MealDetails meal={meal} />);
  const wrapper = mount(
    <BrowserRouter>
      <MealDetails user={user} meal={meal} />
    </BrowserRouter>
  );

  return {wrapper, wrapperWithoutUser, meal, handleRemove};
};

describe('mealdetails component', () => {
  const {wrapper, wrapperWithoutUser, meal, handleRemove} = setup();

  const renderWrapper = (wrapper, chilren,) => {
    expect(wrapper.find('.meal-details').exists()).to.equal(true);
    expect(wrapper.find('.meal-details').children()).to.have.lengthOf(chilren);
  };

  const renderWrapperWithValues = wrapper => {
    expect(wrapper.find('.meal-details__img').props().src).to.equal(meal.image);
    expect(wrapper.find('.meal-details__img').props().alt).to.equal(meal.name);
    expect(wrapper.find('.meal-details__name').text()).to.equal(meal.name);
    expect(wrapper.find('.meal-price').text()).to.equal(`$${meal.price}`);
    expect(wrapper.find('.meal-desc').text()).to.equal(meal.description);
  };

  it ('should render self', () => {
    renderWrapper(wrapper, 3);
    renderWrapper(wrapperWithoutUser, 2);
  });

  it ('should render self with the right values', () => {
    renderWrapperWithValues(wrapper);
    renderWrapperWithValues(wrapperWithoutUser);
  });

  it ('should render buttons', () => {
    expect(wrapper.find('.meal-details__icons').exists()).to.equal(true);
    expect(wrapper.find('.meal-details__icons').children()).to.have.lengthOf(2);
    expect(wrapper.find('.list__remove').children()).to.have.lengthOf(1);
  });
});
