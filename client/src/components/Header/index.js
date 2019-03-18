import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout, googleLogout } from '../../actions/auth';

import './index.css';

const Header = ({auth, logout, googleLogout}) => {
  if (!auth.user) return (
    <div className="header flex end full pd-8">
      <Link className="header__login" to="/login">Login</Link>
    </div>
  );

  const {username, avatar} = auth.user;
  return (
    <div className="header flex end full pd-8">
      <button className="header__logout" onClick={_ => logout()}>Logout</button>
      <div className="header__name">{username}</div>
      <img className="header__img" src={avatar} alt={username} />
    </div>
  );
};

const mapStateToProps = ({auth}) => ({auth});
export default connect(mapStateToProps, {logout, googleLogout})(Header);
