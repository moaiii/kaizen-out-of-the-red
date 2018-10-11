import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

// components
import CountryList from '../ui/views/CountryList';
import CountryDetail from '../ui/views/CountryDetail';
import Home from '../ui/views/Home';

// routes
export default(
  <Router basename="/">
    <div className="Router__container">
      <Route 
        exact path={"/"}
        component={ Home }/>
      <Route 
        path={"/country"}
        component={ CountryDetail }/>
      <Route 
        path={"/country-list"}
        component={ CountryList }/>
    </div>
  </Router>
)