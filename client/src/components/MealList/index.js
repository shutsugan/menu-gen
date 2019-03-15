import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import MealDetails from './MealDetails';
import { fetchUserMeals, fetchCategoryMeals } from '../../actions/meals';

import './index.css';

const MealList = ({user, category, meals, fetchMfetchUserMealseals, fetchCategoryMeals}) => {
  useEffect(_ => {
      if (category) fetchCategoryMeals(category._id);
      else if (user) fetchUserMeals(user.id);
  }, [user, category]);

  const list = meals.map(meal => <MealDetails key={meal._id} meal={meal} />);
  return <div className="meal-list flex flex-column full">{list}</div>;
};

const mapStateToProps = ({auth, meals, categories}) => ({
  user: auth.user,
  category: categories.category,
  meals: meals.meals
});

export default connect(
  mapStateToProps,
  {fetchUserMeals, fetchCategoryMeals}
)(MealList);
