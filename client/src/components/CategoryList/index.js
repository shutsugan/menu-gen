import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCategories } from '../../actions/categories';
import Transition from '../Transition';
import CategoryItem from './CategoryItem';

import './index.css';

const CategoryList = ({categories, category, fetchCategories}) => {
  useEffect(_ => {fetchCategories()}, []);
  const list = categories.map(category => <CategoryItem category={category} />);

  return (
    <div className="category-list flex flex-column end full pdt-16">
      <div className="category-list__buttons mrb-16">
        <Transition name="fade" appear={true} duration={150}>
          {
            category &&
            <Link to="" className="button banner-button pd-16">
              Add Category
            </Link>
          }
        </Transition>
        <Link to="" className="button banner-button pd-16 mrl-16">
          Edit Category
        </Link>
      </div>
      <div className="category-list__list mrt-16 full">{list}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  categories: state.categories.categories,
  category: state.categories.category
});

export default connect(mapStateToProps, {fetchCategories})(CategoryList);
