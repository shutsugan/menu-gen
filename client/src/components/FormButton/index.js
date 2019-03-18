import React from 'react';

import './index.css';

const FormButton = ({type, label}) => (
    <button className="button half pd-16" type={type}>{label}</button>
);

export default FormButton;
