import React, { useState } from 'react';
import { connect } from 'react-redux';

import { authenticate } from '../../actions/auth';

import './index.css';

const Login = ({authenticate}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleChange = (value, setter) => setter(value);
	const handleSubmit = event => {
		event.preventDefault();
		authenticate(email, password);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input 
				name="email" 
				onChange={({target}) => handleChange(target.value, setEmail)}
				placeholder="Email here"
			/>
			<input 
				type="password" 
				name="password" 
				onChange={({target}) => handleChange(target.value, setPassword)} 
			/>
			<button type="submit">Login</button>
		</form>
	);
};

export default connect(null, {authenticate})(Login);