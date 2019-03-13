import React from 'react';

import Header from '../../components/Header';
import CategoryList from '../../components/CategoryList';

import './index.css';

const Home = _ => {
  return (
    <div className="home flex center full">
      <div className="banner flex start pd-16">
        <CategoryList />
      </div>
      <div className="home__container flex flex-column start">
        <Header />
        <div className="flex center full">

        </div>
      </div>
    </div>
  );
};

export default Home;
