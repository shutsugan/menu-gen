import React, { useState } from 'react';
import { connect } from 'react-redux';

import Field from '../../components/Field';
import FormButton from '../../components/FormButton';

import { setMeal, updateMeal } from '../../actions/meals';

const MealForm = ({user_id, category, meal, setMeal, updateMeal}) => {
  const meal_name = meal ? meal.name : '';
  const meal_description = meal ? meal.description : '';
  const meal_price = meal ? meal.price : '';
  const meal_image = meal ? meal.image : '';

  const [name, setName] = useState(meal_name);
  const [description, setDescription] = useState(meal_description);
  const [price, setPrice] = useState(meal_price);
  const [image, setImage] = useState(meal_image);

  const handleChange = (value, setter) => setter(value);
  const handleSubmit = event => {
    event.preventDefault();
    meal
      ? updateMeal(meal._id, {name, description, price, image})
      : setMeal({
          user_id,
          category_id: category._id,
          name,
          description,
          price,
          image
      });
  };

  const banner = meal === null
    ? 'Create a new Meal'
    : `Update ${meal.name}`;

  return (
    <form
      onSubmit={handleSubmit}
      className="meal__form flex flex-column center">
      <h1 className="title mr-none">Meal</h1>
      <h3 className="sub-title mr-none mrb-16">{banner}</h3>

      <Field
        name="name"
        type="type"
        handleChange={handleChange}
        setter={setName}
        value={name}
        placeholder="Meal name"
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
        placeholder="Meal description"
        required={true}
        pattern={/.{6}/gm}
        err="Must be at least 6 chars"
      />
      <Field
        name="price"
        type="number"
        handleChange={handleChange}
        setter={setPrice}
        value={price}
        placeholder="Meal price"
        required={true}
        pattern={/\d/gm}
        err="Must be at least 6 chars"
      />
      <Field
        name="cover"
        type="url"
        handleChange={handleChange}
        setter={setImage}
        value={image}
        placeholder="Meal image"
        required={true}
        pattern={/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gm}
        err="Wrong url format"
      />
      <FormButton type="submit" label="Save Meal" />
    </form>
  );
};

const mapStateToProps = ({categories, meals}) => ({
  category: categories.category,
  meal: meals.meal
});

export default connect(
  mapStateToProps,
  {setMeal, updateMeal}
)(MealForm);
