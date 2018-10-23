import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

// components
import CountryList from '../ui/views/CountryList';
import CountryDetail from '../ui/views/CountryDetail';
import Header from '../ui/components/custom/Header';

// routes
export default(
  <Router basename="/">
    <div className="Router__container">
      <Header />
      <Route 
        exact path={"/"}
        component={ CountryList }/>
      <Route 
        path={"/country"}
        component={ CountryDetail }/>
    </div>
  </Router>
)