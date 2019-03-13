import React from 'react';
import { connect } from 'react-redux';

import { setCategory } from '../../actions/categories';

const CategoryItem = ({category, setCategory}) => (
  <div
    key={category._id}
    className="list__item flex pd-16"
    onClick={_ => setCategory(category)}>
    <img className="list__img" src={category.cover} alt={category.name} />
    <span className="list__title mr-none mrl-16">{category.name}</span>
  </div>
);

export default connect(null, {setCategory})(CategoryItem);
