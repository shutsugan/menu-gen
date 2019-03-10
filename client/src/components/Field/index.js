import React, { useState } from 'react';

import './index.css';

const Field = ({name, type, handleChange, setter, placeholder, required, pattern, err}) => {
    const [error, setError] = useState('');
    const handleValidation = ({target}) => {
      let message = '';
      if (!target.value.match(pattern)) message = err
      if (required && !target.value) message = 'Field is required';

      setError(message);
    };

    return (
        <div className="field flex flex-column start half mrb-16 relative">
            <label className="field__label">{name}</label>
            <input
                className={`field__input full pd-16
                  ${error ? 'field__input--error' : ''}
                `}
                name={name}
                type={type}
                onChange={({target}) => handleChange(target.value, setter)}
                onBlur={handleValidation}
                placeholder={placeholder}
            />
            {
              error &&
              <span className="field__error sm-f absolute">{error}</span>
            }
        </div>
    );
};

export default Field;
