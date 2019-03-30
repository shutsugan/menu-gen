import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions/meals';
import { getUser } from '../../reducers/auth';

export const MealDetails = ({user, meal, updateMeal, removeMeal, selectMeal}) => {
  const item = useRef('');
  const handleRemove = id => {
    if (window.confirm('Want to remove the meal?')) {
      removeMeal(id);
      item.current.parentNode.removeChild(item.current);
    }
  };

  return (
    <div
      ref={item}
      className="meal-details flex flex-column start full relative pd-16">
      <div className="meal-details__wrapper flex">
        <img className="meal-details__img" src={meal.image} alt={meal.name} />
        <h3 className="meal-details__name mrl-16">{meal.name}</h3>
        <p className="meal-details__text meal-price">{`$${meal.price}`}</p>
      </div>
      <p className="meal-details__text meal-desc mrl-16">{meal.description}</p>
      {
        user && (
          <div className="meal-details__icons flex center absolute">
            <Link
              className="list__edit"
              to="/meal"
              onClick={_ => selectMeal(meal)}
              >
              Update
            </Link>
            <div
              onClick={_ => handleRemove(meal._id)}
              className="list__remove flex center mrl-16">
              <p className="white">x</p>
            </div>
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = state => ({user: getUser(state)});
export default connect(mapStateToProps, actions)(MealDetails);
