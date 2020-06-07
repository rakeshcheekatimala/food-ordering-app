import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import RestaurantDetail from './RestaurantDetail';

import PrivateRoute from './../common/PrivateRoute';

const Routes = (props) => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={({ history }, props) => <Home history={history} />}
        ></Route>
        <PrivateRoute component={Profile} path="/profile" />
        <Route component={RestaurantDetail} path="/restaurant/:id"></Route>
      </Switch>
    </Router>
  );
};

export default Routes;
