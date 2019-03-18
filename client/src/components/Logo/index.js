import React from 'react';

import './index.css';

const Logo = _ => {
  const makeLogo = word => word.split('').map(letter => (
    <span key={letter} className="logo__char flex center">{letter}</span>
  ));

  return (
    <div className="logo">
        <div className="logo__box logo__box-top flex flex-column">
            {makeLogo('MENU')}
        </div>
        <div className="logo__box flex flex-column">{makeLogo('GN')}</div>
    </div>
  );
}

export default Logo;
