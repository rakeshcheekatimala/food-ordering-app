import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Profile from './Profile';
import RestaurantDetail from './Detail/Detail';
import Checkout from './Checkout/Checkout';
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
        <PrivateRoute component={Checkout} path="/checkout" />
      </Switch>
    </Router>
  );
};

export default Routes;
