import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import CategoryList from '../../components/CategoryList';
import CategoryDetails from '../../components/CategoryDetails';

import './index.css';

const Home = ({auth}) => (
  <div className="home flex start full">
    <div className="banner flex start pd-16">
      <CategoryList />
    </div>
    <div className="home__container flex flex-column start">
      <Header />
      <div className="flex center full">
        <CategoryDetails />
      </div>
    </div>
  </div>
);

const mapStateToProps = ({auth}) => ({auth});
export default connect(mapStateToProps)(Home);
