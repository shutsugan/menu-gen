import React from 'react';

const FormHead = ({title, slug}) => (
  <>
    <h1 className="title mr-none">{title}</h1>
    <h3 className="sub-title mr-none mrb-16">{slug}</h3>
  </>
);

export default FormHead;
