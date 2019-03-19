import React, { useState } from 'react';

import Field from '../../components/Field';
import FormButton from '../../components/FormButton';
import FormHead from '../../components/FormHead';
import SwitchLink from '../../components/SwitchLink';
import Banner from '../../components/Banner';
import GoogleAuth from '../../components/GoogleAuth';

const RegistrationForm = ({register}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  const handleChange = (value, setter) => setter(value);
  const handleSubmit = event => {
    event.preventDefault();
    register(username, email, password);
  };

  return (
    <div className="registration flex center full">
      <Banner />
      <form
        className="registration__form flex flex-column center"
        onSubmit={handleSubmit}>
        <FormHead title="Sign Up" slug="Let's get you all set up." />
        <GoogleAuth registration={true} />
        <Field
          name="username"
          type="text"
          handleChange={handleChange}
          setter={setUsername}
          placeholder="johndoe"
          required={true}
          pattern={/\w+/gm}
          err="Wrong username format"
        />
        <Field
          name="email"
          type="email"
          handleChange={handleChange}
          setter={setEmail}
          placeholder="john@doe.com"
          required={true}
          pattern={/\S+@\S+\.\S+/gm}
          err="Wrong email format"
        />
        <Field
          name="password"
          type="password"
          handleChange={handleChange}
          setter={setPassword}
          placeholder="Enter your password"
          required={true}
          pattern={/.{4}/gm}
          err="Must be more than 4 chars"
        />
        <Field
          name="repassword"
          type="password"
          handleChange={handleChange}
          setter={setRePassword}
          placeholder="Re-nter your password"
          required={true}
          pattern={password}
          err="Password does not match"
        />
        <FormButton type="submit" label="Sign Up" />
        <SwitchLink
          to="/login"
          text="Already have an account?"
          label="Sign In"
        />
      </form>
    </div>
  );
};

export default RegistrationForm;
