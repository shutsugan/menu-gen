import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CategoryForm from './CategoryForm';
import Banner from '../../components/Banner';

import { getUser } from '../../reducers/auth';

import './index.css';

const Category = ({user}) => {
  if (!user) return <Redirect to="/login" />;

  return (
    <div className="category flex full">
      <div className="category__banner center flex"><Banner /></div>
      <CategoryForm user_id={user.id} />
    </div>
  );
};

const mapStateToProps = state => ({user: getUser(state)});
export default connect(mapStateToProps)(Category);
