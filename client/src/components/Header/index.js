import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';

import './index.css';

const Header = ({auth, logout}) => {
  if (!auth.user) return '';

  const {username, avatar} = auth.user;

  return (
    <div className="header flex end full pd-8">
      <button className="header__logout" onClick={_ => logout()}>Logout</button>
      <div className="header__name">{username}</div>
      <img className="header__img" src={avatar} atl={`${username} image`} />
    </div>
  );
};

const mapStateToProps = ({auth}) => ({auth});
export default connect(mapStateToProps, {logout})(Header);
