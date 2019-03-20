import React from 'react';

import Header from '../../components/Header';
import CategoryList from '../../components/CategoryList';
import CategoryDetails from '../../components/CategoryDetails';
import MealList from '../../components/MealList';

import './index.css';

const Home = _ => (
  <div className="home flex start stretch full">
    <div className="banner flex start pd-16"><CategoryList /></div>
    <div className="home__container flex flex-column start">
      <Header />
      <div className="flex flex-column center full">
        <CategoryDetails />
        <MealList />
      </div>
    </div>
  </div>
);

export default Home
