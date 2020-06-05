import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';

const Routes = (props) => {
  console.log(props.history);
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={({ history }, props) => <Home history={history} />}
        ></Route>
      </Switch>
    </Router>
  );
};

export default Routes;
