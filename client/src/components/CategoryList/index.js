import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCategories, selectCategory } from '../../actions/categories';
import Transition from '../Transition';
import CategoryItem from './CategoryItem';

import './index.css';

const CategoryList = ({categories, category, user, fetchCategories, selectCategory}) => {
  useEffect(_ => {fetchCategories()}, []);

  const list = categories.map(category => (
    <CategoryItem key={category._id} category={category} />
  ));

  return (
    <div className="category-list flex flex-column end full pdt-16">
      <div className="category-list__buttons flex space-between full mrb-16">
        <h2 className="category-list__title mr-none">Categories List</h2>
        <Transition name="fade" appear={true} duration={150}>
          {
            user &&
            category &&
            <button
              className="button cancel-button pd-16"
              onClick={_ => selectCategory(null)}>
              Cancel
            </button>
          }
          {
            user &&
            category &&
            <Link to="/meal" className="button banner-button pd-16 mrl-16">
              Add meal
            </Link>
          }
          {
            user &&
            <Link to="/category" className="button banner-button pd-16 mrl-16">
              {category ? 'Edit category': 'Add category'}
            </Link>
          }
        </Transition>
      </div>
      <div className="category-list__list mrt-16 full">{list}</div>
    </div>
  );
};

const mapStateToProps = ({auth, categories}) => ({
  categories: categories.categories,
  category: categories.category,
  user: auth.user
});

export default connect(
  mapStateToProps,
  {fetchCategories, selectCategory}
)(CategoryList);
