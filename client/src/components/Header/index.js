import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';
import { getUser } from '../../reducers/auth';

import './index.css';

export const Header = ({user, logout}) => {
  if (!user) return (
    <div className="header flex end full pd-8">
      <Link className="header__login" to="/login">Login</Link>
    </div>
  );

  const {username, avatar} = user;
  return (
    <div className="header flex end full pd-8">
      <button className="header__logout" onClick={_ => logout()}>Logout</button>
      <div className="header__name">{username}</div>
      <img className="header__img" src={avatar} alt={username} />
    </div>
  );
};

const mapStateToProps = state => ({user: getUser(state)});
export default connect(mapStateToProps, {logout})(Header);
