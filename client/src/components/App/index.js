import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Error from '../Error';
import { fetchUser } from '../../actions/auth';

import './index.css';

const Login = lazy(_ => import('../../pages/Login'));
const Registration = lazy(_ => import('../../pages/Registration'));

const App = ({fetchUser}) => {
  useEffect(_ => {fetchUser()}, []);

  return (
    <div className="app relative">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/" render={_ => <div>App!!!</div>} />
          <Route path="/login" render={_ => <Login />} />
          <Route path="/register" render={_ => <Registration />} />
        </Suspense>
      </BrowserRouter>
      <Error />
    </div>
  )
};

export default connect(null, {fetchUser})(App);
