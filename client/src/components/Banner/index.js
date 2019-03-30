import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo';

import './index.css';

const Banner = _ => (
  <div className="logo__banner flex center">
    <Link to="/"><Logo name="MENU" sub="GN" /></Link>
  </div>
);
export default Banner;
