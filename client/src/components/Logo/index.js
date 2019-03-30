import React from 'react';

import './index.css';

const Logo = ({name, sub}) => {
  const makeLogo = word => word.split('').map(letter => (
    <span key={letter} className="logo__char flex center">{letter}</span>
  ));

  return (
    <div className="logo">
        <div className="logo__box logo__box-top flex flex-column">
            {makeLogo(name)}
        </div>
        <div className="logo__box logo__box-bottom flex flex-column">
          {makeLogo(sub)}
        </div>
    </div>
  );
}

export default Logo;
