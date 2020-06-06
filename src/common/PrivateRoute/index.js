import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserLoggedIn } from './../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  let isLoggedIn = isUserLoggedIn();
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page

    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
