import React from 'react';
import { connect } from 'react-redux';

import Transition from '../Transition';

import './index.css';

const CategoryDetails = ({category}) => category && (
  <div className="category-details flex flex-column full start pd-16">
    <Transition name="fade" appear={true} duration={150}>
    <div className="details__wrapper flex start">
      <img
        className="category-details__img"
        src={category.cover}
        alt={category.name}
      />
      <div className="category-details__name mrl-16">{category.name}</div>
    </div>
    <div className="flex start pdt-16">{category.description}</div>
    </Transition>
  </div>
);

const mapStateToProps = ({categories}) => ({category: categories.category});
export default connect(mapStateToProps)(CategoryDetails);
