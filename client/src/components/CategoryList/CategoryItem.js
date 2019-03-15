import React, { useRef } from 'react';
import { connect } from 'react-redux';

import { selectCategory, removeCategory } from '../../actions/categories';

const CategoryItem = ({user, category, selectCategory, removeCategory}) => {
  const item = useRef(null);
  const handleRemove = id => {
      if (window.confirm("Remove this category?")) {
        removeCategory(id);
        item.current.parentNode.removeChild(item.current);
      }
  };

  return (
    <div
      ref={item}
      key={category._id}
      className="list__item flex  space-between pd-16"
      onClick={_ => selectCategory(category)}>
      <div className="list__wrapper flex">
        <img className="list__img" src={category.cover} alt={category.name} />
        <span className="list__title mr-none mrl-16">{category.name}</span>
      </div>
      {
        user && (
          <div
            onClick={_ => handleRemove(category._id)}
            className="list__remove flex center">
            <p>x</p>
          </div>
        )
      }
    </div>
  );
}

const mapStateToProps = ({auth}) => ({user: auth.user});
export default connect(
  mapStateToProps,
  {selectCategory, removeCategory}
)(CategoryItem);
