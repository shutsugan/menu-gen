import React from 'react';

import Google from '../../Google.svg';

const GoogleAuthRender = ({googleLogin, renderButtontext}) => (
  <div className="google-auth full flex center mrb-16">
    <button
      onClick={googleLogin}
      className="button button__google half flex center pd-16">
      <img className="mrr-16" src={Google} alt="google logo" />
      {renderButtontext()}
    </button>
  </div>
);

export default GoogleAuthRender;
