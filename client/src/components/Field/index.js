import React from 'react';

import './index.css';

const Field = ({name, type, handleChange, setter, placeholder}) => {
    return (
        <div className="field flex flex-column start half mrb-16">
            <label className="field__label">{name}</label>
            <input
                className="field__input full pd-16"
                name={name}
                type={type}
                onChange={({target}) => handleChange(target.value, setter)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Field;