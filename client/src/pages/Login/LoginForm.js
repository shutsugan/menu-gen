import React, { useState } from 'react';

import Field from '../../components/Field';
import FormButton from '../../components/FormButton';
import SwitchLink from '../../components/SwitchLink';
import Banner from '../../components/Banner';

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
					<h1 className="title mr-none">Sign in</h1>
					<h3 className="sub-title mr-none mrb-16">Enter your details below.</h3>

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
					<SwitchLink to="/register" label="Sign Up" />
				</form>
			</div>
    );
};

export default LoginFrom;
