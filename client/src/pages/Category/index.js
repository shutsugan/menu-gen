import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CategoryForm from './CategoryForm';

import './index.css';

const Category = ({user}) => {
  if (!user) return <Redirect to="/login" />;

  return (
    <div className="category flex full">
      <div className="category__banner center flex">
        <Link className="banner__link" to="/">Back to home page</Link>
      </div>
      <CategoryForm user_id={user.id} />
    </div>
  );
};

const mapStateToProps = ({auth}) => ({user: auth.user});
export default connect(mapStateToProps)(Category);
