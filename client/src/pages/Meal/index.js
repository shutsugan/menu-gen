import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import MealForm from './MealForm';
import Banner from '../../components/Banner';

import './index.css';

const Meal = ({user}) => {
  if (!user) return <Redirect to="/login" />

  return (
    <div className="meal flex full">
      <div className="meal__banner center flex"><Banner /></div>
      <MealForm user_id={user.id} />
    </div>
  );
};

const mapStateToProps = ({auth}) => ({user: auth.user});
export default connect(mapStateToProps)(Meal);
