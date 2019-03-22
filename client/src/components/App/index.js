import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUser } from '../../actions/auth';

import Error from '../Error';
import Loader from '../Loader';

import './index.css';

const pages = ['Home', 'Category', 'Meal', 'Login', 'Registration'];
const [
  Home, Category, Meal, Login, Registration
] = pages.map(page => lazy(_ => import(`../../pages/${page}`)));

export const App = ({fetchUser}) => {
  useEffect(_ => {fetchUser()}, []);

  return (
    <div className="app relative">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Route exact path="/" render={_ => <Home />} />
          <Route path="/category" render={_ => <Category />} />
          <Route path="/meal" render={_ => <Meal />} />
          <Route path="/login" render={_ => <Login />} />
          <Route path="/register" render={_ => <Registration />} />
        </Suspense>
      </BrowserRouter>
      <Error />
    </div>
  );
};

export default connect(null, {fetchUser})(App);
