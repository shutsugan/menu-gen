import React, { useState, useEffect, useRef, createRef } from 'react';
import { connect } from 'react-redux';

import './index.css';

const Field = ({
  name,
  type,
  value,
  handleChange,
  setter,
  placeholder,
  required,
  pattern,
  err,
  auth
}) => {
    const inputRef = createRef();
    const initMount = useRef(true);
    const [error, setError] = useState('');

    const handleValidation = ({target}) => validate(target.value);
    const validate = value => {
      let message = '';
      if (!value.match(pattern)) message = err
      if (required && !value) message = 'Field is required';
      if (required && !value && auth.error) message = 'Field is required';

      setError(message);
    }

    useEffect(_ => {
      if (!initMount.current) validate(inputRef.current.value);

      initMount.current = false
    });

    return (
        <div className="field flex flex-column start half mrb-16 relative">
            <label className={`${required ? 'required': 'field__label'}`}>
              {name}
            </label>
            <input
                className={`field__input full pd-16
                  ${error ? 'field__input--error' : ''}
                `}
                ref={inputRef}
                name={name}
                type={type}
                value={value}
                onChange={({target}) => handleChange(target.value, setter)}
                onBlur={handleValidation}
                placeholder={placeholder}
                required={required}
            />
            {
              error &&
              <span className="field__error sm-f absolute">{error}</span>
            }
        </div>
    );
};

const mapStateToProps = ({auth}) => ({auth});
export default connect(mapStateToProps)(Field);
