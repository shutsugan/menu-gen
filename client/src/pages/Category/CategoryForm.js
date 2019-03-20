import React, { useState } from 'react';
import { connect } from 'react-redux';

import Field from '../../components/Field';
import FormButton from '../../components/FormButton';
import FormHead from '../../components/FormHead';
import SwitchLink from '../../components/SwitchLink';

import * as actions from '../../actions/categories';
import { getCategory } from '../../reducers/categories';

const CategoryForm = ({user_id, category, setCategory, updateCategory}) => {
  const cat_name = category ? category.name : '';
  const cat_description = category ? category.description : '';
  const cat_cover = category ? category.cover : '';

  const [name, setName] = useState(cat_name);
  const [description, setDescription] = useState(cat_description);
  const [cover, setCover] = useState(cat_cover);

  const handleChange = (value, setter) => setter(value);
  const handleSubmit = event => {
    event.preventDefault();
    category
      ? updateCategory(category._id, {name, description, cover})
      : setCategory({user_id, name, description, cover});
  };

  const banner = category === null
    ? 'Create a new Category.'
    : `Update ${category.name}.`;

  return (
    <form
      onSubmit={handleSubmit}
      className="category__form flex flex-column center">
      <FormHead title="Category" slug={banner} />
      <Field
        name="name"
        type="type"
        handleChange={handleChange}
        setter={setName}
        value={name}
        placeholder="Category name"
        required={true}
        pattern={/.{3}/gm}
        err="Must be more than 3 chars"
      />
      <Field
        name="description"
        type="text"
        handleChange={handleChange}
        setter={setDescription}
        value={description}
        placeholder="Category description"
        required={true}
        pattern={/.{6}/gm}
        err="Must be at least 6 chars"
      />
      <Field
        name="cover"
        type="url"
        handleChange={handleChange}
        setter={setCover}
        value={cover}
        placeholder="Category cover"
        required={true}
        pattern={/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gm}
        err="Wrong url format"
      />
      <FormButton type="submit" label="Save Category" />
      <SwitchLink
        to="/"
        text="Cancel and back"
        label="Home"
      />
    </form>
  );
};

const mapStateToProps = state => ({category: getCategory(state)});
export default connect(mapStateToProps, actions)(CategoryForm);
