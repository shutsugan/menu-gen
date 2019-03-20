import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import MealDetails from './MealDetails';
import * as actions from '../../actions/meals';
import { getUser } from '../../reducers/auth';
import { getCategory } from '../../reducers/categories';
import { getMeals } from '../../reducers/meals';

import './index.css';

const MealList = ({user, category, meals, fetchUserMeals, fetchCategoryMeals}) => {
  useEffect(_ => {
      if (category) fetchCategoryMeals(category._id);
      else if (user) fetchUserMeals(user.id);
  }, [user, category]);

  const list = meals.map(meal => <MealDetails key={meal._id} meal={meal} />);
  return <div className="meal-list flex flex-column full">{list}</div>;
};

const mapStateToProps = state => ({
  user: getUser(state),
  category: getCategory(state),
  meals: getMeals(state)
});

export default connect(mapStateToProps, actions)(MealList);
