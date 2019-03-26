import React from 'react';
import {mount, expect} from '../../utils/test-config';
import { Field } from './index.js';

const setup = _ => {
  const wrapper = mount(
    <Field
      name="field"
      type="text"
      value="field value"
      placeholder="field placeholder"
      required={true}
      pattern={/.*/}
      err="field error"
    />
  );

  const wrapperWithError = mount(
    <Field
      name="field"
      type="number"
      value=""
      placeholder="field placeholder"
      required={true}
      pattern={/\d*/}
      err="field error"
    />
  );

  const wrapperWithInvalidValue = mount(
    <Field
      name="field"
      type="text"
      value="invaled"
      placeholder="field placeholder"
      required={true}
      pattern={/^[0-9]*$/}
      err="Invaled value"
    />
  );

  const handleChange = jest.fn();
  const wrapperWithClick = mount(
    <Field
      name="field"
      type="text"
      value=""
      handleChange={handleChange}
      placeholder="field placeholder"
      required={true}
      pattern={/.*/}
      err="field error"
    />
  );

  return {
    wrapper,
    wrapperWithError,
    wrapperWithClick,
    wrapperWithInvalidValue,
    handleChange
  };
};

describe('component Field', () => {
  const {
    wrapper,
    wrapperWithError,
    wrapperWithClick,
    wrapperWithInvalidValue,
    handleChange
  } = setup();

  const getError = (wrapper, value, message) => {
    wrapper.find('.field__input').simulate('blur');
    expect(wrapper.find('.field__input').props().value).to.equal(value);
    expect(wrapper.find('.field__input--error').exists()).to.equal(true);
    expect(wrapper.find('.field__error').exists()).to.equal(true);
    expect(wrapper.find('.field__error').text()).to.equal(message);
  };

  it ('should render self', () => {
    expect(wrapper.find('.field').exists()).to.equal(true);
    expect(wrapper.find('.field').children()).to.have.lengthOf(2);
  });

  it ('should render the label with the right name', () => {
    expect(wrapper.find('.required').exists()).to.equal(true);
    expect(wrapper.find('.required').text()).to.equal('field');
  });

  it ('should render the input with the right attributes', () => {
    expect(wrapper.find('.field__input').exists()).to.equal(true);
    expect(wrapper.find('.field__input').props().name).to.equal('field');
    expect(wrapper.find('.field__input').props().type).to.equal('text');
    expect(wrapper.find('.field__input').props().value).to.equal('field value');
    expect(wrapper.find('.field__input').props().required).to.equal(true);
    expect(wrapper.find('.field__input').props().placeholder)
      .to.equal('field placeholder');
  });

  it ('should render the input in the right state after blur event', () => {
    wrapper.find('.field__input').simulate('blur');
    expect(wrapper.find('.field__error').exists()).to.equal(false);
  });

  it ('should render the input with error after blur event', () => {
    getError(wrapperWithError, '', 'Field is required');
  });

  it ('should render the invaled error', () => {
    getError(wrapperWithInvalidValue, 'invaled', 'Invaled value');
  })

  it ('should call the change method after change event', () => {
    const event = {
      preventDefault() {},
      target: { value: 'clicked' }
    };
    wrapperWithClick.find('.field__input').simulate('change', event);
    expect(handleChange.mock.calls[0][0]).to.equal('clicked');
  });
});
