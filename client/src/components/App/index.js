import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Error from '../Error';
import { fetchUser } from '../../actions/auth';

import './index.css';

const Login = lazy(_ => import('../../pages/Login'));

const App = ({fetchUser}) => {
  useEffect(_ => {fetchUser()}, []);

  return (
    <div className="app relative">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/" render={_ => <div>App!!!</div>} />
          <Route path="/login" render={_ => <Login />} />
        </Suspense>
      </BrowserRouter>
      <Error />
    </div>
  )
};

export default connect(null, {fetchUser})(App);
