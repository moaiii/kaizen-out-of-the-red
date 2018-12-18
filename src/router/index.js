import { Route, HashRouter as Router } from "react-router-dom";

import CountryDetail from '../ui/views/CountryDetail';
// components
import CountryList from '../ui/views/CountryList';
import Header from '../ui/components/custom/Header';
import MobileNav from '../ui/components/custom/MobileNav';
import React from "react";

// routes
export default(
  <Router basename="/">
    <div className="Router__container">
      <div className="Router__inner-container">
        <Header />
        <MobileNav />
        <Route 
          exact path={"/"}
          component={ CountryList }/>
        <Route 
          path={"/country"}
          component={ CountryDetail }/>
      </div>
    </div>
  </Router>
)