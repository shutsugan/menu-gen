import React from 'react';

import './index.css';

const Loader = _ => (
  <div className="loader absolute">
    <div className="lds-facebook"><div></div><div></div><div></div></div>
  </div>
);

export default Loader;
