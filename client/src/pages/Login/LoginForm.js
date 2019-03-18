import React, { useState } from 'react';

import Field from '../../components/Field';
import FormButton from '../../components/FormButton';
import FormHead from '../../components/FormHead';
import SwitchLink from '../../components/SwitchLink';
import Banner from '../../components/Banner';
import GoogleAuth from '../../components/GoogleAuth';

const LoginFrom = ({authenticate}) => {
  	const [email, setEmail] = useState('');
  	const [password, setPassword] = useState('');

  	const handleChange = (value, setter) => setter(value);
  	const handleSubmit = event => {
  		event.preventDefault();
  		authenticate(email, password);
  	};

    return (
      <div className="login flex center full">
				<Banner />
				<form
					className="login__form flex flex-column center"
					onSubmit={handleSubmit}>
          <FormHead title="Sign in" slug="Enter your details below." />
          <GoogleAuth />
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
					<FormButton type="submit" label="Sign In" />
					<SwitchLink
            to="/register"
            text="Don't have an account?"
            label="Sign Up"
          />
				</form>
			</div>
    );
};

export default LoginFrom;
